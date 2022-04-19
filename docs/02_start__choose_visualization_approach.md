---
title: Choose the Most Appropriate Method for Data Visualization
sidebar_label: Choose the Most Appropriate Method for Data Visualization
copyright: (C) 2022 GoodData Corporation
id: choose_visualization_approach
---

GoodData.UI offers the following methods of visualizing the data in your workspaces:

-  Using the [InsightView component](#insightview-component)
-  Using the [visual components](#visual-components)
-  Creating the [custom visualizations](#custom-visualizations)

Each method has its advantages and disadvantages.

This article explains how these methods differ and helps you decide which method is the most appropriate for your particular use case.

## InsightView component

Using the [InsightView component](10_vis__insight_view.md) is the simplest method to implement because it requires the smallest amount of code to get going.
The InsightView component allows you to embed insights created in [Analytical Designer](https://help.gooddata.com/pages/viewpage.action?pageId=86794494) into your application as React components.
It always reflects the current state of an insight: if any changes are made to the insight in Analytical Designer,
the InsightView component in your application will pick them up and show the up-to-date version of the insight without any actions needed from your side.

### When to use

Using the InsightView component is the best choice in the following situations:

-   You want to embed insights created in Analytical Designer as is.
-   You want to be able to change the insight that your application displays without changing the application code.
     
     **NOTE:** You can also achieve this by creating the [custom visualizations](#custom-visualizations).

### When not to use

The InsightView component may not be the best choice in the following situations:

-   You need a visualization type that is not available in Analytical Designer or GoodData.UI.
     
     In this case, create a [custom visualization](#custom-visualizations).
-   You need more control over the visualization (for example, dynamically changing measures).
    
     In this case, use the [visual components](#visual-components) or create a [custom visualization](#custom-visualizations).

## Visual components

GoodData.UI comes with several types of visualizations that you can use out of the box.
They require more coding than the [InsightView component](#insightview-component) but at the same time offer more flexibility.
For more information, see [Start with Visual Components](10_vis__start_with_visual_components.md).

### When to use

Using the visual components is the best choice in the following situations:

-   You want more control over the visualization than the [InsightView component](#insightview-component) can provide.
    
     **TIP:** Use the [visualization definition placeholders](30_tips__placeholders.md) to be able to dynamically change the visualization easier. 
-   You want to define the visualization only in your application and not in Analytical Designer.
    
     This can help you prevent inadvertent changes to your application coming from outside (changes made in Analytical Designer).

### When not to use

The visual components may not be the best choice in the following situations:

-   You want to be able to change the insight that your application displays without changing the application code.
    
     In this case, use the [InsightView component](#insightview-component).
-   You need a visualization type that is not available in Analytical Designer or GoodData.UI.
    
     In this case, create a [custom visualization](#custom-visualizations).

## Custom visualizations

If neither the [InsightView component](#insightview-component) nor the [visual components](#visual-components) satisfy your needs, GoodData.UI allows you to create your own visualization relatively easy.
This is the most involved method of data visualization that offers the most flexibility. To get started, see [Start With Custom Visualizations](50_custom__create_new_visualization.md).

### When to use

Creating a custom visualization is the best choice in the following situations:

-   You need a visualization type that is not available in Analytical Designer or GoodData.UI.
-   You need more flexibility than the [visual components](#visual-components) can provide.

### When not to use

Do not use the custom visualizations if the [InsightView component](#insightview-component) or the [visual components](#visual-components) are sufficient for satisfying your needs. Whenever possible, choose one of the simpler methods because they require significantly less code.
