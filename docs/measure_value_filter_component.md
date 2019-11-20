<!--
BB-1694 - Make this page visible by adding it to the menu and connect this article with measure_value_filter.md and vice versa
---
id: measure_value_filter_component
title: Measure Value Filter
sidebar_label: Measure Value Filter
copyright: (C) 2007-2018 GoodData Corporation
---
-->

Measure value filter component is a dropdown component that allows you to create a new measure value filter or to edit an existing one. When a user clicks **Apply**, a callback function that contains a measure value filter ready to be used in the AFM is called.

![Measure Value Filter Component](assets/mvf_combined.png "Measure Value Filter Component")

### Structure

```javascript
import "@gooddata/react-components/styles/css/main.css";
import { MeasureValueFilterDropdown } from "@gooddata/react-components";

<MeasureValueFilterDropdown
  onApply={<on-apply-callback>}
  measureTitle={<measure-title>}
  measureIdentifier={<measure-local-identifier>}
  filter={<filter>}
/>
```

### Example

The following example shows a bar chart displaying one measure sliced by one attribute. A user can use a measure value filter component to filter the displayed bars and see only relevant data.

```javascript
import React, { Component } from "react";
import "@gooddata/react-components/styles/css/main.css";
import {
  BarChart,
  Model,
  MeasureValueFilterDropdown
} from "@gooddata/react-components";

const totalSales = Model.measure("totalSalesIdentifier")
  .format("#,##0")
  .localIdentifier("totalSales")
  .title("$ Total Sales");

const locationResort = Model.attribute(
  "locationResortIdentifier"
).localIdentifier("locationResort");

export default class SalesByResort extends Component {
  this.state = { filter: null };

  onApply = filter => {
    this.setState({ filter });
  };

  render() {
    const { filter } = this.state;

    return (
      <div>
        <MeasureValueFilterDropdown
          onApply={this.onApply}
          measureTitle={totalSales.measure.title}
          measureIdentifier={totalSales.measure.localIdentifier}
          filter={filter}
        />
        <BarChart
          projectId={projectId}
          measures={[totalSales]}
          viewBy={[locationResort]}
          filters={filter ? [filter] : []}
        />
      </div>
    );
  }
}
```

## Properties

| Name              | Required? | Type                                                       | Description                                                                                                                                                                                                  |
| :---------------- | :-------- | :--------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| measureIdentifier | true      | string                                                     | The identifier of the filtered measure. You can use either the local identifier or URI.                                                                                                                                       |
| onApply           | true      | Function                                                   | A callback when the selection is confirmed by a user. The passed configuration of the measure value filter is already transformed into a measure value filter definition, which you can then send directly to a chart.         |
| filter            | false     | [Filter](filter_visual_components.md#measure-value-filter) | The measure value filter definition                                                                                                                                                                          |
| measureTitle      | false     | string                                                     | The name of the filtered measure to display on the dropdown toggle button                                                                                                                                                   |
| button            | false     | Component                                                  | The custom dropdown [toggle button component](#custom-dropdown-button)                                                                                                                                           |
| locale            | false     | string                                                     | The localization of the chart. Defaults to `en-US`. For other languages, see the [full list of available localizations](https://github.com/gooddata/gooddata-react-components/tree/master/src/translations). |
| displayDropdown   | false     | boolean                                                    | Specifies whether the dropdown is loaded open                                                                                                                                                           |

## Custom dropdown button

To use your own button as the dropdown toggle button, pass the custom dropdown toggle button component to the `button` prop of `MeasureValueFilter`.

![Custom dropdown button](assets/mvf_custom_button.png "Custom dropdown button")

### Properties

| Name          | Required? | Type            | Description                                                                                                        |
| :------------ | :-------- | :-------------- | :----------------------------------------------------------------------------------------------------------------- |
| onClick       | true      | Function        | A callback when the button is clicked. Toggles the dropdown itself.                                                |
| isActive      | false     | boolean         | Specifies whether the dropdown is displayed                                                                 |
| measureTitle  | false     | string          | The name of the filtered measure                                                                                              |
| operator      | false     | string          | The identifier of the [operator](measure_value_filter.md#filtering-by-comparing-a-measure-value-to-a-specific-value) |
| operatorTitle | false     | string          | The translated label of the operator                                                                               |
| value         | false     | [Value](#value) | The value of the filter                                                                                                    |
### Value

The `Value` object contains the current configuration of the filter value and can be of the following types:

- `from` for a range
- `to` for a range
- `value` for a comparison
