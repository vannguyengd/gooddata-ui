---
title: DashboardView
sidebar_label: DashboardView
copyright: (C) 2007-2021 GoodData Corporation
id: dashboard_view_component
---

> **The DashboardView component is in the beta stage.**
>
> The component may be changed in future releases, even in a backward incompatible way.

The **DashboardView component** is a generic component that renders dashboards created and saved by KPI Dashboards.

The DashboardView:

* Allows you to embed the dashboard natively in React in **view mode** (similarly to [InsightView](10_vis__insight_view.md) for visualizations).
* Provides mechanisms to allow you to integrate it with the rest of your application. For example, you can provide a custom filtering UI (see [Integration with your application](#integration-with-your-application)). The users with the appropriate permissions can set [KPI alerts](#kpi-alerts) and create [scheduled emails](#scheduled-emails) (unless you enable [read-only mode](#read-only-mode)).
* Allows you to customize the way the dashboard is rendered: you can alter the layout and change the way particular widgets are rendered (see [Customizations](#customizations)).

## Structure

```jsx
import "@gooddata/sdk-ui-ext/styles/css/main.css";
import { DashboardView } from "@gooddata/sdk-ui-ext";

<DashboardView dashboard="<dashboard-identifier>" />;
```

```jsx
import "@gooddata/sdk-ui-ext/styles/css/main.css";
import { DashboardView } from "@gooddata/sdk-ui-ext";
import { uriRef } from "@gooddata/sdk-model";

<DashboardView dashboard={uriRef("<dashboard-uri>")} />;
```

## Filters

The DashboardView component respects any filters set for the dashboard in KPI Dashboards.
To override these filters, provide a value for the `filters` prop. These filters will then be used for the following:

* Rendering the dashboard
* Setting up [KPI alerts](#kpi-alerts)
* Creating [scheduled emails](#scheduled-emails) (to disable this behavior and go back to using the filters set for the dashboard, set the `applyFiltersToScheduledMail` prop to `false`).

To add more filters to the dashboard with already existing filters, use the `mergeFiltersWithDashboard` function.
See the [live example](https://gdui-examples.herokuapp.com/dashboardView/with-merged-filters).

For more information about the filters themselves, see [Filter Visual Components](30_tips__filter_visual_components.md).
Alternatively, you can pass filters specified using the [`FilterContextItem`](https://github.com/gooddata/gooddata-ui-sdk/blob/6ba2ed93163b830a6a0f03437861ac9ef1d423be/libs/sdk-backend-spi/src/workspace/dashboards/filterContext.ts#L133) type. The main difference between FilterContextItem filters and the standard filters is that FilterContextItem date filters do not specify a date dimension and therefore are applied to all the date dimensions (this is how KPI Dashboard date filters work).

> **NOTE**: To identify the attributes and attribute elements, use their URIs, not IDs.

## Themes

The DashboardView component supports themes (see [Theme Provider](10_vis__theme_provider.md)) and will try to obtain the theme configuration by the following algorithm:

1. If the `theme` prop is provided, its value will be used as the theme configuration.
1. If the DashboardView component has a Theme Provider element as one of its parents, DashboardView will use the configuration of the closest Theme Provider parent.
1. If no Theme Provider is provided, the DashboardView component will create its own Theme Provider, and this Theme Provider will try to get the theme from its workspace.

    **NOTE:** To disable this behavior, set the `disableThemeLoading` prop to `true` (if not set, it defaults to `false`).

## Configuration

To provide visualization-specific configuration for the visualizations rendered by the DashboardView component, use the `config` prop:

-  `mapboxToken` is the map access token to be used by [geo pushpin charts](10_vis__geo_pushpin_chart_component.md#geo-config).
-  `separators` specifies the [number format](15_props__chart_config.md#change-a-separator-in-the-number-format).
-  `locale` is the localization of the visualization that defaults to the locale set for the current user. For other languages, see the [full list of available localizations](https://github.com/gooddata/gooddata-ui-sdk/blob/master/libs/sdk-ui/src/base/localization/Locale.ts).
-  `disableKpiDrillUnderline` specifies whether KPIs with enabled drilling are underlined (`false`; default) or not underlined (`true`).

## Drilling

The DashboardView component supports firing of drill events from drilling set up on a dashboard.
* To listen to drilling events, provide the `onDrill` prop (see [OnDrill](15_props__on_drill.md)).
* To specify drillable items different from those set on the dashboard in KPI Dashboards, use the `drillableItems` prop (see [Drillable Items](15_props__drillable_item.md)).

## Scheduled emails

You can allow users to create [scheduled emails](https://help.gooddata.com/pages/viewpage.action?pageId=66202520) for a dashboard.

To allow displaying the dialog for setting up a scheduled email, setting the `isScheduledMailDialogVisible` prop to `true`.

Additionally, you can use the following props to interact with the dialog:

-  `onScheduledMailDialogSubmit` is called when the user confirms the creation of a scheduled email. The callback will receive the scheduled email definition that the user submitted as a parameter.
-  `onScheduledMailDialogCancel` is called when the user cancels or closes the scheduled email dialog.
-  `onScheduledMailSubmitSuccess` is called when a scheduled email is created and stored on the server. The callback will receive the saved definition of the scheduled email as a parameter.
-  `onScheduledMailSubmitError` is called when the creation of a scheduled email fails. The callback will receive the error object as a parameter.

By default, the scheduled emails created this way are filtered by the filters passed in the `filters` prop if specified (see [Filters](#filters)) or fall back to the filters set up on the dashboard in KPI Dashboards. If you want the scheduled emails to always use the filters that are set on the dashboard in KPI Dashboards, set the `applyFiltersToScheduledMail` prop to `false` (if not set, it defaults to `true`).

The following is a simple example of how to handle the scheduled email dialog:

```jsx
import React, { useState } from "react";
import { DashboardView } from "@gooddata/sdk-ui-ext";
import "@gooddata/sdk-ui-ext/styles/css/main.css";

const DashboardViewWithEmails = () => {
    const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
    return (
        <>
            <button onClick={() => setIsEmailDialogOpen(true)}>Open Schedule Email Dialog</button>
            <DashboardView
                dashboard="dashboard-id"
                isScheduledMailDialogVisible={isEmailDialogOpen}
                onScheduledMailDialogCancel={() => setIsEmailDialogOpen(false)}
                onScheduledMailSubmitSuccess={() => {
                    alert("Scheduled email scheduled successfully");
                    setIsEmailDialogOpen(false);
                }}
                onScheduledMailSubmitError={() => {
                    alert("Scheduled email error");
                    setIsEmailDialogOpen(false);
                }}
            />
        </>
    );
};
```

## KPI alerts

The DashboardView component supports displaying, creating, editing, and deleting of [KPI alerts](https://help.gooddata.com/pages/viewpage.action?pageId=34341718).

The KPI alerts use the filters in the `filters` prop if provided (see [Filters](#filters)), or fall back to the filters set up on the dashboard in KPI Dashboards.

## Read-only mode

By default, the DashboardView component allows users with the appropriate permissions to create KPI alerts and scheduled emails. If you want to disable this behavior and completely disable the [KPI alerts](#kpi-alerts) and [scheduled emails](#scheduled-emails) features of DashboardView, set the `isReadOnly` prop to `true` (if not set, it defaults to `false`).

## Customizations

> **NOTE:** All the customizations described in this section are applied only to the DashboardView component itself. They will **not** affect scheduled emails, PDF exports, or emails coming from KPI alerts.

To customize the way how individual dashboard widgets are rendered, provide a [render prop](https://reactjs.org/docs/render-props.html) to the `widgetRenderer` prop.
It should return a piece of JSX representing the widget. This render prop will be called with an object containing the following properties:

| Name             | Type                             | Description                                                                                                                |
| :--------------- | :------------------------------- | :------------------------------------------------------------------------------------------------------------------------- |
| widget           | IWidget                          | The information about the widget as specified in the dashboard                                                             |
| renderedWidget   | ReactElement                     | The widget as rendered by the default logic; you can use it to opt out of customizations for a specified widget by returning this |
| insight          | IInsight or undefined            | The insight object relevant to the widget (if the widget is not a KPI)                                                        |
| alert            | IWidgetAlert or undefined        | The widget alert relevant to the widget (if the widget is a KPI and the user has an alert set)                              |
| filters          | FilterContextItem[] or undefined | Sanitized filters provided to the `filters` prop if any                                                                  |
| predicates       | IWidgetPredicates                | A set of [predicates](#predicates) provided to help you choose widgets for custom rendering                                |
| customWidget | any | The custom widget provided from the user (if the widget is a custom widget, see [Layout](#layout)) |
| ErrorComponent   | Component                        | A component to be rendered if the widget is in error state (see [ErrorComponent](15_props__error_component.md))            |
| LoadingComponent | Component                        | A component to be rendered if the widget is in loading state (see [LoadingComponent](15_props__loading_component.md))      |

Ensure that your custom widgets are responsive and have the height and width set to 100%.

For more information, see the [live example](https://gdui-examples.herokuapp.com/dashboardView/custom-chart).

### Predicates

The `predicates` property of the argument that the `widgetRenderer` prop is called with contains a set of convenience functions that can help you decide which widgets you want to render which way. You can use the following predicates:

-  `isWidgetWithRef(ref)` to match a particular widget
-  `isWidgetWithInsightRef(ref)` to match widgets with a particular insight
-  `isWidgetWithInsightType(type)` to match widgets with insights with a particular visualization type
-  `isWidgetWithKpiRef(ref)` to match widgets with a particular KPI
-  `isWidgetWithKpiType(comparisonType)` to match widgets with KPI of a certain comparison type (for example, `Previous Period`)
-  `isCustomWidget()` to match widgets that are not commonly part of the dashboard (for example, your custom widgets added in the DashboardView `transformLayout` callback)

### Auxiliary hooks

To make implementation of the custom renderers as easy as possible, we provide convenience hooks that you can use to obtain exactly the same data as the default renderer would:

-  `useDashboardWidgetExecution` creates a `PreparedExecution` for the specified widget.
-  `useDataView` executes the specified `PreparedExecution` and returns the resulting data.

See the [live example](https://gdui-examples.herokuapp.com/dashboardView/custom-chart).

## Layout

You can customize the dashboard layout (for example, filter or reorder the widgets), or even extend it with you own custom widgets. To do so, use the `transformLayout` callback.

The dashboard layout consists of sections. Each section can contain a header with a title and description, and a subset of items. Each item consists of a size setting and data for the widget. The total width of the layout grid is 12 columns. You cannot change it.

To make layout transformations more convenient, the `transformLayout` callback is called with the `layoutBuilder` parameter that provides an interface with commonly needed methods for transformations (add/remove/modify).

```jsx
import "@gooddata/sdk-ui-ext/styles/css/main.css";
import { DashboardView } from "@gooddata/sdk-ui-ext";
import { idRef } from "@gooddata/sdk-model";

<DashboardView
    dashboard={idRef("<dashboard-id>")}
    transformLayout={(layoutBuilder) => {
        // Modify the first layout section
        layoutBuilder.modifySection(0, (section) =>
            // Add a full-width item to the section
            section.addItem({ gridWidth: 12 }, (item) =>
                // Set custom widget data for the item
                item.widget("Hello world!")
            )
        );

        // Return the layout builder with the transformations applied
        return layoutBuilder;
    }}
    widgetRenderer={({ predicates, customWidget, renderedWidget }) => {
        if (predicates.isCustomWidget()) {
            return (
                // Render the custom widget data
                <div style={{ height: "100%", width: "100%" }}>{customWidget}</div>
            );
        }

        // Fall back all other widgets to common rendering
        return renderedWidget;
    }}
/>;
```

See the [live example](https://gdui-examples.herokuapp.com/dashboardView/advanced-customizations).

## Integration with your application

The DashboardView component provides the following mechanisms to facilitate its integration into your application:

* The `onDashboardLoaded` callback to get all the information about the dashboard object and any KPI alerts set on it for a specific user. This also includes information about any filters set up on the dashboard (so that you can accordingly initialize any filter UI that you might have).

* The `filters` property to replace the filters of the dashboard so that you can create a custom filter UI for your application.

* The `onFiltersChange` callback that is called whenever a widget inside the DashboardView component requests that the filters be changed (this can happen when a user opens a KPI alert that was created using different filters than those currently used and wants to use the filters that were active when the KPI alert was created).

* The `onDrill` callback to detect and react to any drilling events happening inside the DashboardView component.

* The `useDashboardPdfExporter` hook to export a dashboard to PDF (this will not reflect any [customizations](#customizations) you may have made). See the [live example](https://gdui-examples.herokuapp.com/dashboardView/with-export).

You can also [emulate edit mode](30_tips__embed_dashboard.md#edit-mode).

## Caching

To properly render the referenced dashboards and their visualizations, the DashboardView component needs additional information from the GoodData platform. This information is usually static. To minimize the number of redundant requests and reduce the rendering time, some static information (such as the list of visualization classes, the color palette, or feature flags for each workspace) is cached for all DashboardView components in the same application.

The amount of the cached information does not impact performance in any way. However, you can manually clear the cache whenever needed (for example, after logging out, when switching workspaces or leaving a page with visualizations using the GoodData.UI components).

```javascript
import { clearDashboardViewCaches } from "@gooddata/sdk-ui-ext";
...
clearDashboardViewCaches();
...
```

## Properties

| Name                         | Required? | Type                                             | Description                                                                                                                                       |
| :--------------------------- | :-------- | :----------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| dashboard                    | true      | ObjRef or string                                 | The reference to the dashboard to render                                                                                                              |
| filters                      | false     | Array<IDashboardFilter &#124; FilterContextItem> | The filters to use in the dashboard (see [Filters](#filters))                                                                                        |
| onFiltersChange              | false     | Function                                         | The function called when the filters should be changed (see [Integration with your application](#integration-with-your-application))                           |
| config                       | false     | IDashboardConfig                                 | The configuration object for the visualizations (see [Configuration](#configuration))                                                                 |
| drillableItems               | false     | [IDrillableItem[]](15_props__drillable_item.md)  | An array of points and attribute values to be drillable                                                                                           |
| onDrill                      | false     | Function                                         | A callback when a drill is triggered on any widget in the dashboard                                                                       |
| theme                        | false     | ITheme                                           | The theme to be used for the dashboard (see [Themes](#themes))                                                                                      |
| disableThemeLoading          | false     | boolean                                          | If `true`, DashboardView does not try to load a theme from the backend (defaults to `false`)                                                                              |
| ErrorComponent               | false     | Component                                        | A component to be rendered if this component (or any widget) is in error state (see [ErrorComponent](15_props__error_component.md))       |
| LoadingComponent             | false     | Component                                        | A component to be rendered if this component (or any widget) is in loading state (see [LoadingComponent](15_props__loading_component.md)) |
| onDashboardLoaded            | false     | Function                                         | The function called when the data for the dashboard is loaded (see [Integration with your application](#integration-with-your-application))                    |
| onError                      | false     | Function                                         | The function called in case of any error, either in the dashboard loading or any widget execution                                                     |
| isScheduledMailDialogVisible | false     | boolean                                          | If `true`, the dialog for scheduled emails is displayed (defaults to `false`)                                                                    |
| applyFiltersToScheduledMail  | false     | boolean                                          | If `false`, the scheduled emails use the filters that are set on the dashboard in KPI Dashboards rather than the filters from the `filters` prop (see [Scheduled emails](#scheduled-emails)) (defaults to `true`)                                   |
| onScheduledMailDialogSubmit  | false     | Function                                         | The function called when the user submits changes made in the scheduled email dialog                                                                                               |
| onScheduledMailDialogCancel  | false     | Function                                         | The function called when the user closes the scheduled email dialog                                                                                                |
| onScheduledMailSubmitSuccess | false     | Function                                         | The function called when a scheduled email was successfully created                                                                                          |
| onScheduledMailSubmitError   | false     | Function                                         | The function called when creating of a scheduled email failed                                                                                                 |
| isReadOnly                   | false     | boolean                                          | If `true`, [read-only mode](#read-only-mode) is enabled (defaults to `false`)                                                               |
| widgetRenderer               | false     | Function                                         | The render prop to override the rendering of individual widgets (see [Customizations](#customizations))                                                   |
| transformLayout              | false     | Function                                         | A callback to transform the dashboard layout (see [Layout](#layout))                                                                                |
