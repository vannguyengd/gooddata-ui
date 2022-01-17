---
title: Create Your First Application from Scratch
sidebar_label: Create Your First Application from Scratch
copyright: (C) 2007-2018 GoodData Corporation
id: version-8.0.0-ht_create_your_first_visualization
original_id: ht_create_your_first_visualization
---

>**IMPORTANT:** The solution described in this article no longer works. Use the [Accelerator Toolkit](ht_create_your_first_visualization_toolkit) instead.

This tutorial will guide you through the process of creating your first analytical application from scratch, using GoodData.UI with Facebook’s `create-react-app` tool.

After you complete this tutorial, you will be able to display various measures and charts from your GoodData workspace within the context of your React application.

We use the `yarn` package manager in this tutorial. To install it, review its [documentation](https://yarnpkg.com/lang/en/docs/install/).

**NOTE:** This tutorial assumes that you already have an existing GoodData account. If you do not have a GoodData account yet, create one for free at [https://www.gooddata.com/free](https://www.gooddata.com/free).

**TIP:** Instead of creating the application from scratch, you can use [GoodData `create-gooddata-react-app` and Accelerator Toolkit](ht_create_your_first_visualization_toolkit), which will guide you through the process of creating the application step by step.

## Step 1. Get create-react-app

Run the following command from the command line:

```bash
yarn global add create-react-app@4
```

This command installs the `create-react-app` tool that will help you create a functional skeleton of a React application. We use `create-react-app` at **version 4** because it installs React **16**, which is compatible with GoodData.UI. `create-react-app` version 5 or higher is not supported.
`create-react-app` version 4 supports TypeScript.

**NOTE:** The supported versions of Node are ^8.10.0 or >=9.10.0. Using a different version may result in errors.

## Step 2. Create your React application

1. Run the following command from the command line:
    ```bash
    create-react-app my-first-app
    ```
    This command creates a directory named `my-first-app` with a functional skeleton of a React application. You can see the command output that looks something like the following:
    ```bash
    Success! Created my-first-app at /Users/user-name/dev/my-first-app
    ```

2. Change your current working directory to `my-first-app` (for example, by running `cd my-first-app` on Mac or Linux).

## Step 3. Add GoodData SDK dependencies

Run the following command from the command line:

```bash
yarn add @gooddata/sdk-backend-bear @gooddata/sdk-model @gooddata/sdk-ui @gooddata/sdk-ui-charts
```

This command adds the necessary GoodData.UI packages to the list of your project dependencies in `package.json` and downloads all required packages.

## Step 4. Configure the development server

**Before** you start your development server, prevent cross-origin issues by [adding proxy settings](cors). To set up a proxy, in your project's `/src` directory, create the `setupProxy.js` file with the following content:

```javascript
const proxy = require("http-proxy-middleware");

module.exports = function (app) {
     app.use(proxy("/gdc", {
         "changeOrigin": true,
         "cookieDomainRewrite": "localhost",
         "secure": false,
         "target": "https://developer.na.gooddata.com",
         "headers": {
             "host": "developer.na.gooddata.com",
             "origin": null
         },
         "onProxyReq": function(proxyReq, req, res) {
             proxyReq.setHeader("accept-encoding", "identity")
         }
     }));
     app.use(proxy("/*.html", {
         "changeOrigin": true,
         "secure": false,
         "target": "https://developer.na.gooddata.com"
     }));
     app.use(proxy("/packages/*.{js,css}", {
         "changeOrigin": true,
         "secure": false,
         "target": "https://developer.na.gooddata.com"
     }));
 };
```

> **Careful:** Only use the proxy authentication for development. Do not use this authentication method for production.

> **Careful:** If you are only using the [development proxy](cors#on-your-local-dev-machine), you will still need to authenticate users by going to `/account.html` or by calling the `sdk.user.login()` method, and filling in valid GoodData credentials.

**NOTE:** `create-react-app` does not support Microsoft Internet Explorer and older browsers. You have to configure the development server to support the browsers that you want to use. For more information, see [Create React App - Supported Browsers and Features](https://create-react-app.dev/docs/supported-browsers-features/).

## Step 5. Start the development server

Start the server by running the following command:

* If you are on Mac or Linux:
    ```bash
    HTTPS=true yarn start
    ```
* If you are on Windows:
    ```bash
    set HTTPS=true&&npm start
    ```

**Always** run your local development server using HTTP**S** because the GoodData API responses set cookies with the `secure` flag. Specifically, it means that if you skip the `HTTPS=true` part, you will not be able to log in.

## Step 6. Establish a session

Open [https://localhost:3000/account.html](https://localhost:3000/account.html) in your browser, and enter your GoodData credentials. You are now logged in to GoodData.

**NOTES:**
* If you are on Windows and using Microsoft Edge or Internet Explorer, replace `localhost` in this URI with the IP address that you get after running the server.
* If you see a warning about an insecure connection due to using a self-signed certificate, accept the exception. You can trust your localhost.

For the purpose of this tutorial, you are asked to establish a client session by simply logging in to GoodData.

In your production environment, your end users may be authenticated using [single sign-on](sso).

## Step 7. Add GoodData components

Open [https://localhost:3000/](https://localhost:3000/) in your browser.
The default page generated by the create-react-app tool is displayed and looks like the following example:

![screenshot "Welcome to React"](assets/Welcome_to_React.png)

Now, you can start adding your first GoodData component:
1. Open `src/App.js` in a text editor.
2. Add the following line to the other `import`s at the beginning of the `App.js` file:
    ```javascript
    import { LineChart } from "@gooddata/sdk-ui-charts";
    import { newMeasure, newAttribute } from "@gooddata/sdk-model";
    import bearFactory, {ContextDeferredAuthProvider} from "@gooddata/sdk-backend-bear";
    ```
3. Add the following line to the other `import`s at the beginning of the `App.js` file to load CSS:
    ```javascript
    import "@gooddata/sdk-ui-charts/styles/css/main.css";
    ```

4. Initialize the Analytical Backend implemented by the GoodData platform:

    ```javascript
    const backend = bearFactory().withAuthentication(new ContextDeferredAuthProvider());
    ```

5. Add `BackendProvider` and `WorkspaceProvider` to your application:

   ```jsx
   import { BackendProvider, WorkspaceProvider } from "@gooddata/sdk-ui";

   function App() {
       return (
           <BackendProvider backend={backend}>
               <WorkspaceProvider workspace="xms7ga4tf3g3nzucd8380o2bev8oeknp">
                   <div>placeholder</div>
               </WorkspaceProvider>
           </BackendProvider>
       );
   }
   ```

6. Add a simple line chart:

    6a. Define measures and attributes:
    ```javascript
    const measures = [ newMeasure("aaEGaXAEgB7U", m => m.format("#,##0")) ];
    const attribute = newAttribute("date.abm81lMifn6q");
    ```

    6b. Replace the placeholder in your `App` functional component with the following elements:
    ```jsx
    <div style={{ height: 300 }}>
      <LineChart
          measures={measures}
          trendBy={attribute}
          config={{
              colors: ["#14b2e2"]
          }}
      />
    </div>
    ```
    > This example uses the workspace ID and measure/attribute identifiers from the [live examples](https://gdui-examples.herokuapp.com/). If you want to use this code in your workspace, replace the properties with the appropriate values from your workspace. For more details, see [Line Chart](10_vis__line_chart_component.md).

7. Save the changes. The content of your `App.js` file should now look something like the following example:

    ```jsx
    import React from "react";
    import { newMeasure, newAttribute } from "@gooddata/sdk-model";
    import { LineChart } from "@gooddata/sdk-ui-charts";
    import bearFactory, {ContextDeferredAuthProvider} from "@gooddata/sdk-backend-bear";
    import { BackendProvider, WorkspaceProvider } from "@gooddata/sdk-ui";
    import "@gooddata/sdk-ui-charts/styles/css/main.css";

    import "./App.css";

    const backend = bearFactory().withAuthentication(new ContextDeferredAuthProvider());
    const measures = [ newMeasure("aaEGaXAEgB7U", m => m.format("#,##0")) ];
    const attribute = newAttribute("date.abm81lMifn6q");

    function App() {
        return (
            <BackendProvider backend={backend}>
               <WorkspaceProvider workspace="xms7ga4tf3g3nzucd8380o2bev8oeknp">
                    <div style={{ height: 300 }}>
                        <LineChart
                            measures={measures}
                            trendBy={attribute}
                            config={{
                                colors: ["#14b2e2"]
                            }}
                        />
                    </div>
               </WorkspaceProvider>
            </BackendProvider>
        );
    }

    export default App;
    ```

8. Return to your browser window. The default page now looks like the following:

![Welcome to GoodData components](assets/Welcome_to_React_GoodData_component.png)

## Next steps

Here are some suggestions about what you can do after you created your first visualization:

* Add more elements: tables, charts, custom visualizations. For more information, see [how to use visual components](10_vis__start_with_visual_components.md).
* [Enable drilling](15_props__drillable_item.md).
* Authenticate your users using [Single Sign-on (SSO)](sso) rather than sending them to a proxied GoodData login page.
