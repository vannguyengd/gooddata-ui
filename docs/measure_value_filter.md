<!-- BB-1694 - Move the content of this page to filter_visual_components.md between 'Data filter' and 'Filters set on a specific measure' sections -->

## Filters by measure value

You can filter a visual component by the value of a measure. You can filter only the measures that are present in the visualization, on a granularity defined by the attributes in the visualization.

**NOTE:** Be aware that the numbers rendered by a vizualization are often rounded up/down. However, filters are applied to the original exact numbers (those before rounding), and that may lead to unexpected results. For example, the number `400.01` rounded to a whole number would be `400`, but it will still be included in the visualization with a filter that filters out the values smaller than or equal to `400`.

### Filtering by comparing a measure value to a specific value

When you filter a measure by comparing its value to some predefined value, the filter shows only the data whose measure matches a comparison condition.

```javascript
// Type: IMeasureValueFilter
{
    measureValueFilter: {
        measure: {
            localIdentifier: '<measure-localIdentifier>'
        },
        condition: {
            comparison: {
                operator: 'GREATER_THAN',
                value: 200
            }
        }
    }
},
```

You can set `operator` to one of the following:

* `'GREATER_THAN'`: The measure value is greater than `value`.
* `'GREATER_THAN_OR_EQUAL_TO'`: The measure value is greater than `value` or equal to `value`.
* `'LESS_THAN'`: The measure value is less than `value`.
* `'LESS_THAN_OR_EQUAL_TO'`: The measure value is less than `value` or equal to `value`.
* `'EQUAL_TO'`: The measure value is equal to `value`.
* `'NOT_EQUAL_TO'`: The measure value is not equal to `value`.

### Filtering by comparing a measure value to a value range

When you filter a measure by comparing its value against some predefined range of values, the filter shows only the data whose measure matches a range condition.

```javascript
// Type: IMeasureValueFilter
{
    measureValueFilter: {
        measure: {
            localIdentifier: '<measure-localIdentifier>'
        },
        condition: {
            range: {
                operator: 'BETWEEN',
                from: 100,
                to: 300
            }
        }
    }
},
```

You can set `operator` to one of the following:

* `'BETWEEN'`: The measure value is between `from` and `to` values (including the boundaries).
* `'NOT_BETWEEN'`: The measure value is not between `from` and `to` values (excluding the boundaries).

### Filtering by a percentage measure

You can use several methods to get measures to be rendered as a percentage. Depending on the method you used, measure value filters applied to such measures behave differently.

#### Measures shown in %
When a visualization is filtered by a measure that is shown in % (that is, the measure has `computeRatio=true`), the filter value is based on the range of the actual measure values and not on the percentage values rendered by the visualization.

For example, if the visualization renders the values `100`, `200`, and `700` as `10%`, `20%`, and `70%`, the filter that filters out the first two values would use a comparison condition with the operator `GREATER_THAN` and the condition value `200`. The result would contain only the value `700` rendered as `100%` in the visualization.

The reason is that the percentage values are always computed for the current execution result. By applying the measure value filter, the result changes and so the percentage values will change as well. That would result in the filter and the values displayed to have a different scale which would be confusing. For instance, accepting only values lower than 50% could still produce insights with values higher than 50%.

#### Measures in charts stacked to 100%
When a visualization is filtered by a measure that is stacked to 100%, the filter value is based on the range of the actual measure values and not on the percentage values rendered by the visualization.

The example and the reason behind this behavior are similar to those described above for the measures shown in %.

#### Measures formatted in %  
When a visualization is filtered by a measure that is formatted in %, the filter value is based on the percentage values rendered by the visualization and not on the range of the actual measure values.

For example, if the visualization renders the formatted values `100%`, `20%`, and `3%`, the filter that filters out only one value would use the operator `NOT_EQUAL_TO` and the filter values `1`, `0.2`, or `0.03`, respectively.

This applies to the following types of measures:
* Measures that have the percentage format set by the `format` measure property
* Calculated measures with the percentage format set in the metadata catalog
* Arithmetic measures with the `change` operator that has the percentage property `format` set
