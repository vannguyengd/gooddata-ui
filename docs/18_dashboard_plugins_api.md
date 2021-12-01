---
title: Dashboard Plugin API
sidebar_label: Dashboard Plugin API
copyright: (C) 2007-2021 GoodData Corporation
id: dashboard_plugins_api
---

There are several categories of APIs that your plugin can take advantage of. This document covers outlines the APIs
available in each category and gives pointers to API Reference and code where needed.

All the public and most of the alpha-level APIs have detailed documentation in form of TSDoc. We generate the API
doc website from these comments - you can find the [API Reference here](https://sdk.gooddata.com/gooddata-ui-apidocs/v8.7.0/docs/sdk-ui-dashboard.html).

## Plugin Contract

The plugin contract is the first API that you will come in touch with. The contract defines properties that you need
to fill in and functions to implement. Of special interest are the functions which allow you to specify code
to run on load, during registration and after unload.

A new plugin bootstrapped using our [Plugin Development Toolkit](18_dashboard_plugins#getting-started) will set up
all the contract essentials and provide a template implementation of some of the functions. It does so by subclassing
the `DashboardPluginV1`.

You can modify your subclass as needed and if needed even add plugin specific internal state into this class.

#### onPluginLoaded

If you implement this function, it will be called right after your plugin is loaded and is about to be used on a Dashboard.
At this point, your code receives information about the context in which it will operate. Most notably:

-  Analytical Backend that is currently in use
-  Workspace that the user works with
-  Reference of dashboard that is about to be loaded

The analytical backend setup, authenticated and ready to use in case your plugin needs to read additional data from
the backend.

This function may return a Promise. In that case, the Dashboard Loader will wait until the promise is resolved and
then proceed. The loader does not impose any timeout on the onPluginLoaded call. If you make calls over the network it
is a good thing to cater for failures and include timeouts and necessary fallbacks.

Note: if your implementation of this function fails with an exception, the loader will exclude your plugin from further processing.

##### Parameterization

To allow for plugin reuse across dashboards, it is possible that each link between a dashboard and your plugin specifies
additional parameters. The idea is that these parameters can then be used to customize the behavior of the plugin for
the particular dashboard.

Both the GoodData platform and GoodData.CN treat parameters opaquely. We only impose soft size limits of 2048 bytes for
the length of the parameter string. Otherwise the parameters are fully under your control and responsibility.

If the parameters are specified on the link between a dashboard and your plugin, then the loader will send them as
second argument to the `onPluginLoad`

#### register

This is the mandatory function that your plugin must implement. It is called after the plugin is loaded and it is here
where you can register customizations to the dashboard.

Your function will be always called with three parameters:

-  Dashboard Context

   Same as in the `onPluginLoaded`, the context contains essential information describing backend, workspace and
   dashboard.

-  Customization API

   The customization API allows your code to add new content onto a dashboard. Calls to these APIs are only valid
   during the registration phase. If you hold onto the received APIs and attempt to make changes later on, they
   will have no effect and will result in warnings in browser console.

   We describe the customization API further on in this document.

-  Event Handler API

   The event handler API allows your code to add or remove your own custom event handlers for the different events
   happening on the dashboard. If needed, you can hold onto the event handler API and use it to add or remove handlers
   at any time during the plugin lifecycle.

   We describe the event handler API further on in this document.

#### onPluginUnload

If you implement this function, it will be called right before the dashboard that uses your plugin is unmounted. This is
where your code can do additional teardown and cleanup specific to your plugin.

Your function may be asynchronous and return a Promise. At this point, the Dashboard Loader will not wait for the returned
Promise to resolve.

## Customization API

This API is an entry point to all the customization and enhancement capabilities that your code can take advantage of. The
API has thorough description in the [API Reference](https://sdk.gooddata.com/gooddata-ui-apidocs/v8.7.0/docs/sdk-ui-dashboard.idashboardcustomizer.html).

### Customizing rendering of Insights

Calling the `insightWidgets()` method on the customization API will lead you to the API through which you can customize
how the [insight widgets](https://sdk.gooddata.com/gooddata-ui-apidocs/v8.7.0/docs/sdk-ui-dashboard.idashboardinsightcustomizer.html) on your dashboard will be rendered.

The main use case for this is rendering data for one or more insights using your own custom visualizations. Additional
use case is to add additional elements on top of the insight widgets that are rendered using the built in renderers.

To address the custom visualization use case, the insight widget customization API provides two methods:

-  `withCustomProvider()`

   Calling this method, you can register a function that will be called by the Dashboard component every time it
   wants to render an insight widget. The function will receive widget definition and the insight to be renderer and
   is expected to return a React component to use for rendering of that widget. If the function does not return
   a custom component, then the Dashboard component falls back and will use the built in component.

   Your function must _somehow_ (this is up to you) determine that particular insight widget should be rendered using
   a custom component and then return the custom component.

-  `withTag()`

   This is a convenience method on top of the `withCustomProvider`. A natural way to identify insight widgets to render
   using custom components is to use tags. You can assign arbitrary tags to your insight objects and then use this
   method to register a renderer for insight widgets that have this tag.

   Please consult either GoodData platform or GoodData.CN API documentation to learn how to tag insights.

To address the use case of additional elements on top of insight widgets, the insight widget customization API provides
a method to register a 'decorator':

-  `withCustomDecorator()`

   Decorators in some way resemble concept of middleware that you may be used to from `express` or `redux`. Instead of
   registering a function that evaluates widget and insight and returns a React component, for decorators you have to
   go one layer further.

   For a decorator, you need to register a factory function. This factory function receives a provider for component to decorate
   and must then return a function to provide decorator component. The function to return has same signature as
   the insight provider function that you register in `withCustomProvider`.

   This is best described in code:

     ```javascript
     withCustomDecorator((next) => {
         return (insight, widget) => {
             if (some_condition_to_prevent_decoration) {
                 return undefined;
             }

             function MyCustomDecorator(props) {
                  const Decorated = next(insight, widget);

                  return (
                      <div>
                          <p>My Custom Decoration</p>
                          <Decorated {...props} />
                      </div>
                  )
             }

             return MyCustomDecorator;
         }
     })
     ```

### Customizing rendering of KPIs

Calling the `kpiWidgets()` method on the customization API will lead you to the API through which you can customize
how the [KPI widgets](https://sdk.gooddata.com/gooddata-ui-apidocs/v8.7.0/docs/sdk-ui-dashboard.idashboardkpicustomizer.html) on your dashboard will be rendered.

KPI widgets are special type of widgets available only on the GoodData platform. Their purpose is to render value of
a single measure, possibly compared to the value of the measure in previous period. The KPI Widgets additionally
allow dashboard consumers to register alerts for when the measure value changes.

Analogous to the insight widget customization API, you can register your own components to render KPI widgets or
to add extra elements on top of the widgets.

The KPI customization API contains `withCustomProvider()` and `withCustomDecorator()` methods that behave same as
their insight widget counterparts.

### Custom widgets

With custom widgets, you can enrich dashboards with arbitrary content. For example your dashboard will be using
the built-in insight and widget renderers and then using the custom widgets you add extra content such as images,
additional text or forms.

Your must first register a custom widget type - this is essentially a declaration of the custom widget type. The declaration
links the custom widget type name and the React component to use for rendering.

Once you register the custom widget type, you can add any number of widgets of this type onto your dashboard using the
layout manipulation API.

Note: the default plugin bootstrapped by the Plugin Development Toolkit defines a sample custom widget already so you
can check it out and try hands on right away.

#### Registering custom widget types

Calling the `customWidgets()` method on the customization API will lead you to the API through which you can
register [custom widget types](https://sdk.gooddata.com/gooddata-ui-apidocs/v8.7.0/docs/sdk-ui-dashboard.idashboardwidgetcustomizer.html).

Use the `addCustomWidget()` method to register a custom widget type and provide your custom React component. The
props for this component will be of the `IDashboardWidgetProps` type. The `widget` property will contain payload
for the custom widget.

#### Adding custom widgets onto dashboard

Now that you have a custom widget type registered, you can add instances of widgets of this type onto a dashboard. You
can do this by using the layout manipulation API.

Calling the `layout()` method on the customization API will lead you to the API through which you can [customize the
layout](https://sdk.gooddata.com/gooddata-ui-apidocs/v8.7.0/docs/sdk-ui-dashboard.idashboardlayoutcustomizer.html). To be prepared for possible different types of layouts in the future, the layout manipulation API contains
methods to customize layout of particular type.

At the moment the Dashboard component supports only the fluid 12-column grid layout. To customize this layout, use
the `customizeFluidLayout()` function to register your customization function.

The fluid layout customization function is something that you have to implement. The function is called with
two parameters:

-  layout as currently defined on the dashboard

   The layout is provider here so that if needed, your code can inspect the layout and determine what and where
   to customize. Depending on your use case, you may or may not need to inspect the layout. For instance if you
   are adding a custom header on top of the dashboard, you can just do that

-  [fluid layout customization API](https://sdk.gooddata.com/gooddata-ui-apidocs/v8.7.0/docs/sdk-ui-dashboard.ifluidlayoutcustomizer.html)

   This API allows you to add new sections (rows) onto a dashboard or add new items (columns) into existing
   sections.

_Note: the function that you register at this point will be called once during the dashboard initialization to modify
the layout before it is stored in the Dashboard component's state. Further modifications of the layout that is
already rendered are not supported by this API. The Dashboard component provides alpha-level APIs that can be
used to add, move or remove widgets once the Dashboard component is rendered._

#### Creating sections, items and custom widgets

We would like to discourage you from 'manually' creating sections, item and custom widget objects. The Dashboard component
contains convenient factory functions to create these objects:

-  `newDashboardSection` - creates a new section (row) with a number of items (columns) that contain custom widgets
-  `newDashboardItem` - creates a new item (column) that contains custom widget
-  `newCustomWidget` - creates custom widget

   When creating custom widget you have to specify unique identifier for this widget, the type of the custom widget
   and optionally additional data to include in the widget.

   The custom widget renderer you registered previously will receive all this information so you can vary rendering
   based on the additional data.

## Event Handler API

This API is an entry point to the event handling and subscription subsystem of the Dashboard component. We designed
the Dashboard component to be fully observable via events and you can register handlers for any of these events. Just
keep in mind that at this point API maturity of most of the events is `@alpha` - meaning they can change in the next
version of GoodData.UI and break your plugin if you try to upgrade to it.

The [event handler API](https://sdk.gooddata.com/gooddata-ui-apidocs/v8.7.0/docs/sdk-ui-dashboard.idashboardeventing.html) has several methods that can be divided into three groups:

-  `addEventHandler()` and `removeEventHandler()`

   These are convenience methods that allow you to add or remove event handlers for single type of event or
   for all events. You can specify particular event type such as `"GDC.DASH/EVT.INITIALIZED"` and add function to
   receive the event. Or you can specify event type as `"*"` and add function to receive events of all types.

   Please check out the API Reference for the event handler API to learn more.

-  `addCustomEventHandler()` and `removeCustomEventHandler()`

   These methods allow for greater flexibility when it comes to setting up event handling. For each custom event handler,
   you can specify function to evaluate whether the event should be dispatched to the handler function.

   Please check out the API Reference for the event handler API to learn more.

-  `subscribeToStateChanges()` and `unsubscribeFromStateChanges()`

   In more advanced use cases, your non-React code may need to `select` data from Dashboard component state using the
   Model Selector APIs. To do that, your code will need latest version of Dashboard component's state. Using
   these methods you can subscribe to receive the state updates.

   Note: subscription to state changes is really only needed if you have code outside of React components and outside
   of event handlers that needs to select from the state. When in React components, you can use the `useDashboardSelector`
   to select from state.

## Interacting with Dashboard component APIs

The Dashboard component APIs are described further [on a separate page](18_dashboard_component.md) and in the API Reference. This section
describes how code in your plugin can access those APIs.

The way to interact with the Dashboard component APIs depends on from where you want to do so.

### Using Dashboard APIs from React components

Your custom React components will be mounted right into the Dashboard's React tree from where they can use hooks
to interact with the redux-based Dashboard APIs:

-  `useDashboardSelector` hook can be used to interact with the Model Select API
-  `useDashboardDispatch` hook can be used to dispatch actions from the Model Command API

   Note: all of the actions in the Command API are alpha-level APIs and will mostly likely change in the
   upcoming release of the Dashboard component.

### Using Dashboard APIs from outside React components

Your custom non-React code may need to use the Model Select API or dispatch actions from the Model Command API.
Since that code is completely out of any React tree you need to access these APIs differently. It

-  In event handler code, you receive access points to Model APIs as arguments. Event handler functions have three arguments:
   -  `event` to handle
   -  `dashboardDispatch` function to dispatch actions from the Model Command API
   -  `stateSelect` function to use for accessing Model Select API

   The `dashboardDispatch` and `stateSelect` semantics are the same as with the `useDashboardDispatch` and
   `useDashboardSelector` hooks.

-  In all other code that is not connect to the Dashboard component using React or using event handler, you need to
   use the `subscribeToStateChanges()`. The callback function that you pass to this method will be triggered
   every time there is a change in the Dashboard component's state. Your function can store this somewhere and
   pass it as input to selectors.

   IMPORTANT: never modify the state to which you subscribe. This is absolutely not supported by GoodData.UI. The only
   supported way to modify the state is through the Model Command API.
