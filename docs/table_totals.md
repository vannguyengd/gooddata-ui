---
title: Specify Table Totals
sidebar_label: Specify Table Totals
copyright: (C) 2007-2018 GoodData Corporation
id: table_totals
---

You can display rows with aggregated measure data in both Table and PivotTable components using the `totals` prop.

### Supported aggregation functions

| Function | Table component | PivotTable component | Description |
| :--- | :--- | :--- | :--- |
| Sum | supported | supported | Sum of values |
| Maximum | supported | supported | Biggest value |
| Minimum | supported | supported | Smallest value |
| Average | supported | supported | Average value |
| Median | supported | supported | Middle value |
| Rollup | supported | not supported | Sum of unique record values  |

## Column grand total
A column grand total displays aggregated data for all values of a column in a row pinned to the bottom of the table. It is defined by the local identifiers of a measure and the first row attribute. There can be no totals on tables without row attributes nor without measures. A PivotTable with column attributes shows totals for all columns with the specified measure.

> **Warning!** Even though the Execute component supports both grand totals and sub totals on any dimension, table components support only grand totals on rows.

### Column grand total example

![Grand Totals for Columns](assets/pivot_table_totals.png)

```jsx
const measures = [
    {
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
    }
];

const columns = [
    {
        visualizationAttribute: {
            displayForm: {
                identifier: monthDateIdentifier
            },
            localIdentifier: 'month'
        }
    }
];

const rows = [
    {
        visualizationAttribute: {
            displayForm: {
                identifier: locationStateDisplayFormIdentifier
            },
            localIdentifier: 'location'
        }
    }
];

const totals = [
    {
        measureIdentifier: 'franchiseFeesIdentifier',
        type: 'sum',
        attributeIdentifier: 'location' // To create a grand total this needs to be the localIdentifier of the FIRST row attribute
    },
    {
        measureIdentifier: 'franchiseFeesIdentifier',
        type: 'avg',
        attributeIdentifier: 'location' // To create a grand total this needs to be the localIdentifier of the FIRST row attribute
    }
];

return (
    <div style={{ height: 300 }}>
        <PivotTable
            projectId={projectId}
            measures={measures}
            columns={columns}
            rows={rows}
            totals={totals}
        />
    </div>
);
```
