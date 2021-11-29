---
title: Dashboard Component
sidebar_label: React Component
copyright: (C) 2007-2021 GoodData Corporation
id: dashboard_component
---

>  **Parts of the Dashboard component are still in the beta stage.**
>
> The Dashboard component already has a rich API however not all of it stable at this moment. Please heed the API
> maturity annotations and be keep in mind that we may break APIs that are on `alpha` or `beta` level in the
> future releases.

The `Dashboard` component is a highly customizable component that renders dashboards created and saved by KPI Dashboards.

The `Dashboard`:

* Allows you to embed the dashboard natively in React in **view mode** (similarly to [InsightView](10_vis__insight_view.md) for visualizations).
* Provides mechanisms to allow you to integrate it with the rest of your application. ([Commands](#Commands) and [Events](#Events))
* Allows you to customize the way the dashboard is rendered: you can alter the layout and change the way particular widgets are rendered (see see [Props](#Props) and [Selectors](#Selectors)).

The `Dashboard` component is realized using an architecture resembling the Model-View-Controller:

-  Model part is implemented with Redux and redux-saga. Model exposes rich API - selectors to get data from
   component's state, events to describe changes and interactions with the dashboard and finally commands to trigger changes

-  View and controller parts are implemented using React components and hooks. The top-level `Dashboard` component
   also has a rich API - props to specify dashboard to render, configuration for rendering, customization of almost
   all view components used on a dashboard and finally integration with the eventing.


## Basic usage

```jsx

import  "@gooddata/sdk-ui-dashboard/styles/css/main.css";

import  { Dashboard }  from  "@gooddata/sdk-ui-dashboard";
import  { idRef }  from  "@gooddata/sdk-model";
  
const dashboardRef = idRef("<dashboard-identifier>");

const EmbeddedReactDashboard = () => {
    return (
        <Dashboard dashboard={dashboardRef} />
    );
};

```

## Props

As every other React component, first way how to affect the Dashboard component behavior is by its props.

Let's see the most important ones:

### Base Props

| Name             | Required? | Type                 | Description                                                                                                                                                                                                                                                                                                                                           |
| :--------------- | :-------- | :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| dashboard        | true      | ObjRef or IDashboard | The reference to the dashboard to render, or the loaded dashboard                                                                                                                                                                                                                                                                                     |
| filterContextRef | false     | ObjRef               | Optionally specify reference to a filter context that should be used instead of the default, built-in filter context. Note: this property only makes sense if you also specify `dashboard` by reference. If you specify dashboard by value, then the component assumes that the value also contains the desired filter context and will use it as is. |
| config           | false     | DashboardConfig      | Configuration that can be used to modify dashboard features, capabilities and behavior. If not specified, then the dashboard will retrieve and use the essential configuration from the backend.                                                                                                                                                      |

### Customizations Props

| Name                     | Required? | Type                             | Description                                                                                                                                                                                               |
| :----------------------- | :-------- | :------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| customizationFns         | false     | DashboardModelCustomizationFns   | Optionally specify customization functions. The dashboard component will call out to these functions at different points during its lifetime. See documentation of the different functions to learn more. |
| InsightComponentProvider | false     | OptionalInsightComponentProvider | Optionally specify function to obtain custom component to use for rendering an insight.                                                                                                                   |
| KpiComponentProvider     | false     | OptionalKpiComponentProvider     | Optionally specify function to obtain custom component to use for rendering a KPI.                                                                                                                        |
| WidgetComponentProvider  | false     | OptionalWidgetComponentProvider  | Optionally specify function to obtain custom component to use for rendering either built-in or custom widget.

### Eventing Props

| Name                  | Required? | Type                    | Description                                                                                                                                                                 |
| :-------------------- | :-------- | :---------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| eventHandlers         | false     | DashboardEventHandler[] | Optionally specify event handlers to register at the dashboard creation time.                                                                                               |
| onEventingInitialized | false     | Function                | Optionally specify callback that will be called when the dashboard eventing subsystem initializes and it is possible to register new or unregister existing event handlers. |
| onStateChange         | false     | Function                | Optionally specify callback that will be called each time the state changes.                                                                                                |

Check [full list](https://github.com/gooddata/gooddata-ui-sdk/blob/master/libs/sdk-ui-dashboard/src/presentation/dashboard/types.ts) of the `Dashboard` component props.

## Selectors

You can obtain current `Dashboard` state values by using `useDashboardSelector` hook with relevant selector passed to
it (all dashboard selectors are starting with `select` prefix). Selectors have the cache, so the reference equality of
the return value should remain the same (unless the value itself changed) - this is useful to avoid unnecessary React re-renders.

```jsx
import  { useDashboardSelector, selectInsights }  from  "@gooddata/sdk-ui-dashboard";

const CustomDashboardWidget = () => {
    // Example how to obtain all insights stored on the dashboard
    const insights = useDashboardSelector(selectInsights);
    
    return (
        <pre>{JSON.stringify(insights, null, 2)}</pre>
    );
}
```

See all available [selectors](https://github.com/gooddata/gooddata-ui-sdk/blob/master/libs/sdk-ui-dashboard/src/model/store/index.ts).

## Commands

Commands are Redux actions that you can dispatch to the Dashboard component in order to initiate change of the rendered
Dashboard. To dispatch a command, there is a hook called `useDashboardDispatch`. As the Dashboard component handles
a command it will emit one or more events describing what has happened. Typically, at least one event describing
the accomplished result will be emitted.

The events emitted during command handling will be sent to all handlers added for the respective event type. To
allow for request-response semantics each command may specify a custom correlation id that will be included in
all events emitted during the command processing.

> IMPORTANT: Commands are the only valid and supported way to modify a rendered dashboard. You must not alter the
> `Dashboard` state by directly mutating it as it can lead to undesired behavior and bugs.

```jsx
import  { useDashboardSelector }  from  "@gooddata/sdk-ui-dashboard";

const CustomDashboardWidget = () => {
    const dispatch = useDashboardDispatch();
    const correlationId = "triggeredByCustomDashboardWidget";
	
    return (
        <button
            onClick={() => dispatch(changeFilterContextSelection(updatedFilters), false, correlationId)}
        >
            Change filters
        </button>
    )
}

```

See all available [commands](https://github.com/gooddata/gooddata-ui-sdk/blob/master/libs/sdk-ui-dashboard/src/model/commands/index.ts).

## Events

Events informs you about what happened in the Dashboard component. (e.g. the filters changed). Following code represents example of listening to all dashboard events.

```jsx
import  "@gooddata/sdk-ui-dashboard/styles/css/main.css";

import  { Dashboard, anyEventHandler }  from  "@gooddata/sdk-ui-dashboard";
import  { idRef }  from  "@gooddata/sdk-model";
  
const dashboardRef = idRef("<dashboard-identifier>");

const EmbeddedReactDashboard = () => {
    return (
        <Dashboard
            dashboard={dashboardRef}
            eventHandlers={[
                anyEventHandler((e) => {
                    console.log("Dashboard event fired:", e);
                }),
            ]}
        />
    );
};
```

See all available [events](https://github.com/gooddata/gooddata-ui-sdk/blob/master/libs/sdk-ui-dashboard/src/model/events/index.ts).

## Configuration

Dashboard configuration can influence the available features, look and feel and behavior of the dashboard. You can
specify the configuration using the `config` prop. All configuration properties are optional. For most of them, the
Dashboard component can reliably retrieve values from the analytical backend.

| Name        | Required? | Type        | Description                                                                                                                                                                                                                                                                      |
| :---------- | :-------- | :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| locale      | false     | ILocale     | `locale` is the localization of the visualization that defaults to the locale set for the current user. For other languages, see the [full list of available localizations](https://github.com/gooddata/gooddata-ui-sdk/blob/master/libs/sdk-ui/src/base/localization/Locale.ts) |
| separators  | false     | ISeparators | `separators` specifies the [number format](15_props__chart_config.md#change-a-separator-in-the-number-format).                                                                                                                                                                   |
| mapboxToken | false     | string      | `mapboxToken` is the map access token to be used by [geo pushpin charts](10_vis__geo_pushpin_chart_component.md#geo-config).                                                                                                                                                     |
| isReadOnly  | false     | boolean     | If set to true, the dashboard will be embedded in a read-only mode disabling any user interaction that would alter any backend state (disabling creating/changing alerts, creating scheduled emails, etc.).                                                                      |

See all configuration [options](https://github.com/gooddata/gooddata-ui-sdk/blob/master/libs/sdk-ui-dashboard/src/model/types/commonTypes.ts).
