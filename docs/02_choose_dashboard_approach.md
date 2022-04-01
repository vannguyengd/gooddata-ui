---
title: Choose the Most Appropriate Method for Building or Embedding Dashboards
sidebar_label: Choose the Most Appropriate Method for Building or Embedding Dashboards
copyright: (C) 2022 GoodData Corporation
id: choose_dashboard_approach
---

GoodData.UI offers the following methods of building and embedding dashboards:

- Using KPI Dashboards
- Using the Dashboard component
- Building custom dashboards

Each method has its advantages and disadvantages.

This article explains how these methods differ and helps you decide which method is the most appropriate for your particular use case.

## KPI Dashboards

KPI Dashboards is a GoodData end-to-end dashboard solution that covers both creation and consumption of dashboards. KPI Dashboards offer many features out of the box such as filtering, drilling, sharing, responsive layout, theming, email scheduling, export, and embedding.

Users can build new dashboards and edit the existing ones in a friendly drag-and-drop user interface.

With KPI Dashboards, you can:

- Embed KPI Dashboards in your application via [iframe](#embed-a-kpi-dashboard-via-iframe). Embedded KPI Dashboards provide basic customization options and support the [postMessage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage).

- Extend the default functionality with the [dashboard plugins](#add-dashboard-plugins-to-a-kpi-dashboard).

### Embed a KPI Dashboard via iframe

Kpi Dashboards iframe embedding allows you to easily integrate dashboards created with [Kpi Dashboard](#kpi-dashboards) in you application(s).
It allows communication with the Kpi Dashboard via [postMessage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage).
You can also achieve basic customizations via query parameters (eg hiding the filter bar).
Dashboard Plugins are supported as well.

Use this approach, when you don't need heavy customization possibilities, and when post messages API is covering your needs. 

Pros:
- Seamless integration with any application or html page.
- [Postmessage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage).
- Basic customizations via query parameters.
- [Dashboard Plugins](#kpi-dashboards---dashboard-plugins) support.

Cons:
- Customization possibilities are limited.

### Add dashboard plugins to a KPI Dashboard

Dashboard Plugins allow you to enhance [Kpi Dashboards](#kpi-dashboards) experience with custom visualizations, 3rd party libraries and custom behavior.
With Dashboard Plugins, you can run your own code within Kpi Dashboards. Read more details about [Dashboard Plugins](dashboard_plugins).

Pros:
- Integration with existing [Kpi Dashboards](#kpi-dashboards).
- [Dashboard Plugins cli](dashboard_plugins#getting-started).
- Stable API.
- Agnostic API that supports both Enterprise and GoodData.CN editions.
- TypeScript, documented interfaces and API(s).

Cons:
- Plugins are currently supported in view mode only.
- Plugins api is still a bit limited in comparison with full [Dashboard Component](#dashboard-component) capabilities.

## Dashboard component

Dashboard component is highly customizable React component, with lot of built-in features, that displays dashboards created with [Kpi Dashboards](#kpi-dashboards) - it's an engine, that [Kpi Dashboards](#kpi-dashboards) use under the hood.
Read more details about [Dashboard Component](dashboard_intro).

Pros:
- Extensive customization possibilities (custom visualization types, integration of 3rd party libraries, [Dashboard Plugins](#kpi-dashboards---dashboard-plugins), etc...)
- Seamless integration with React application(s).
- Allows deep integration with your application(s), with lot of possibilities (eventing API, customizations)
- Backend agnostic API that supports both Enterprise and GoodData.CN editions.
- TypeScript, documented interfaces and API(s).

Cons:
- Currently supports view mode only.
- Some customization possibilities are still alpha or beta.
- Styling or layout customizations are limited in comparison with fully [custom dashboard](#custom-dashboard) approach.

## Custom dashboards

When you need very custom UI for your dashboards, that existing [Kpi Dashboards](#kpi-dashboards), [Dashboard Plugins](#kpi-dashboards---dashboard-plugins) or [Dashboard Component](#dashboard-component) cannot cover,
then you can build your own solution with GoodData.UI SDK components.

Pros:
- Totally under your control - custom visualization types, custom layout, styling, etc...
- Core sdk-model and sdk-backend-* packages can be used with any JS/TS framework
- Huge amount of SDK React components and hooks ready to use (both high and low level - [charts](#start_with_visual_components), [execution](#create_new_visualization), [placeholders](#placeholders), contexts)
- [Accelerator Toolkit](#create_new_application)
- [Catalog Export](#export_catalog)
- Allows deepest integration with your application(s), with huge amount of possibilities.
- Backend agnostic API that supports both Enterprise and GoodData.CN editions.
- TypeScript, documented interfaces and API(s).

Cons:
- Requires most development and maintenance time in comparison with the other approaches.
- Requires better knowledge of the GoodData platform than the other approaches.
- Harder integration (but not impossible) with applications without React.
