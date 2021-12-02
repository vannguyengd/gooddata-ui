---
title: Introduction to the Dashboard Component
sidebar_label: Introduction to the Dashboard Component
copyright: (C) 2007-2021 GoodData Corporation
id: dashboard_intro
---

Starting with Version 8.7, GoodData.UI includes the `@gooddata/sdk-ui-dashboard` package that contains the Dashboard component.

Using this component, we aim to address creation and consumption of rich, interactive, and responsive dashboards. We understand
that the requirements for dashboards can vary greatly. Therefore, we created the Dashboard component with an API-first
mindset: it is extendable and customizable so that developers can tweak and modify the default experience using plugins.

## Status and disclaimer

Currently, the Dashboard component is at an early stage of its lifecycle. While the goal for the component is to
provide an end-to-and solution for creation and consumption of dashboards, it has not yet reached that state.

In its current state, the Dashboard component can render a dashboard created in the KPI Dashboards component of the GoodData platform and
allows the developer to customize rendering of insights or add custom content.

We have many milestones on our [roadmap](01_intro__roadmap.md). We will be enhancing and opening the Dashboard component's APIs to allow
more customizations, to expand the eventing and interactivity, and to allow a drag-and-drop editing experience.

## Dashboards on the GoodData platform vs. Dashboard component

Let's take a look at GoodData's solution for dashboards and explain how the Dashboard
component and the infrastructure around it fit into this picture.

Both the GoodData platform and GoodData.CN provide the KPI Dashboards component that can be used by both
dashboard creators and consumers. In addition, developers can modify the default consumer experience, and create dashboard plugins
to enhance or further customize the dashboard.

**NOTE:** The KPI Dashboards component and the dashboards that it renders can be [embedded and integrated into third-party
applications](18_dashboard_embedding.md).

### Dashboard creators

The creators build dashboards using an intuitive and friendly drag-and-drop experience. They place insights onto
a dashboard, define dashboard filters that can be used to filter data rendered by the insights, and customize what happens
when the consumer interacts with the different insights on the dashboard. The interactions supported out of the box are
various types of drilling: drilling down, drilling in, drilling to other dashboards, or drilling to custom locations.

In the end, the creators save the dashboard, and it becomes part of the workspace. Once the dashboard is part of the workspace, it
can be discovered by consumers.

### Dashboard consumers

The consumers use the KPI Dashboards component to view dashboards that are available to them. In view mode,
the consumers can change values of the filters and interact with the insights placed on the dashboard. By triggering
the interactions (drills), the consumers can see more detailed data, navigate to other dashboards or even to other
websites.

The consumers can also export the dashboard into a PDF file or schedule recurrent export and delivery of the
dashboard via email.

### Developers

The developers can step in to further enhance the dashboard with custom code that may deliver custom
visualizations or enrich the dashboard with custom content such as text, images, videos, or custom interactive
components (for example, forms, links, and buttons).

The developers modify the hosted KPI Dashboards component using plugins. They use GoodData's Plugin Development Toolkit to
bootstrap, build, test, and package the plugin. In the plugin code itself, the developers can use different customization
APIs to integrate custom code into the dashboard.

Finally, the developers link the plugin to one or more dashboards - from then on the KPI Dashboards component will
use the plugin and execute the code packaged within.

## Dashboard component architecture

Now that you have a better idea about GoodData's solution for dashboards, we can go more in depth
into interesting technicalities behind it.

While the KPI Dashboards component is a proprietary application hosted by GoodData, it uses the Dashboard
component implemented in `@gooddata/sdk-ui-dashboards` to render the entire dashboard. The Dashboard component
is the foundation on top of which all the GoodData dashboards stand.

### Dashboard component

The Dashboard component is a React component with a rich (and fairly large) API through which you can
both access the core dashboard functionality and extend the component with custom functionality.

The Dashboard component is the largest and most complex component in GoodData.UI with a lot of domain logic
contained in it. Internally, the Dashboard component is built using an architecture resembling the Model-View-Controller pattern:

-  The Model part is implemented with Redux and Redux-Saga. The Model part exposes rich APIs: selectors to get data from
   the component's state, events to describe changes, interactions with the dashboard, and commands to trigger changes.

-  The View and Controller parts are implemented using React components and hooks. The top-level Dashboard component
   also has rich APIs: props to specify a dashboard to render, configuration for rendering, customization of almost
   all view components used on a dashboard, and integration with the eventing.

For more information about the Dashboard component, see [this article](18_dashboard_component.md).

### Dashboard engine and plugins

The complex Dashboard component is wrapped in an envelope that provides a convenient and controlled way to integrate
custom code with the Dashboard component. This wrapper is called the dashboard engine.

To put it simple, the primary responsibility of the engine is to create props for the top-level Dashboard component
so that these props reflect contributions from one or more dashboard plugins.

The engine exposes several curated customization APIs through which the plugins can register their contributions and
customizations. When initializing the engine with one or more plugins, the engine calls out to the plugin code (your code)
to register the customizations and passes the customization APIs. Once it has done this for all plugins, it can create
the extension and customization props for the Dashboard component.

For more information about the plugins, see [this article](18_dashboard_plugins.md).

### Dashboard loader

On top of the dashboard engine and the plugins sits the dashboard loader. The responsibility of this component is to handle
the lifecycle of a dashboard that is possibly enhanced by one or more plugins.

The loader does the following:

1.  Gets the dashboard from a workspace
2.  Loads any plugins that are linked with the dashboard
3.  Loads the appropriate version of the dashboard engine needed by the plugins
4.  Initializes the engine with the plugins (registering all the customizations)
5.  Returns the load result that consists of the Dashboard component and the correct props to pass to it

Once the code using the loader has the Dashboard component and props for it, it can mount the dashboard as it sees
fit.

The entire loader is also available as a React hook that you can use in your own application to dynamically load
a dashboard.

For more information about the loader and embedding dashboards into your React application, see [this article](18_dashboard_embedding.md).

### KPI Dashboards

The proprietary KPI Dashboards component that is hosted on the GoodData platform and that is also part of GoodData.CN uses the
dashboard loader to load a dashboard that is possibly enhanced with plugins and then mounts the loaded Dashboard
component.

The KPI Dashboards component additionally injects several proprietary plugins during the load (for instance, a plugin that
adds a postMessage API for a dashboard).

### Conclusion

We hope that this article explained the stack behind GoodData's dashboard solution. You should now be able to understand
at which point you as a developer can step in. To sum up the most important parts:

-   You can use the Dashboard component in your own application to render a dashboard from a workspace and use a full
    set of APIs to integrate with and customize the dashboard.

-   You can use the dashboard plugins to build extensions that can be integrated into the KPI Dashboards component.

-   You can use the dashboard loader in your own application to dynamically load and render a dashboard enriched with plugins.

## Supported backends

The entire stack described in this article can work on top of both the GoodData platform and GoodData.CN.

Some functionality is not yet available in GoodData.CN because of inherent limitations on the backend, specifically:

-  Exports
-  Scheduling of exports
-  KPI widgets and alerting
