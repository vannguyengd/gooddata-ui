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

export const UseDashboardLoaderExample = () => {
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
