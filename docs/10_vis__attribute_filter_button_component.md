---
id: attribute_filter_button_component
title: Attribute Filter Button
sidebar_label: Attribute Filter Button
copyright: (C) 2021 GoodData Corporation
---

The **Attribute Filter Button component** is a dropdown component that lists attribute values. You can either pass a callback function, which receives a list of the selected values when a user clicks **Apply**, or the component handles the change after the click itself via ```connectToPlaceholder``` property.

If you use ```connectToPlaceholder``` property, the ```onApply``` is not needed. Use ```onApply``` only in case you need a specific callback to be fired.

Optionally, you can define what attribute values should be selected in the filter by default.

![Attribute Filter Button Component](assets/attribute_filter_button.png "Attribute Filter Button Component")

### Example

In the following example, attribute values are listed and the ```onApply``` callback function is triggered when a user clicks **Apply** to confirm the selection.
The `onApply` callback receives a new filter definition that you can use to filter charts.

```jsx
import React, { Component } from "react";
import { AttributeFilterButton, Model } from "@gooddata/sdk-ui-filters";
import { newNegativeAttributeFilter } from "@gooddata/sdk-model";

import "@gooddata/sdk-ui-filters/styles/css/main.css";

import { Ldm } from "./ldm";

export class AttributeFilteButtonrExample extends Component {
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

## Attribute parent child filtering

To define parent child relationship between two filters, create two filters and hand over ```parentFilters``` and ```parentFilterOverAttribute``` properties to the one which is supposed to be child filter dependent on the another.

Parent filters can be defined as a [AttributeFilter](30_tips__filter_visual_components.md) or [Placeholders](30_tips__placeholders.md).

The ```parentFilterOverAttribute``` defines the relationship between parent filter and child filter. You specify this attribute in the child filter via parent filter attribute reference or reference of any other independent attribute common for the parent filter attribute as well as for the child filter attribute. In any case, this attribute must represent the way two filters are connected.

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
| onError | false | Function | A callback when the component runs into an error. |
| filter | false | [Filter](30_tips__filter_visual_components.md) | The attribute filter definition |
| parentFilters | false | AttributeFiltersOrPlaceholders[] | The parent attribute filter definitions |
| connectToPlaceholder | false | IPlaceholder<IAttributeFilter> | Specify [placeholder](30_tips__placeholders.md) to use to get and set the value of the attribute filter. |
| parentFilterOverAttribute | false | ObjRef | Specify parent filter attribute ref over which should be available options reduced. |
| locale | false | string | The localization of the component. Defaults to `en-US`. For other languages, see the [full list of available localizations](https://github.com/gooddata/gooddata-ui-sdk/blob/master/libs/sdk-ui/src/base/localization/Locale.ts). |
| title | false | string | A custom label to show on the dropdown icon |
| FilterError | false | Component | A component to be rendered if component runs into an error. |

**NOTE:** The ```uri``` property (the URI of the attribute displayForm used in the filter) and the ```identifier``` property (the identifier of the attribute displayForm used in the filter) are **deprecated**. Do not use them.
To define an attribute, use the ```filter``` or ```connectToPlaceholder``` property.
