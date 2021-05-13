---
id: api_maturity
title: API Maturity
sidebar_label: API Maturity
copyright: (C) 2007-2018 GoodData Corporation
---

All APIs exported by the GoodData.UI packages come with documentation that also includes API Maturity annotations. These
annotations are important to follow: they indicate to you, the consumer, what the stability guarantees of the different
APIs are.

The API Maturity annotations are as follows:

-  **@alpha**: initial API; highly likely to change outside of the SemVer specification
-  **@beta**: mostly stable API; details may change outside of the SemVer specification
-  **@public**: stable API; follows the SemVer specification
-  **@internal**: internal API; may change or disappear at any time

All this documentation is included in the published packages so that you can conveniently access it in an IDE of your choice.

## Recommendation

Use only the exported APIs annotated as **@public**. Doing this guarantees that upgrades to latest minor
or patch versions work seamlessly.

On top of this, we strongly recommend that you use the same version of all GoodData.UI packages.

## TypeScript types considerations

All the TypeScript types provided with the GoodData.UI packages are compatible with TypeScript version 4.0.2 and newer.

The types marked as `@public` will generally adhere to the SemVer specification,
however there is one group of types that will not adhere to it completely: types of the React props of all the components
in the `sdk-ui-*` packages. These types will be backwards compatible in the sense that creating objects of those
types will work across minor versions, however we may extend them even across minor releases. An example of such change:

```tsx
// in an older version
export interface IExampleProps {
    sampleProp: number;
}

// in a newer version
export interface IExampleProps {
    sampleProp: number | string;
    addedProp?: boolean;
}

// calling the component is OK in both versions
<Example
    sampleProp={42}
/>

// however your custom functions using the type can break
function getSampleProp(props: IExampleProps): number {
    return props.sampleProp; // breaks with newer version as this is now (number | string)
}

// to avoid this, consider creating an explicit copy of the type or type the function like this:
function getSampleProp(props: { sampleProp: number }): number {
    return props.sampleProp; // works with both versions
}

```

This will not affect 99% of the common use cases, but can be problematic if you for example use these types in your own functions (as shown in the`getSampleProp` example).
We chose this approach to allow us to add and extend existing features without having to release a major version each time.
