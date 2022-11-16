---
title: Dashboard Embedding
sidebar_label: Dashboard Embedding
copyright: (C) 2007-2021 GoodData Corporation
id: dashboard_embedding
---

## Embedding a dashboard without plugins

The simplest way of embedding a dashboard is to use the [Dashboard component](18_dashboard_component.md) directly.
This approach does not provide any interoperability with the dashboard plugins (see [Embedding dashboards with plugins](18_dashboard_embedding.md#embedding-dashboards-with-plugins) if you need to support them).

```jsx
// make sure to import styles for components you expect to be on your Dashboards
import "@gooddata/sdk-ui-charts/styles/css/main.css";
import "@gooddata/sdk-ui-geo/styles/css/main.css";
import "@gooddata/sdk-ui-pivot/styles/css/main.css";
// import the styles for the Dashboard component itself
import "@gooddata/sdk-ui-dashboard/styles/css/main.css";

import { idRef } from "@gooddata/sdk-model";
import { Dashboard } from "@gooddata/sdk-ui-dashboard";

<Dashboard dashboard={idRef("<dashboard-identifier>")} />;
```

## Embedding dashboards with plugins

To embed dashboards with plugin support, use the following methods:

-  [Embed with local plugins only](18_dashboard_embedding.md#embed-with-local-plugins-only)
-  [Embed with remote plugins](18_dashboard_embedding.md#embed-with-remote-plugins)

### Embed with local plugins only

Embedding a dashboard with local plugin support allows you to customize the embedded dashboard by providing plugins directly in your application.
You can use more than one plugin. Any plugins linked to the dashboard will be ignored. Only the local plugins will be used.

```jsx
import React from "react";

import { idRef } from "@gooddata/sdk-model";
import { useDashboardLoader } from "@gooddata/sdk-ui-loaders";
import { DashboardPluginV1 } from "@gooddata/sdk-ui-dashboard";

// sample plugin, see other parts of the docs on more details on how to write these
class LocalPlugin extends DashboardPluginV1 {
    author = "your name";
    displayName = "plugin display name"; // useful for debugging
    version = "1.0"; // or whatever version you want

    register(ctx, customize, handlers) {
        // implement your plugin logic here
    }
}

const LocalExtraPlugin = {
    factory: () => new LocalPlugin(),
};

const dashboardRef = idRef("<dashboard-identifier>");

export const LocalPluginsExample = () => {
    const { status, result } = useDashboardLoader({
        dashboard: dashboardRef,
        // indicate that only local plugins should be used
        loadingMode: "staticOnly",
        // define the extra plugins, this can also be an array
        extraPlugins: LocalExtraPlugin,
    });

    if (status === "loading" || status === "pending") {
        return <div>Loading dashboard...</div>;
    }

    if (status === "error") {
        return <div>Error loading dashboard...</div>;
    }

    // the loader result returns the component to be used
    // and also props that need to be passed to it
    const { DashboardComponent, props: dashboardProps } = result;

    return (
        <div>
            <DashboardComponent {...dashboardProps} />
        </div>
    );
};
```

### Embed with remote plugins

Embedding a dashboard with remote plugin support allows you to mimic the behavior of the KPI Dashboards, to dynamically load plugins linked to a particular dashboard and to use them.

For this to work in your application, consider the following interoperability requirements:

#### Webpack integration

The dynamic plugin loading logic uses the [Webpack Module Federation](https://webpack.js.org/concepts/module-federation/) feature underneath.
To provide the necessary integration points that the dashboard plugins need, your application must be built using Webpack 5
(the exact version this was tested with is 5.58.0) with the following configuration added to the Webpack config file:

```js
const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;

// add all the gooddata packages to the module federation scope so that they can be reused
const gooddataSharePackagesEntries = Object.keys(deps)
    .filter((pkg) => pkg.startsWith("@gooddata"))
    .reduce((acc, curr) => {
        acc[curr] = {
            singleton: true,
            eager: true,
        };
        return acc;
    }, {});

module.exports = {
    // ... rest of your webpack config
    plugins: [
        // ... rest of your plugins

        // Add the correctly configured ModuleFederationPlugin
        // Keep all the settings as shown, otherwise strange errors may occur
        new ModuleFederationPlugin({
            shared: {
                react: {
                    import: "react",
                    shareKey: "react",
                    singleton: true,
                    eager: true,
                },
                "react-dom": {
                    singleton: true,
                    eager: true,
                },
                ...gooddataSharePackagesEntries,
            },
        }),
    ],
};
```

#### Content security policy

>This section is only relevant for GoodData.CN users. If you use the GoodData platform, skip this section and proceed to [Using the dynamic loader](18_dashboard_embedding.md#using-the-dynamic-loader).

If you want to use the remote plugins on GoodData.CN, add the server that you use to host the plugin assets into your Content Security Policy configuration.
In your ingress Helm chart, make sure that the following CSP headers have your plugin hosting endpoint included:

-   `script-src`
-   `img-src`
-   `style-src`
-   `font-src`

For example, assuming `plugins.example.com` is your plugin hosting endpoint, you need to add it like this:

```yml
controller:
    # ...rest of your config
    addHeaders:
        # ...rest of your addHeaders
        Content-Security-Policy: >
            script-src 'self' 'unsafe-inline' 'unsafe-eval' plugins.example.com;
            img-src 'self' data: blob: plugins.example.com;
            style-src 'self' 'unsafe-inline' plugins.example.com;
            font-src 'self' data: plugins.example.com;
            ... rest of the CSP headers
```

#### Using the dynamic loader

Once you have [updated the Webpack config](18_dashboard_embedding.md#content-security-policy), you can start using the dynamic plugins.

The following example loads the dashboard similar to the dashboard [embedded with local plugins only](18_dashboard_embedding.md#embed-with-local-plugins-only),
but will also load any plugins linked to this dashboard and use them.

```jsx
import React from "react";

import { idRef } from "@gooddata/sdk-model";
import { useDashboardLoader } from "@gooddata/sdk-ui-loaders";

// create the interop object that the useDashboardLoader uses
// to interact with the module federation system
// both __webpack-prefixed global variables are provided by Webpack
const adaptiveLoadOptions = {
    moduleFederationIntegration: {
        __webpack_init_sharing__:
            typeof __webpack_init_sharing__ !== "undefined" ? __webpack_init_sharing__ : null,
        __webpack_share_scopes__:
            typeof __webpack_share_scopes__ !== "undefined" ? __webpack_share_scopes__ : null,
    },
};

const dashboardRef = idRef("<dashboard-identifier>");

export const DynamicPluginsExample = () => {
    const { status, result } = useDashboardLoader({
        dashboard: dashboardRef,
        // indicate that remote plugins should be used
        loadingMode: "adaptive",
        // provide the interop object to the loader
        adaptiveLoadOptions,
    });

    if (status === "loading" || status === "pending") {
        return <div>Loading dashboard...</div>;
    }

    if (status === "error") {
        return <div>Error loading dashboard...</div>;
    }

    // the loader result returns the component to be used
    // and also props that need to be passed to it
    const { DashboardComponent, props: dashboardProps } = result;
    return (
        <div>
            <DashboardComponent {...dashboardProps} />
        </div>
    );
};
```

#### Using both local and remote plugins

To use both local and remote plugins to further customize the dashboard, provide the `extraPlugins` configuration property similarly to how it is done when [embedding a dashboard with local plugins only](18_dashboard_embedding.md#embed-with-local-plugins-only).
However, to make sure that your local plugins keep working, you need to pass down a special constant to the Dashboard component called `ReactDashboardContext`:

```jsx
import React from "react";

import { idRef } from "@gooddata/sdk-model";
import { useDashboardLoader } from "@gooddata/sdk-ui-loaders";
// import the ReactDashboardContext constant from the package
import { ReactDashboardContext } from "@gooddata/sdk-ui-dashboard";

const adaptiveLoadOptions = {
    // omitted for brevity
};

const dashboardRef = idRef("<dashboard-identifier>");

export const MixedPluginsExample = () => {
    const { status, result } = useDashboardLoader({
        dashboard: dashboardRef,
        // indicate that both local and remote plugins should be used
        loadingMode: "adaptive",
        // provide the interop object to the loader
        adaptiveLoadOptions,
        // define the extra plugins, this can also be an array
        extraPlugins: SomeLocalPlugin, // omitted for brevity
    });

    if (status === "loading" || status === "pending") {
        return <div>Loading dashboard...</div>;
    }

    if (status === "error") {
        return <div>Error loading dashboard...</div>;
    }

    // the loader result returns the component to be used
    // and also props that need to be passed to it
    const { DashboardComponent, props: dashboardProps } = result;
    return (
        <div>
            <DashboardComponent
                {...dashboardProps}
                // pass the ReactDashboardContext constant this property to the Dashboard component
                // this will ensure that local plugins will keep working even when using dynamic plugins as well
                additionalReduxContext={ReactDashboardContext}
            />
        </div>
    );
};
```
