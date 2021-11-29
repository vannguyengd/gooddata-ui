---
title: DashboardView
sidebar_label: DashboardView
copyright: (C) 2007-2021 GoodData Corporation
id: dashboard_view_component
---

> **The DashboardView component has been superseded by [Dashboard component](18_dashboard_intro.md) and will be
> removed in GoodData.UI 8.9 **
>

The Dashboard component builds up on the `DashboardView` and we are positioning it to handle the Dashboard
rendering end-to-end and in the future possibly also provide editing capabilities.

At this point, the `Dashboard` component provides more functionality and more APIs compared to DashboardView. The
new component:

-  Renders the entire dashboard same as GoodData KPI dashboards; it includes the top bar with title and buttons and
   furthermore it includes the filter bar with date and attribute filters

-  Widens the API footprint. It includes more APIs to observe the state of the dashboard and expands on number
   of events emitted by the Dashboard. It additionally includes an extended set of APIs to interact with the dashboard

-  Enables customization of all elementary components used on the dashboard and allows adding custom widgets

-  Already comes with first set of fully public and stable APIs that we guarantee will not break in the future v8.x
   releases

Please check out our [roadmap](01_intro__roadmap.md) to learn more about the plans in regards to dashboards in GoodData.UI.
