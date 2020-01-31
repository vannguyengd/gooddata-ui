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
  onCancel={<on-cancel-callback>}
  measureIdentifier={<measure-local-identifier>}
  filter={<filter>}
  anchorEl={<toggle-button-selector>}
  usePercentage={<percentage-measure-boolean>}
  warningMessage={<warning-message>}
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
    this.state = { filters: [], displayDropdown: false };

    onApply = filter => {
        this.setState({ filters: [filter], displayDropdown: false });
    };

    onCancel = () => {
        this.toggleButtonRef = null;
        this.setState({ displayDropdown: false });
    };

    toggleDropdown = e => {
        this.toggleButtonRef = !this.state.displayDropdown ? e.currentTarget : null;
        this.setState(state => ({ ...state, displayDropdown: !state.displayDropdown }));
    };

    render() {
        const { filters, displayDropdown } = this.state;

        return (
            <div>
                <div onClick={this.toggleDropdown}>Measure button</div>
                {displayDropdown ? (
                    <MeasureValueFilterDropdown
                        onApply={this.onApply}
                        onCancel={this.onCancel}
                        measureIdentifier={totalSales.measure.localIdentifier}
                        filter={filters[0] || null}
                        anchorEl={this.toggleButtonRef}
                    />
                ) : null}
                <BarChart
                    projectId={projectId}
                    measures={[totalSales]}
                    viewBy={[locationResort]}
                    filters={filters}
                />
            </div>
        );
    }
}
```

## User input formatting

Input inside measure value filter component is formatted using separators. They can be changed using `separators` property. The property specifies thousand separator character and decimal point character. By default `,` for thousands and `.` for decimal point are used.

### Example

```javascript
<MeasureValueFilterDropdown
    ...
    separators={{ thousand: " ", decimal: "," }}
/>
```

## Properties

| Name              | Required? | Type                                                      | Default value | Description                                                                                                                                                                                             |
| :---------------- | :-------- | :-------------------------------------------------------- | :------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| measureIdentifier | true      | string                                                    |               | The identifier of the filtered measure. You can use either the local identifier or URI.                                                                                                                      |
| onApply           | true      | Function                                                  |               | A callback when the selection is confirmed by a user. The passed configuration of the measure value filter is already transformed into a measure value filter definition, which you can then send directly to a chart. |
| onCancel          | true      | Function                                                  |               | A callback when user clicks on the Cancel button or invokes dropdown to be closed by clicking outside of it. Use this callback to hide dropdown.                                                                   |
| filter            | false     | [Filter](filter_visual_components.md#measure-value-filter)| null          | The measure value filter definition                                                                                                                                                                                    |
| displayDropdown   | false     | boolean                                                   | false         | Specifies whether the dropdown is opened                                                                                                                                                                               |
| anchorEl          | false     | event target or string                                    | 'body'        | Element which dropdown is aligned to, typically your toggle button                                                                                                                                                     |
| usePercentage     | false     | boolean                                                   | false         | Specifies whether the filtered measure is formatted as percentage. In this case, the filter dropdown will accept percentage values, not the actual measure values. It should be set to false when computeRatio is enabled on the filtered measure, as it is filtered by actual measure values and not percentage ones.                                                                                          |
| warningMessage    | false     | string                                                    | undefined     | Warning message displayed in the dropdown                                                                                                                                                                              |
| separators | false | [Separators](#user-input-formatting) | undefined |  Separators used for formatting string in input. By default `,` for thousands and `.` for decimal point are used |
