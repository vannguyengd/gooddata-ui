---
title: Bullet Chart
sidebar_label: Bullet Chart
copyright: (C) 2020 GoodData Corporation
id: version-7.4.0-bullet_chart_component
original_id: bullet_chart_component
---

Bullet chart is a variation of a bar chart that displays performance of a measure (primary measure) and its progress towards a goal (target measure). Optionally, the primary measure can also be compared to another measure (comparative measure).

![Bullet Chart Component](assets/bullet_chart.png "Bullet Chart Component")

## Structure

```jsx
import '@gooddata/react-components/styles/css/main.css';
import { BulletChart } from '@gooddata/react-components';

<BulletChart
    projectId={<project-id>}
    primaryMeasure={<primaryMeasure>}
    targetMeasure={<targetMeasure>}
    comparativeMeasure={<comparativeMeasure>}
    config={<chart-config>}
    sdk={<sdk>}
    …
/>
```

## Example

```jsx
const primaryMeasure = {
    measure: {
        localIdentifier: 'franchiseFeesAdRoyaltyIdentifier',
        definition: {
            measureDefinition: {
                item: {
                    identifier: franchiseFeesAdRoyaltyIdentifier
                }
            }
        },
        format: '#,##0'
    }
};

const targetMeasure = {
    measure: {
        localIdentifier: 'franchiseFeesIdentifier',
        definition: {
            measureDefinition: {
                item: {
                    identifier: franchiseFeesIdentifier
                }
            }
        }
    }
};

const comparativeMeasure = {
    measure: {
        localIdentifier: 'franchiseFeesIdentifierOngoingRoyalty',
        definition: {
            measureDefinition: {
                item: {
                    identifier: franchiseFeesIdentifierOngoingRoyalty
                }
            }
        },
        format: '#,##0'
    }
};

const viewBy = {
    visualizationAttribute: {
        displayForm: {
            identifier: locationResortIdentifier
        },
        localIdentifier: 'location_resort'
    }
};

<div style={{ height: 300 }}>
    <BulletChart
        projectId={projectId}
        primaryMeasure={primaryMeasure}
        targetMeasure={targetMeasure}
        comparativeMeasure={comparativeMeasure}
        viewBy={viewBy}
    />
</div>
```

## Colors

To appropriately visualize the displayed data, bullet charts use colors provided by a color array or a palette in the [config](15_props__chart_config.md#configure-colors) in the following way:
* For the **primary** measure, the first color from the color array/palette is used.
* For the **target** measure, a darker shade of the first color is used.
* For the **comparative** measure, gray is used.

To override the default coloring scheme and set a custom color for each measure, use [color mapping](15_props__chart_config.md#color-mapping).

## Properties

| Name | Required? | Type | Description |
| :--- | :--- | :--- | :--- |
| projectId | true | string | The project ID |
| primaryMeasure | false | [Measure](afm.md#measure) | The measure displayed as the primary measure |
| targetMeasure | false | [Measure](afm.md#measure) | The measure displayed as the target measure |
| comparativeMeasure | false | [Measure](afm.md#measure) | The measure displayed as the comparative measure |
| viewBy | false | [Attribute](afm.md#attribute) &#124; [Attribute[]](afm.md#attribute) | An attribute definition or an array of two attribute definitions. If set to a two-attribute array, the first attribute wraps up the second one. |
| filters | false | [Filter[]](filter_visual_components.md) | An array of filter definitions |
| sortBy | false | [SortItem[]](result_specification.md#sorting) | An array of sort definitions |
| config | false | [ChartConfig](15_props__chart_config.md) | The chart configuration object |
| locale | false | string | The localization of the chart. Defaults to `en-US`. For other languages, see the [full list of available localizations](https://github.com/gooddata/gooddata-react-components/tree/master/src/translations). |
| drillableItems | false | [DrillableItem[]](15_props__drillable_item.md) | An array of points and attribute values to be drillable |
| sdk | false | SDK | A configuration object where you can define a custom domain and other API options |
| ErrorComponent | false | Component | A component to be rendered if this component is in error state. See [ErrorComponent](15_props__error_component.md).|
| LoadingComponent | false | Component | A component to be rendered if this component is in loading state. See [LoadingComponent](loading_component.md).|
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
    colors: ['rgb(195, 49, 73)'],
    colorPalette: [{
        guid: '01',
        fill: {
            r: 195,
            g: 49,
            b: 73
        }
    }],
    colorMapping: [{
        predicate: (headerItem) => {
            return headerItem.measureHeaderItem && (headerItem.measureHeaderItem.localIdentifier === 'm1_localIdentifier')
        },
        color: {
            type: 'guid',
            value: '01'
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
