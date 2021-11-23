---
title: Dashboard Embedding
sidebar_label: Embedding
copyright: (C) 2007-2021 GoodData Corporation
id: dashboard_embedding
---

## Embedding Dashboards without plugins

The simplest way of embedding a dashboard is to use the [`Dashboard` component](18_dashboard_component.md) directly.
This approach does not provide any interop with Dashboard Plugins (see [Embedding Dashboards with plugins](18_dashboard_embedding.md#embedding-dashboards-with-plugins) section if you need to support them).

### Example

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

## Embedding Dashboards with plugins

There are two main ways of embedding Dashboards with plugin support:

-   [with local plugins only](18_dashboard_embedding.md#local-plugins-only)
-   [with remote plugins](18_dashboard_embedding.md#remote-plugins)

### Local plugins only

Embedding a Dashboard with local plugin support allows you to customize the embedded dashboard by providing plugins directly in your application.
You can use more than one plugin like this. This way will also ignore any plugins linked to the given dashboard and will use the local plugins only.

#### Example

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
    const { status, result, error } = useDashboardLoader({
        dashboard: dashboardRef,
        // indicate that only local plugins should be used
        loadingMode: "staticOnly",
        // define the extra plugins, this can also be an array
        extraPlugins: LocalExtraPlugin,
    });

    if (status === "loading" || status === "pending") {
        return <div>Loading dashboard...</div>;
    }

    if (error) {
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

### Remote plugins

Embedding Dashboards with remote plugin support allows you to mimic the behavior of the KPI Dashboards application
and dynamically load plugins linked to a particular Dashboard and use them.

For this to work in your application, there are some interoperability requirements that are described in the following sections.

#### Webpack integration

The dynamic plugin loading logic uses the [Webpack Module Federation](https://webpack.js.org/concepts/module-federation/) feature under the hood.
To provide the necessary integration points needed by the Dashboard Plugins, your application must be built using Webpack 5
(the exact version this was tested with is 5.58.0), with the following configuration added to the Webpack config file:

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

#### Using the dynamic loader

Once you have the webpack config updated according to the previous section, you can start using the dynamic plugins.
Using the example below, it will load the Dashboard similar to the [local plugins only example](18_dashboard_embedding.md#local-plugins-only),
but will also load any Plugins linked to the particular Dashboard and use them.

```jsx
import React from "react";

import { idRef } from "@gooddata/sdk-model";
import { useDashboardLoader } from "@gooddata/sdk-ui-loaders";

// create the interop object that the useDashboardLoader uses
// to interact with the module federation system
// both __webpack-prefixed global variables are provided by Webpack
const adaptiveLoadOptions = {
    moduleFederationIntegration: {
        __webpack_init_sharing__: typeof __webpack_init_sharing__ !== "undefined"
            ? __webpack_init_sharing__
            : null,
        __webpack_share_scopes__: typeof __webpack_share_scopes__ !== "undefined"
            ? __webpack_share_scopes__
            : null,
    },
};

const dashboardRef = idRef("<dashboard-identifier>");

export const DynamicPluginsExample = () => {
    const { status, result } = useDashboardLoader({
        dashboard: dashboardRef,
        // indicate that both local and remote plugins should be used
        loadingMode: "adaptive",
        // provide the interop object to the loader
        adaptiveLoadOptions,
    });

    if (status === "loading" || status === "pending") {
        return <div>Loading dashboard...</div>;
    }

    if (error) {
        return <div>Error loading dashboard...</div>;
    }

    // the loader result returns the component to be used
    // and also props that need to be passed to it
    const { DashboardComponent, props: dashboardProps } = result!;
    return (
        <div>
            <DashboardComponent {...dashboardProps} />
        </div>
    );
};
```

Note that you can also use the local plugins in addition to any linked plugins to further customize the Dashboard,
by providing the `extraPlugins` configuration property similarly to the [local plugins only example](18_dashboard_embedding.md#local-plugins-only).

#### Redux integration

TODO

#### Content security policy

TODO
