---
id: version-8.3.0-understand_execution_model
title: Understand the Execution Model
sidebar_label: Understand the Execution Model
copyright: (C) 2018-2019 GoodData Corporation
original_id: understand_execution_model
---

Before you start building your first analytical application with GoodData.UI please take a few more minutes to understand
the core concepts behind computing and rendering data using GoodData.UI. 

## Overview

The GoodData.UI offers a foundation that covers entire life cycle of a data to visualize:

1.  Specification of what data to compute
2.  APIs to asynchronously compute the data according to the specification
3.  APIs to access the computed results
4.  APIs to transform the results and perform client-side post-processing

This foundation is suitable for building your own visualization components or addressing custom analytics
use cases.

On top of this foundation the GoodData.UI builds the different React components with convenient public APIs. The
React components are responsible for:

-  Constructing a valid data specification
-  Driving the computation on the Analytical Backend
-  Rendering the data or alternatively, exposing data to render using your own custom visual component

We recommend that you start your GoodData.UI journey by using the existing React visual components; you can find
documentation for them in the menu on the left.

The remainder of this document describes essentials of data specification which is all you need to know before
you start using the visual components.

You can learn more about the lower level, non-React APIs in the [Custom Executions](50_custom__execution_new.md) document.

### How to specify data to render

At the lowest level of every data visualization in GoodData.UI is the specification of what data to calculate on the 
backend so that it can be visualized. We call this specification the _Execution Definition_. 

The execution definition captures the following:

-  What are the **measures** to calculate,
-  For which **attributes** should these measures be calculated,
-  What **filters** to apply,
-  How to **slice and dice** the result,
-  What **totals** and rollups to include in the result,
-  And finally how to **sort** the result.

All the visualizations components in the GoodData.UI create the execution definition, use it to start an
execution on an Analytical Backend and then from the execution result they load views of the data to visualize.

The visual components in the GoodData.UI provide a convenience layer and shield you from creating
a potentially complex execution definitions. You do not have to carefully craft the full execution definition for say
`ColumnChart` that you place into your application. 

Instead, you specify what measures are you interested in, what attribute should be used to create columns and what 
attribute should be used to stack the columns. Given this input, the visualization will craft the full execution definition 
and drive it to obtain the data to visualize.

### Measures, attributes and filters

These are best described with an example. Imagine you are an account manager for a Franchise network. 
You want to know the **average daily amount** of money for each **Franchise office** in the **USA**.

Let's introduce the main concepts:

* A **measure** is a computational expression that aggregates one or more numerical values. In this example, you are interested in the **average daily amount**.
* An **attribute** breaks the measure apart and provides context to the data. In this example, the measure is sliced by the **location** of the Franchise offices.
* A **filter** is a set of conditions that removes specific values from your original data. In this example, you want to see only **USA-specific locations**.

Let's display your data as a column chart:

![Column Chart](assets/intro_column_chart.png "Column Chart")

The chart shows the elements (measure, attribute, filter) that together work as unified input for creating a **visualization** using GoodData.UI, which is a view into a specific part of your data.

In the column chart:

* `$ Avg Daily Total Sales` is a **measure**.
* `Location State` is an **attribute**.
* A **filter** applied to the chart shows only USA-specific values of `Location State`, which represent the offices located in the USA.

### Where do measures and attributes come from?

Both GoodData platform and GoodData.CN implement a concept of workspaces. Workspace defines a **Logical Data Model** (LDM)
and is linked to the data source which contains data conforming to this LDM. 

The workspace LDM consists of data sets which are composed of facts and attributes. Additionally, the workspace may define
complex measures using the powerful **Multi-Dimensional Analytical Query Language** (MAQL). These complex measures work on top
of the facts and attributes in your LDM.

The LDM and complex MAQL measures essentially form a semantic layer on top of your data. This semantic layer hides a
lot of complexity that you may typically encounter when directly constructing SQL queries. 

The semantic layer then exposes the available data sets, attributes, facts and complex MAQL measures which you can
use in your application to specify what data to visualize.

Each of the semantic layer entities has their own identifier. When your application renders visual components, the props
that specify measures and attributes always reference the semantic layer entity and provide additional information on 
top of it.

## Attributes and measures in your application 

Once you have a GoodData platform or GoodData.CN workspace that has defined LDM and potentially complex MAQL measures,
you can start building an application using GoodData.UI.

The attributes, measures, filters, sorting, totals, slicing and dicing are all covered by different types of the execution model
that is implemented in `@gooddata/sdk-model`.
Instances of these types is what visual components accept in their props are defined in the execution model which is
.

The execution model comes with factory functions to create instances of any types that play a role in the model. For
instance to define a new measure that you can then use as input to a `ColumnChart` you would do something like this:

```javascript
import { newMeasure, newAttribute } from "@gooddata/sdk-model";

const myMeasure = newMeasure("measureIdentifier");
const myAttribute = newAttribute("attributeDisplayFormIdentifier");
```

Where: 

-  the `measureIdentifier` is the identifier of either fact in your Logical Data Model a complex MAQL measure defined
   on top of the LDM.
   
-  the `attributeLabelIdentifier` is the identifier of a display form (label) of an attribute in your LDM

Once you have an instance of measure defined, you can use it to create a visual component:

```jsx
import { ColumnChart } from "@gooddata/sdk-ui-charts";

function MyColumnChart() {
    return (
        <ColumnChart measures={[myMeasure]} viewBy={[myAttribute]}/>
    );
}
```

### Generating code representation of the semantic layer

Manually creating measures and attributes is a boring and tedious task; and more so if your Logical Data Model is
large.

We have created the [catalog-export](02_start__catalog_export.md) tool to help with this. The tool can connect to
either GoodData platform or GoodData.CN and transform the entities in the semantic layer of your
workspace into code representation.

The tool will retrieve LDM and complex MAQL measures from your workspace and generate a file in either JavaScript or 
TypeScript that will contain code constants for all the semantic layer entities. You can then import the definitions
from this file and use them directly. 

For instance:

```jsx
import { $AvgDailyTotalSales, LocationState } from "./generatedLdm";
import { ColumnChart } from "@gooddata/sdk-ui-charts";

function MyColumnChart() {
    return (
        <ColumnChart measures={[$AvgDailyTotalSales]} viewBy={[LocationState]}/>
    );
}
```

**NOTE**: You can run `@gooddata/catalog-export` any time to refresh the contents of the generated file.

## Summary

You specify what data to render by referencing attributes or measures defined in your workspace. The simplest way
to get started is to use the [catalog-export](02_start__catalog_export.md) tool which will generate a file with
code representation of all essential entities in your workspace.

The execution model in the GoodData.UI offers additional functionality. You can learn more about it in the
[detailed description](20_misc__execution_model.md).