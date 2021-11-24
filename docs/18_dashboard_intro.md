---
title: Introduction To Dashboard
sidebar_label: Introduction
copyright: (C) 2007-2021 GoodData Corporation
id: dashboard_intro
---

TODO: add links to sub-pages, tweak formatting

One way to consume analytics computed by GoodData is via dashboards. To simplify - typical dashboard contains multiple
different insights and allows user to the filter the data shown in the insights from a single place.

GoodData.UI contains all the elementary components that you can use to construct your own dashboard using React and
on top of that comes with its own, opinionated dashboard solution.

Additionally, the `@gooddata/sdk-ui-dashboard` package contains the `Dashboard` component with which we aim to address creation
and consumption of rich, interactive and response dashboards. We understand that the requirements for dashboards can
vary greatly and so we created the `Dashboard` component with an API-first mindset: it is extendable and customizable
so that developers can tweak and modify the vanilla experience using Plugins.

## Status & Disclaimer

The `Dashboard` component is at this point in early stage of its life. While the goal for the component is to
provide an end-to-and solution for creation and consumption of dashboards, it is not in that state at this point in
time.

In the current state the Dashboard component can render a dashboard created in GoodData KPI Dashboards application all
the while allowing the developer to step in and customize rendering of insights or add custom content.

We have way more on our [Roadmap](01_intro__roadmap.md) and will be enhancing and opening the `Dashboard` APIs to allow
more customizations, expand the eventing and interactivity and ultimately also allow drag and drop editing experience.

## Big Picture

Let's first take a step back and take a look at the GoodData solution for dashboards and then explain how the Dashboard
component and the infrastructure around it fit into this picture.

Both the Gooddata platform and GoodData.CN provide the KPI Dashboard application that can be used by both the
dashboard creators and the consumers. Furthermore, the vanilla consumer experience can now be modified by developers
who can create Dashboard Plugins to enhance or further customize the dashboard.

Note: the KPI dashboard application and the dashboards that it renders can be embedded and integrated into third party
applications using several mechanisms. We describe this more in depth in [a separate article dedicated to embedding](18_dashboard_embedding.md).

### Dashboard creators

The creators build dashboards using an intuitive and friendly drag and drop experience. They place insights onto
a dashboard, define dashboard filters that can be used to filter data rendered by the insights and customize what happens
when the consumer interacts with the different insights on a dashboard. The interactions supported out of the box are
various types of drills - drill down, drill in, drill to other dashboards or drill to custom locations.

In the end, creators save a dashboard - it becomes part of the workspace. Once dashboard is part of the workspace, it
can be discovered by consumers.

### Dashboard consumers

The consumers also use the KPI Dashboards application to view dashboards that are available to them. In the view mode,
the consumer can change values of the filters and interact with the insights placed on the dashboard. By triggering
the interactions (drills) the consumer can see more detailed data, navigate to other dashboards or even to other
websites.

The consumers may further export the dashboard into a PDF file or schedule a recurrent exports and delivery of the
dashboard via email.

### Developers

The developers may step into this process to further enhance the dashboard with custom code that may deliver custom
visualizations or enrich the dashboard with custom content such as text, images, videos or custom interactive
components such as forms, links and buttons.

Developers modify the hosted KPI Dashboard application using plugins. They use GoodData Plugin Development Toolkit to
bootstrap, build, test and package the plugin. In the plugin code itself, the developers can use different customization
APIs to integrate custom code into the dashboard.

Finally the developers link the plugin to one or more dashboards - from then on the KPI Dashboard application will
use the plugin and execute code packaged within.

## Architecture Overview

Now that you have a better idea about the big picture of the GoodData dashboard solution, we can go more in depth
into the interesting technicalities behind it.

While the GoodData KPI Dashboards application is proprietary application hosted by GoodData, it uses the `Dashboard`
component implemented in `@gooddata/sdk-ui-dashboards` to render the entire dashboard. The `Dashboard` component
is the foundation on top of which all the GoodData dashboards stand.

### Dashboard Component

The `Dashboard` component is a React component with rich (and fairly large) API through which it is possible to
both access the core dashboard functionality and extend the component with custom functionality.

The `Dashboard` component is the largest and most complex component in GoodData.UI with a lot of domain logic
contained in it. Internally, it is realized using an architecture resembling the Model-View-Controller:

-  Model part is implemented with Redux and redux-saga. Model exposes rich API - selectors to get data from
   component's state, events to describe changes and interactions with the dashboard and finally actions to trigger
   change

-  View and controller parts are implemented using React components and hooks. The top-level `Dashboard` component
   also has a rich API - props to specify dashboard to render, configuration for rendering, customization of almost
   all view components used on a dashboard and finally integration with the eventing.

We go more in depth about Dashboard component [on a separate page here](18_dashboard_component.md).

### Dashboard Engine and Plugins

The complex `Dashboard` component is wrapped in an envelope that provides convenient and controlled way to integrate
custom code with the Dashboard component - we call this wrapper Dashboard Engine (engine).

To put it simple, the primary responsibility of the engine is to create props for the top-level `Dashboard` component
so that these props reflect contributions from one or more Dashboard Plugins (plugins).

The engine exposes several curated customization APIs through which plugins can register their contributions and
customizations. When initializing engine with one or more plugins, the engine calls out to the plugin code (your code)
to register the customizations and passes the customization APIs. Once it does this for all plugins, it can create
the extension and customization props for the Dashboard component.

### Dashboard Loader

On top of Dashboard Engine and Plugins sits the Dashboard Loader (loader). The responsibility of this component is to handle
the lifecycle of a dashboard that is possibly enhanced by one or more plugins. The loader will:

1.  Get dashboard from workspace
2.  Load any plugins that are linked with the dashboard
3.  Load appropriate version of the dashboard engine needed by the plugins
4.  Initialize engine with plugins (registering all the customizations)
5.  Return load result that consists of `Dashboard` component and correct props to pass to it

Once the code using loader has the `Dashboard` component and props for it, it can mount the dashboard as it sees
fit.

The entire loader is available also as a React hook which you can use in your own application to dynamically load
a dashboard.

### KPI Dashboards

The proprietary KPI Dashboards that are hosted on GoodData platform and that are also part of GoodData.CN use the
dashboard loader to load a dashboard that is possibly enhanced with plugins and then mount the loaded `Dashboard`
component.

The KPI Dashboards additionally inject several proprietary plugins during the load - for instance a plugin that
adds a post message API for a dashboard.

### Wrapping up

We hope that the document so far painted a good picture of the stack behind GoodData dashboard solution. With this picture
in mind, you should be able to understand at which point you as a developer can step in. To sum up the most important
parts:

-   You can use the `Dashboard` component in your own application to render a dashboard from workspace and use full
    set of API to integrate with and customize the dashboard

-   You can use Dashboard Plugins to build extensions that can be integrated into GoodData KPI Dashboards

-   You can use Dashboard Loader in your own application to dynamically load and render a dashboard enriched with plugins

## Supported Backends

The entire stack described above can work on top of both GoodData platform and GoodData.CN.

Some functionality is not yet available on the GoodData.CN because of inherent limitations on the backend:

-  Exports
-  Scheduling of exports
-  KPI Widgets and alerting
