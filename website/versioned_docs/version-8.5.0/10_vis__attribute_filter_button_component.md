---
id: version-8.5.0-attribute_filter_button_component
title: Attribute Filter Button
sidebar_label: Attribute Filter Button
copyright: (C) 2021 GoodData Corporation
original_id: attribute_filter_button_component
---

The **Attribute Filter Button component** is a dropdown component that lists attribute values.

![Attribute Filter Button Component](assets/attribute_filter_button.png "Attribute Filter Button Component")

To implement the component, choose one of the following methods:
* You pass a callback function, which receives a list of the selected values when a user clicks **Apply**.
* The component handles the change after calling itself via the ```connectToPlaceholder``` property.

    The ```onApply``` function is not needed. Use ```onApply``` only if you need a specific callback to be fired.

Optionally, you can define what attribute values should be selected in the filter by default.

## Example

In the following example, attribute values are listed and the ```onApply``` callback function is triggered when a user clicks **Apply** to confirm the selection.
The `onApply` callback receives a new filter definition that you can use to filter charts.

```jsx
import React, { Component } from "react";
import { AttributeFilterButton, Model } from "@gooddata/sdk-ui-filters";
import { newNegativeAttributeFilter } from "@gooddata/sdk-model";

import "@gooddata/sdk-ui-filters/styles/css/main.css";

import { Ldm } from "./ldm";

export class AttributeFilterButtonExample extends Component {
    onApply(filter) {
        console.log("AttributeFilterButtonExample onApply", filter);
    }

    render() {
        return (
            <div>
                <AttributeFilterButton
                    filter={newNegativeAttributeFilter(Ldm.EmployeeName.Default, [])}
                    onApply={this.onApply}
                />
            </div>
        );
    }
}
```

## Attribute Filter Button component vs. Attribute Filter component

The Attribute Filter Button component is functionally similar to the [Attribute Filter component](10_vis__attribute_filter_component.md). You can use either of them. The only difference is what the filter dropdown button looks like.

![Filter Dropdown Button](assets/attribute_filter_button_top_visual.png "Filter Dropdown Button")

## Define the default selection of values in the filter

To define the attribute values that should be selected in the filter by default, include those attribute values in the ```filter``` property. For more details about filtering, see [Filter Visual Components](30_tips__filter_visual_components.md).

```jsx
    render() {
        return (
            <div>
                <AttributeFilterButon
                    filter={newPositiveAttributeFilter(Ldm.EmployeeName.Default, ["Abbie Adams"])}
                    onApply={this.onApply}
                />
            </div>
        );
    }
```

## Define a parent-child relationship between two attribute filters

To define a parent-child relationship between two attribute filters, hand over the ```parentFilters``` and ```parentFilterOverAttribute``` properties to the filter that should become a child filter dependent on the other attribute filter.

The ```parentFilterOverAttribute``` property defines the relationship between the parent filter and the child filter. You specify this attribute in the child filter via either a reference to an attribute in the parent filter or a reference to any independent attribute common for a parent filter attribute and a child filter attribute. This attribute must represent the way how the two filters are connected.

You can define the parent filter as an [AttributeFilter](30_tips__filter_visual_components.md) or a [visualization definition placeholder](30_tips__placeholders.md).

```jsx
    render() {
        <div>
            <AttributeFilterButton filter={parentFilter} fullscreenOnMobile={false} onApply={setParentFilter} />
            <AttributeFilterButton
                filter={filter}
                parentFilters={parentFilter ? [parentFilter] : []}
                parentFilterOverAttribute={idRef(LdmExt.locationIdAttributeIdentifier)}
                fullscreenOnMobile={false}
                onApply={setFilter}
            />
        </div>
    }
```

```jsx
    render() {
    <div>
        <AttributeFilterButton connectToPlaceholder={parentFilterPlaceholder} fullscreenOnMobile={false} />
        <AttributeFilterButton
            connectToPlaceholder={filterPlaceholder}
            parentFilters={parentFilterPlaceholder ? [parentFilterPlaceholder] : []}
            parentFilterOverAttribute={idRef(LdmExt.locationIdAttributeIdentifier)}
            fullscreenOnMobile={false}
        />
    </div>
}
```

## Properties

| Name | Required? | Type | Description |
| :--- | :--- | :--- | :--- |
| onApply | false | Function | A callback when the selection is confirmed by a user |
| onError | false | Function | A callback when the component runs into an error |
| filter | false | [Filter](30_tips__filter_visual_components.md) | The attribute filter definition |
| parentFilters | false | AttributeFiltersOrPlaceholders[] | An array of parent attribute filter definitions |
| connectToPlaceholder | false | IPlaceholder<IAttributeFilter> | The [visualization definition placeholder](30_tips__placeholders.md) used to get and set the value of the attribute filter |
| parentFilterOverAttribute | false | ObjRef | The reference to the parent filter attribute over which the available options are reduced |
| locale | false | string | The localization of the component. Defaults to `en-US`. For other languages, see the [full list of available localizations](https://github.com/gooddata/gooddata-ui-sdk/blob/master/libs/sdk-ui/src/base/localization/Locale.ts). |
| title | false | string | A custom label to show on the dropdown icon |
| FilterError | false | Component | A component to be rendered if component runs into an error |

**NOTE:** The ```uri``` property (the URI of the attribute displayForm used in the filter) and the ```identifier``` property (the identifier of the attribute displayForm used in the filter) are **deprecated**. Do not use them.
To define an attribute, use the ```filter``` or ```connectToPlaceholder``` property.
