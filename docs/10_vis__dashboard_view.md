---
 title: DashboardView
 sidebar_label: DashboardView
 copyright: (C) 2007-2021 GoodData Corporation
 id: dashboard_view_component
 ---

 > **The DashboardView component has been superseded by the [Dashboard component](18_dashboard_intro.md) and will be
 > removed in GoodData.UI Version 8.10.**
 >
 The [**Dashboard component**](18_dashboard_intro.md) builds up on the DashboardView component. We position it to handle the dashboard
 rendering end-to-end. Editing capabilities may be considered in the future.

 Currently, the Dashboard component provides more functionality and more APIs compared to the DashboardView component.
 The Dashboard component:

 -  Renders an entire dashboard the same way the KPI Dashboards are rendered on the GoodData platform: it includes the top bar with the title and buttons,
    and the filter bar with date and attribute filters

 -  Widens the API footprint:
       - Includes more APIs to observe the state of the dashboard
       - Expands on the number of events emitted by the dashboard
       - Provides an extended set of APIs to interact with the dashboard

 -  Enables customization of all elementary components used on the dashboard and allows adding custom widgets

 -  Comes with the first set of fully public and stable APIs that will be compatible with changes in minor GoodData.UI versions released after Version 8.7

 Check out our [roadmap](01_intro__roadmap.md) to learn more about the plans for the dashboards in GoodData.UI.