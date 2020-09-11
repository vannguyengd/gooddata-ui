---
title: Combo Chart
sidebar_label: Combo Chart
copyright: (C) 2019 GoodData Corporation
id: version-7.0.0-combo_chart_component
original_id: combo_chart_component
---

Combo chart combines two types of visualizations, for example, a column chart and a line chart.

A combo chart can have one or two axes. If a combo chart has two axes, it is often referred to as a dual axis chart.

By default, a combo chart is displayed as a combination of a column chart and a line chart, with the secondary axis enabled (you can [disable it](#disable-the-secondary-axis)).

![Combo Chart Component](assets/combo_chart.png "Combo Chart Component")

## Structure

```jsx
import '@gooddata/react-components/styles/css/main.css';
import { ComboChart, Model } from '@gooddata/react-components';

<ComboChart
    projectId={<project-id>}
    primaryMeasures={<primaryMeasures>}
    secondaryMeasures={<secondaryMeasures>}
    config={<chart-config>}
    sdk={<sdk>}
    …
/>
```

## Example

```jsx
const primaryMeasures = [
    Model.measure('franchiseFeesInitialFranchiseFeeIdentifier')
         .format('#,##0')
         .title('$ Franchise Fees (Initial Franchise Fee)')   
];

const secondaryMeasures = [
    Model.measure('franchiseFeesAdRoyaltyIdentifier')
         .format('#,##0')
         .title('$ Franchise Fees (Ad Royalty)')
];

const attribute = Model.attribute('location_resort').alias('Location Resort');

<div style={{ height: 300 }}>
    <ComboChart
        projectId={projectId}
        primaryMeasures={primaryMeasures}
        secondaryMeasures={secondaryMeasures}
        viewBy={attribute}
    />
</div>
```

## Customize the type of a combo chart

A combo chart combines any two of the following chart types:
* Column chart
* Line chart
* Area chart

To change the chart type for primary measures, set the `config.primaryChartType` property.

To change the chart type for secondary measures, set the `config.secondaryChartType` property.

```jsx
import { ComboChart } from '@gooddata/react-components';

<ComboChart
    projectId={<project-id>}
    primaryMeasures={<primaryMeasures>}
    secondaryMeasures={<secondaryMeasures>}
    config={{
        primaryChartType: 'column', // string
        secondaryChartType: 'area' // string
    }}
    viewBy={<attribute>}
/>
```

## Disable the secondary axis

To disable the secondary axis, set the `config.dualAxis` property to `false`.

```jsx
import { ComboChart } from '@gooddata/react-components';

<ComboChart
    projectId={<project-id>}
    primaryMeasures={<primaryMeasures>}
    secondaryMeasures={<secondaryMeasures>}
    config={{
        dualAxis: false // boolean
    }}
    viewBy={<attribute>}
/>
```

## Properties

| Name | Required? | Type | Description |
| :--- | :--- | :--- | :--- |
| projectId | true | string | The project ID |
| primaryMeasures | false | [Measure[]](50_custom__execution.md#measure) | An array of primary measure definitions |
| secondaryMeasures | false | [Measure[]](50_custom__execution.md#measure) | An array of secondary measure definitions |
| viewBy | false | [Attribute](50_custom__execution.md#attribute) &#124; [Attribute[]](50_custom__execution.md#attribute) | An attribute definition or an array of two attribute definitions. If set to a two-attribute array, the first attribute wraps up the second one. |
| filters | false | [Filter[]](30_tips__filter_visual_components.md) | An array of filter definitions |
| sortBy | false | [SortItem[]](50_custom__result.md#sorting) | An array of sort definitions |
| config | false | [ChartConfig](15_props__chart_config.md) | The chart configuration object |
| locale | false | string | The localization of the chart. Defaults to `en-US`. For other languages, see the [full list of available localizations](https://github.com/gooddata/gooddata-react-components/tree/master/src/translations). |
| drillableItems | false | [DrillableItem[]](15_props__drillable_item.md) | An array of points and attribute values to be drillable |
| sdk | false | SDK | A configuration object where you can define a custom domain and other API options |
| ErrorComponent | false | Component | A component to be rendered if this component is in error state. See [ErrorComponent](15_props__error_component.md).|
| LoadingComponent | false | Component | A component to be rendered if this component is in loading state. See [LoadingComponent](15_props__loading_component.md).|
| onError | false | Function | A callback when the component updates its error state |
| onExportReady | false | Function | A callback when the component is ready for exporting its data |
| onLoadingChanged | false | Function | A callback when the component updates its loading state |

<!-- These internals are intentionally undocumented
| afterRender | false | Function | A callback after component is rendered |
| dataSource | false | DataSource class | A class that is used to resolve AFM |
| environment | false | string | An Internal property that changes behaviour in Analytical Designer and KPI Dashboards |
| height | false | number | Height of the component in pixels |
| pushData | false | Function | A callback after AFM is resolved |
-->

The following example shows the supported `config` structure with sample values. To see descriptions of individual options, see [Chart Config](15_props__chart_config.md).
```javascript
{
    colors: ['rgb(195, 49, 73)', 'rgb(168, 194, 86)'],
    colorPalette: [{
        guid: '01',
        fill: {
            r: 195,
            g: 49,
            b: 73
        }
    }, {
        guid: '02',
        fill: {
            r: 168,
            g: 194,
            b: 86
        }
    }],
    colorMapping: [{
        predicate: (headerItem) => {
            return headerItem.measureHeaderItem && (headerItem.measureHeaderItem.localIdentifier === 'm1_localIdentifier')
        },
        color: {
            type: 'guid',
            value: '02'
        }
    }],
    xaxis: {
        visible: true,
        labelsEnabled: true,
        rotation: 'auto'
    },
    yaxis: {
        visible: true,
        labelsEnabled: true,
        rotation: 'auto',
        min: '20',
        max: '30'
    },
    legend: {
        enabled: true,
        position: 'top',
    },
    dataLabels: {
        visible: 'auto'
    },
    grid: {
        enabled: true
    }
    separators: {
        thousand: ',',
        decimal: '.'
    }
}
```
