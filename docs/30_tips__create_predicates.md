---
title: Create Header Predicates
sidebar_label: Create Header Predicates
copyright: (C) 2007-2020 GoodData Corporation
id: ht_create_predicates
---

Predicates allow you to create a match between elements (for example, a measure header item or an attribute header item) with an arbitrary level of complexity.
These are used in [drilling](15_props__drillable_item.md) so that you can decide which parts of your visualization can be drilled into.

Header Predicate is a function returning a boolean that takes two arguments:

* **Mapping Header** - an object describing the item the match of which we are testing (see the [definition](https://github.com/gooddata/gooddata-ui-sdk/blob/master/libs/sdk-ui/src/base/headerMatching/MappingHeader.ts#L16) for more details)

* **Header Predicate Context** - additional data describing the context in which the match is being tested: the data view that resulted in the values passed as the first argument (see the [definition](https://github.com/gooddata/gooddata-ui-sdk/blob/master/libs/sdk-ui/src/base/headerMatching/HeaderPredicate.ts#L8) for more details)

If a predicate returns `true` for a given item, the item is matched.

The most common predicates are predefined in [HeaderPredicateFactory](https://github.com/gooddata/gooddata-ui-sdk/blob/master/libs/sdk-ui/src/base/headerMatching/HeaderPredicateFactory.ts#L167-L309), however, you can write your own.

## Custom Header Predicate Examples

To illustrate the possibilities of custom predicates, here are several examples.

Predicate that matches all items with names starting with a capital _A_:

```js
import { isResultAttributeHeader } from "@gooddata/sdk-backend-spi";

const startsWithA = (header) => {
    return isResultAttributeHeader(header) && header.attributeHeaderItem.name.startsWith("A");
};
```

Predicate that matches only attribute headers and only if the visualization has no more than 3 attributes:

```js
import { isAttributeDescriptor } from "@gooddata/sdk-backend-spi";

const attributesIfNoMoreThanThree = (header, context) => {
    if (context.dv.def().attributes().length > 3) {
        return false;
    }

    return isAttributeDescriptor(header);
};
```
