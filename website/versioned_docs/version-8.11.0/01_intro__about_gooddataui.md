---
id: version-8.11.0-about_gooddataui
title: About GoodData.UI
sidebar_label: About GoodData.UI
copyright: (C) 2007-2018 GoodData Corporation
original_id: about_gooddataui
---

GoodData.UI is a TypeScript framework for building analytical web applications on top of [GoodData Cloud](https://www.gooddata.com/developers/cloud-native/doc/cloud/) and [GoodData Platform](https://help.gooddata.com/doc/enterprise/en).

<div class="intro__wrapper">
    <div class="intro__tile">
        <img src="assets/webcomponents-logo.svg" alt="WebComponents logo" />
        <h2>Web Components</h2>
        <p>Embed GoodData insights and dashboards into a web application in a framework agnostic way.</p>
        <p><a href="#web-components">Learn more</a></p>
    </div>
    <div class="intro__tile">
        <img src="assets/react-logo.svg" alt="React logo" />
        <h2>React Components</h2>
        <p>Embed GoodData analytics into a React web application and customize how they are displayed.</p>
        <p><a href="#react-components">Learn more</a></p>
    </div>
    <div class="intro__tile">
        <img src="assets/javascript-logo.svg" alt="Javascript logo" />
        <h2>REST API Clients</h2>
        <p>Load raw analytical data into your browser or NodeJS application. Use it for custom visualizations or for your app's business logic.</p>
        <p><a href="#rest-api-clients">Learn more</a></p>
    </div>
</div>

GoodData.UI includes various libraries with specific functions, including low-level REST API clients and visualization libraries that provide React-based components for rendering various types of charts and tables.

![Embedding Methods Overview](assets/intro-embedding-methods.png)

>**Embedding Without GoodData.UI?**
>
> It is possible to add GoodData dashboards to your website using iframes, without the need to utilize the GoodData.UI library. See [Embed Visualizations Using Iframes](https://www.gooddata.com/developers/cloud-native/doc/cloud/embed-visualizations/iframes/) in the GoodData Cloud documentation for more information. Keep in mind that only GoodData.UI allows for the embedding of individual visualizations.

## Web Components

Web Components let you embed insights and dashboards easily, while allowing for a high level of integration with the host application. Customization is limited to assigning a title and changing the localization.

In the simplest form, the integration could look something like this:

```html
<!-- Load the library... -->
<script type="module" src="<host_url>/components/<workspace_id>.js?auth=sso">
</script>

<!-- ...and embed a dashboard! -->
<gd-dashboard dashboard="<dashboard_id>"></gd-dashboard>

<!-- ...or an individual insight! -->
<!-- <gd-insight insight="<insight_id>"></gd-insight> -->
```

The result may look like this:

![dashboard embeded with web components](assets/intro-web-components-dashboard.png)

The Web Components library is part of the GoodData.UI. It is loading React and all the necessary dependencies. However, it runs in an isolated scope that will not conflict with other JavaScript running in your app.

See [Introduction to GoodData Web Components](19_webcomponents_intro.md) to get started.

## React Components

Embed visualizations directly into your web application as live components, or build custom permanent components which give you a more granular control over the data flow management and the level of integration with the rest of your application.

### InsightView and DashboardView Components

GoodData.UI includes `InsightView` and `DashboardView` components that allow you to directly embed insights and dashboards that are created and stored in GoodData by referencing their id.

Any changes you make to the embedded insight or dashboard in your GoodData deployment will be reflected in your application:

```javascript
import React from "react";
import { InsightView } from "@gooddata/sdk-ui-ext";
import * as Md from "../../md/full";

export function MyComponent() {
    return (
        <div style={{height:300}}>
            <InsightView
                insight={Md.Insights.MyInsight}
            />
        </div>
    );
}
```

The result may look like this:

![react live insight](assets/intro-react-live-visualization.png)

See [InsightView](10_vis__insight_view.md) and [Introduction to the Dashboard Component](18_dashboard_intro.md) to learn more about `InsightView` and `DashboardView` components.

### Visual Components

Beyond just referencing existing insights or dashboards, you can define and customize an insight in the React code directly.
For example you can make use of one of the supported insight components, in this case a `Treemap`, and have it display data you select:

```javascript
import React from "react";
import { Treemap } from "@gooddata/sdk-ui-charts";
import { modifyMeasure } from "@gooddata/sdk-model";
import * as Md from "../../md/full";

const numberOfChecks = modifyMeasure(Md.NrChecks, (m) =>
    m.format("#,##0").alias("# Checks").title("Number of Checks"),
);

export const TreemapExample = () => {
    return (
        <div style={{ height: 300 }}>
            <Treemap 
                measures={[numberOfChecks]} 
                viewBy={Md.LocationState} 
                segmentBy={Md.LocationCity} 
            />
        </div>
    );
};
```

The result may look like this:

![treemap insight](assets/intro-treemap-visualization.png)

See [Start with Visual Components](10_vis__start_with_visual_components.md) to get started

You can also create entirely new components and visualizations from scratch. We recommend you check out [our example gallery](https://gdui-examples.herokuapp.com/advanced/global-filters) for live examples of what is possible to do with the GoodData.UI.

>**Tip on Getting Started with React Components**
>
> GoodData lets you copy and paste automatically generated React code snippets directly from the web interface. It's a great way to get started with the GoodData.UI framework. See [Embed Visualizations Using React SDK](https://www.gooddata.com/developers/cloud-native/doc/cloud/embed-visualizations/react-sdk/) in the GoodData Cloud documentation to get started.

## REST API Clients

Our execution API lets you fetch data directly from the GoodData analytics engine. See [Custom Executions](50_custom__execution_new.md) to learn how to use GoodData.UI to fetch data. You can use this data in your own custom frontend application, or pass it to the backend to your Node.js application.
