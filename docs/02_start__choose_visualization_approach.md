---
title: Choose Appropriate Data Visualization Approach
sidebar_label: Choose Appropriate Data Visualization Approach
copyright: (C) 2022 GoodData Corporation
id: choose_visualization_approach
---

GoodData.UI offers three distinct ways of visualizing the data in your workspaces each with their advantages and disadvantages.
This article should help you understand how they differ and help you decide which of them is appropriate for your particular use case.

## InsightView

The [`InsightView` component](10_vis__insight_view.md) is the simplest of the three: it needs the least amount of code to get going.
It allows you to embed Insights created in [Analytical Designer](https://help.gooddata.com/pages/viewpage.action?pageId=86794494) into your application as React components.
It always reflects the current state of the Insight, so if there are any changes to it made in Analytical Designer,
`InsightView` in your application will always show the up to date version without any changes needed in your application.

### When to use

Use `InsightView` in these situations:

-   you want to embed Insights created in Analytical Designer as-is
-   you want to be able to change the Insight your application displays without changing the application code
    -   you can also achieve this using [Custom Visualizations](#custom-visualizations) if needed

### When not to use

`InsightView` might not be the best choice in these situations:

-   you need a visualization type not provided by Analytical Designer or GoodData.UI
    -   see [Custom Visualizations](#custom-visualizations) for a better option
-   you need more control over the visualization (e.g. dynamically changing measures, etc.)
    -   see [Visual Components](#visual-components) or [Custom Visualizations](#custom-visualizations) for better options

## Visual components

GoodData.UI comes with several types of visualizations that you can use out of the box.
They require a bit more coding than [`InsightView`](#insightview) but offer more flexibility for it.
See [Start with Visual Components](10_vis__start_with_visual_components.md) for more information.

### When to use

Visual components are best used in these situations:

-   you want more control over the visualization than is provided by [`InsightView`](#insightview)
    -   see also [Visualization Definition Placeholders](30_tips__placeholders.md) for utilities that make changing the visualization dynamically easier
-   you want to define the visualization in your application only, not using Analytical Designer
    -   this might be useful when you want to prevent inadvertent changes to your application from outside (changes done in Analytical Designer)

### When not to use

Visual components might not be the best choice in these situations:

-   you want to be able to change the Insight your application displays without changing the application code
    -   see [`InsightView`](#insightview) for a better option
-   you need a visualization type not provided by Analytical Designer or GoodData.UI
    -   see [Custom Visualizations](#custom-visualizations) for a better option

## Custom Visualizations

If neither [`InsightView`](#insightview) nor [Visual Components](#visual-components) satisfy your needs, GoodData.UI provides ways that allow you to create your own visualization with relative ease.
This is the most involved way of visualizing data with GoodData, but offers the most flexibility. To get started, see [Create a Custom Visualization](50_custom__create_new_visualization.md).

### When to use

Custom Visualizations are best used in these situations:

-   you need a visualization type not provided by Analytical Designer or GoodData.UI
-   you need more flexibility than [Visual Components](#visual-components) offer

### When not to use

Custom Visualizations might not be the best choice in these situations:

-   when [`InsightView`](#insightview) or [Visual Components](#visual-components) satisfy your needs
    -   you might want to avoid Custom Visualizations in case one of the simpler ways of visualizing data work for you: you will have to write significantly less code
