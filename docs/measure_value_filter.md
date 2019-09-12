<!-- BB-1694 - Move the content of this page to filter_visual_components.md between 'Data filter' and 'Filters set on a specific measure' sections -->

## Filters by measure value

You can filter a visual component by the value of a measure. You can filter only the measures that are present in the visualization, on a granularity defined by the attributes in the visualization.

### Comparison measure value filter

A **comparison measure value filter** shows data whose measure matches a comparison condition.

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

### Range measure value filter

A **range measure value filter** shows data whose measure matches a range condition.

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

* `'BETWEEN'`: The measure value is between `from` and `to` values.
* `'NOT_BETWEEN'`: The measure value is not between `from` and `to` values.