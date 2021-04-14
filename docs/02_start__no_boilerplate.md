---
title: Integrate into an existing application
sidebar_label: Integrate into an existing application
copyright: (C) 2007-2018 GoodData Corporation
id: platform_integration
---

This document outlines the important steps you need to undertake if you need to integrate GoodData.UI into either an existing
React application or for some reason you cannot use [accelerator toolkit](02_start__using_boilerplate.md) to bootstrap a new application.

## Step 1. Install the necessary dependencies

The GoodData.UI can target multiple platforms and so it is essential to install packages for the right target platform. For
GoodData platform, you need to install packages codenamed `bear`:

```bash
yarn add @gooddata/api-client-bear @gooddata/sdk-backend-bear @gooddata/sdk-model 
```

On top of this, you can pick and choose packages depending on which GoodData.UI components you plan to use. You can consult the table included on the [architecture overview](01_intro__framework_overview.md)
page.

-  If you plan to use only headless React components and essential infrastructure then install:

   ```bash
   yarn add @gooddata/sdk-ui
   ```

-  If you plan to use all available GoodData.UI visualizations then install:

   ```bash
   yarn add @gooddata/sdk-ui-charts @gooddata/sdk-ui-pivot @gooddata/sdk-ui-geo @gooddata/sdk-ui-ext
   ```

-  If you plan to use all components of GoodData.UI then install:

   ```bash
   yarn add @gooddata/sdk-ui-all
   ```

We also highly recommend that you use the [catalog-export](02_start__catalog_export.md) tool to generate a file with
code representation of all available measures and attributes in your GoodData platform workspace. You can then use this
generated code to specify what data to render in the Visual components. To add `@gooddata/catalog-export` as a dev dependency:

```bash
yarn add --dev @gooddata/catalog-export
```


## Step 2. Include styles

GoodData.UI uses CSS to style the components. Each package whose name is prefixed with `sdk-ui` contains
CSS files that you need to include or import in your application. This listing shows all the possible imports you
may need:

```jsx
import "@gooddata/sdk-ui-filters/styles/css/main.css";
import "@gooddata/sdk-ui-charts/styles/css/main.css";
import "@gooddata/sdk-ui-geo/styles/css/main.css";
import "@gooddata/sdk-ui-pivot/styles/css/main.css";
import "@gooddata/sdk-ui-kit/styles/css/main.css";
import "@gooddata/sdk-ui-ext/styles/css/main.css";
```

Please make sure to filter this list and only import styles from the packages which you actually use.

**NOTE**: The `@gooddata/sdk-ui-kit` is a library of elementary components (buttons, dropdowns, overlays)
required by the different SDK components. The best course of action is to try to import their CSS files; if the application build fails because
it cannot find these styles, it is safe to remove them.

## Step 3. Setup Analytical Backend and integrate it into your app

All integration and communication of GoodData.UI React components and GoodData platform happens via the **Analytical Backend** abstraction. 
Your application should initialize an instance of Analytical backend as soon as possible as follows:

```javascript
import bearFactory, {ContextDeferredAuthProvider} from "@gooddata/sdk-backend-bear";

const backend = bearFactory().withAuthentication(new ContextDeferredAuthProvider());
```

Depending on the type and style used in your application you may either store an instance of `backend` in a read-only global
variable or use React contexts.

This is how you can set contexts that hold both an instance of Analytical Backend and identifier of GoodData platform workspace
that you are targeting:

```jsx
import { BackendProvider, WorkspaceProvider } from "@gooddata/sdk-ui";

function App() {
    return (
        <BackendProvider backend={backend}>
            <WorkspaceProvider workspace="<your-workspace-identifier>">
                <YourApp/>
            </WorkspaceProvider>
        </BackendProvider>
    );
}
```

**Note**: If you are building a React application then the contexts are the best way to go. All GoodData.UI components
are context-aware and will retrieve both `backend` and `workspace` to use.

## Step 4. Solve Cross-Origin Resource Sharing

The interaction with third-party APIs and services from the browser is protected by the [Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) 
mechanism (CORS). Correct CORS setup is from a big part a server-side concern. 

GoodData platform provides APIs to configure the CORS for your account. Configuring CORS on your domain is the only feasible 
approach for production deployment and there is no way around it even during development if your application will be 
using Single Sign-On authentication flows.

If you plan to use username and password authentication during development on your localhost you avoid the server-side CORS
setup by using a development proxy.

Both of these options are explained in-depth in the dedicated [Solving CORS](30_tips__cors.md) page.


## Step 5. Configure authentication

You have probably noticed that the code snippet in the third step did set up authentication to use the `ContextDeferredAuthProvider`.
This effectively tells the Analytical Backend that your application takes care of handling set up of the authenticated session to GoodData platform.

The implementation of backend assumes that someone else does the authentication and as part of that sets the GoodData cookies with the
essential tokens. If the session is not set up then the Analytical Backend will raise the `NotAuthenticated` errors

Your application can use the functions in `@gooddata/api-client-bear` to trigger the APIs to achieve either username & password
authentication or start Single Sign-On authentication flow when needed.

This is how you can trigger username and password login using the `@gooddata/api-client-bear`:

```javascript
import { factory } from "@gooddata/api-client-bear";
const bearClient = factory();

await bearClient.user.login(this.username, this.password)
```

For single sign-on setup, please see the dedicated [Single Sing-On Setup](30_tips__sso.md) page.


**NOTE**: The `ContextDeferredAuthProvider` allows to provide callback function in the constructor. This function will
be called every time when the Analytical Backend throws a `NotAuthenticated` error. This callback function is useful to
implement a single-point of error handling of the `NotAuthenticated` and trigger the authentication flow in your
application.

## Step 6. Finalization

At this point your application should be set to use GoodData.UI and render visualizations from GoodData platform. If you 
also configured and run the [catalog-export](02_start__catalog_export.md) you can now start embedding visualizations
into your application:

```jsx
import { LineChart } from "@gooddata/sdk-ui-charts";
import { YourFact, YourMeasure, YourAttribute} from "./generatedLdm";

function MyVisualization() {
    const measures = [YourFact.Sum, YourMeasure];
    const attributes = [ YourAttribute.DisplayFormName ];
    
    return (
      <LineChart
          measures={measures}
          trendBy={attribute}
      />
    );
}
```

**NOTE**: The imports from `generatedLdm` are for illustration purposes. You can name and place the file with generated 
LDM however and wherever you see fit. The names of constants in the generated file will reflect the facts, measures and
attributes in your workspace.

## Next steps

Here are some suggestions about what you can do after you created your first visualization:

* Add more elements: tables, charts, custom visualizations. For more information, see [Start with Visual Components](10_vis__start_with_visual_components.md).
* [Enable drilling](15_props__drillable_item.md).
* Add a [customizable theme](10_vis__theme_provider.md) to your application.
* Authenticate your users using [Single Sign-on (SSO)](30_tips__sso.md) rather than sending them to a proxied GoodData login page.
