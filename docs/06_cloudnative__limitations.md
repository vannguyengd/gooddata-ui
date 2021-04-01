---
title: Limitations
sidebar_label: Limitations
copyright: (C) 2007-2021 GoodData Corporation
id: cloudnative_limitations
---

GoodData.CN does not yet implement all capabilities that are specified on the **Analytical Backend** Service Provider Interface (SPI).
If you try to use any capability that is not yet available in GoodData.CN then its implementation of Analytical Backend
will raise a `NotSupported` exception.

GoodData.CN also uses a different scheme for identifying entities. This impacts how you have to reference GoodData.CN entities on 
input to different components or services:

-  LDM entities such as data sets, attributes, labels and facts are always identified using `id` and `type`
-  Complex MAQL measures are always identified using `id` and `type`

If you have use a component, or a service of **Analytical Backend** which requires an instance of `ObjRef` on input, then
you have to use the `idRef` factory function to create one and specify both `id` and `type`.

**NOTE**: We recommend using the [catalog-export](02_start__catalog_export.md) tool to generate execution model
objects from your GoodData.CN workspace. They will be generated with correct `id` and `type` and you can use the
model objects seamlessly as input to the different visual components.

### Unsupported capabilities

-  Combining measure value filter and ranking filter in a single execution is not supported.
-  Rollups (native totals) are not supported.
-  Subtotals are not supported.
-  Exports of execution results are not supported.
-  Attribute Valid Element Query with attribute filters or with measure filters is not supported.
-  Dashboard alerts are not supported.
-  Dashboard exports into PDF and scheduling of dashboard exports are not supported.

### Limitations

-  GoodData.CN implementation of Analytical Backend only supports object referencing by `id` and `type`. Use `idRef` factory
   function to create correct sub-type of `ObjRef`.
-  GoodData.CN implementation of Analytical Backend only supports attribute filtering by text values. The `newPositiveAttributeFilter`
   and `newNegativeAttributeFilter` factory functions will treat inputs as text values by default.
-  Drillable items used to configure drill eventing for visual components must use `identifier` to identify drillable entity. 
   Using `uri` to identify drillable items is not supported. Using `uri` for drillable items will lead to undefined behavior today.
-  The `uriMatch` drill predicate that can be used to configure drill eventing for visual components is not supported. You can
   use the `identifierMatch` or `localIdentifierMatch` predicates to match measures or attributes. You can use the `attributeItemNameMatch`
   to match attribute element name.
-  The drill events will contain `uri` in the different parts of the event. Ignore the values in `uri`. We will modify the contents
   of the `uri` fields in the upcoming releases of GoodData.UI.
   
### Known issues

-  On the [DashboardView](10_vis__dashboard_view.md) component, when you specify an attribute filter using text values, you will run
   into errors. You can work around this by creating attribute filter that uses `uris` and then specify the text values there.
   
   ```javascript
   import { newPositiveAttributeFilter } from "@gooddata/sdk-model";
   
   const dashboardFilter = newPositiveAttributeFilter("<attribute-identifier>", { uris: [ "textValue1", "textValue2" ]})
   ```

   **NOTE**: This is an API problem in the `DashboardView` component that we are aiming to address in the next minor 
   release. All filtering on GoodData.CN is done using text values but for `DashboardView` you have to specify those
   values differently.
