---
title: Waterfall Chart
sidebar_label: Waterfall Chart
copyright: (C) 2023 GoodData Corporation
id: waterfall_chart_component
---

A **Waterfall chart** shows data in vertical columns. Waterfall charts can be segmented by either multiple measures or an attribute. Waterfall charts are used to visualize cumulative values, where each data point contributes to a total.

![Waterfall Chart Component](assets/waterfall_chart.png "Waterfall Chart Component")

## Structure

```jsx
import "@gooddata/sdk-ui-charts/styles/css/main.css";
import { WaterfallChart } from "@gooddata/sdk-ui-charts";

<WaterfallChart
    measures={<measures>}
    viewBy={<view-by>}
    config={<chart-config>}
    …
/>
```

## Example

```jsx
import React from "react";
import { WaterfallChart } from "@gooddata/sdk-ui-charts";
import * as Md from "../../md/full";

const measures = [Md.$TotalSales];
const config = {
    separators: {decimal: ".", thousand: ","},
    legend: {enabled: true, position: "auto"},
    dataPoints: {visible: "auto"}
    total: { enabled: true, name: "Balance" }
};
const style = {height: 400};

export function MyComponent() {
    return (
        <div style={style}>
            <WaterfallChart
                measures={measures}
                viewBy={Md.LocationResort}
                config={config}
            />
        </div>
    );
}
```

## Properties

| Name | Required? | Type | Description |
| :--- | :--- | :--- | :--- |
| measures | true | [IMeasure[]](50_custom__execution.md#measure) | An array of measure definitions |
| viewBy | false | [IAttribute](50_custom__execution.md#attribute) | The attribute definition |
| filters | false | [IFilter[]](30_tips__filter_visual_components.md) | An array of filter definitions |
| sortBy | false | [ISortItem[]](50_custom__result.md#sorting) | An array of sort definitions |
| config | false | [IChartConfig](15_props__chart_config.md) | The chart configuration object |
| backend | false | [IAnalyticalBackend](https://sdk.gooddata.com/gooddata-ui-apidocs/docs/sdk-backend-spi.ianalyticalbackend.html) | The object with the configuration related to communication with the backend and access to analytical workspaces |
| workspace | false | string | The [workspace](02_start__execution_model.md#where-do-measures-and-attributes-come-from) ID |
| locale | false | string | The localization of the chart. Defaults to `en-US`. For other languages, see the [full list of available localizations](https://github.com/gooddata/gooddata-ui-sdk/tree/master/libs/sdk-ui/src/base/localization/bundles). |
| drillableItems | false | [IDrillableItem[]](15_props__drillable_item.md) | An array of points and attribute values to be drillable |
| ErrorComponent | false | Component | A component to be rendered if this component is in error state (see [ErrorComponent](15_props__error_component.md)) |
| LoadingComponent | false | Component | A component to be rendered if this component is in loading state (see [LoadingComponent](15_props__loading_component.md)) |
| onError | false | Function | A callback when the component updates its error state |
| onExportReady | false | Function | A callback when the component is ready for exporting its data |
| onLoadingChanged | false | Function | A callback when the component updates its loading state |
| onDrill | false | Function | A callback when a drill is triggered on the component |

The following example shows the supported `config` structure with sample values. For the descriptions of the individual options, see [ChartConfig](15_props__chart_config.md).

```javascript
{
    colors: ["rgb(195, 49, 73)", "rgb(168, 194, 86)"],
    colorPalette: [{
        guid: "01",
        fill: {
            r: 195,
            g: 49,
            b: 73
        }
    }, {
        guid: "02",
        fill: {
            r: 168,
            g: 194,
            b: 86
        }
    }],
    colorMapping: [{
        predicate: (headerItem) => {
            return isColorDescriptor(headerItem) && header.colorHeaderItem.id.includes("total");
        },
        color: {
            type: "guid",
            value: "02"
        }
    }],
    legend: {
        enabled: true,
        position: "top",
    },
    dataLabels: {
        visible: "auto"
    },
    separators: {
        thousand: ",",
        decimal: "."
    }
}
```
