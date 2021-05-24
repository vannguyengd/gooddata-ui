---
title: Metadata Placeholders
sidebar_label: Metadata Placeholders
copyright: (C) 2007-2021 GoodData Corporation
id: placeholders
---

A common scenario when building applications using GoodData.UI is to change the metadata coming to the charts (such as metrics and attributes) based on some user action. GoodData.UI offers a built-in way to cover such use cases - **placeholders**.

Placeholders represent parts of chart execution elements (attributes, measures, filters, sorts, or totals) that can change value at runtime. You can provide them to charts instead of the execution elements themselves, allowing you to control and change any number of charts you want by simply changing the value of the placeholder(s).

Placeholders are built on top of React context and hooks.

## Create your first placeholder

### 1/ Wrap your application with PlaceholdersProvider

```
import { PlaceholdersProvider } from '@gooddata/sdk-ui';

const Root = () =>  (
    <PlaceholdersProvider>
        <App />
    </PlaceholdersProvider>
);
```

### 2/ Create your first placeholder

```
import { newPlaceholder } from '@gooddata/sdk-ui';

export const primaryMeasurePlaceholder = newPlaceholder();
```

### 3/ Use your first placeholder

```
import { BarChart } from '@gooddata/sdk-ui-charts';

<BarChart
    measures={[primaryMeasurePlaceholder]}
/>
```

### 4/ Change the value of your first placeholder

```
const PrimaryMeasureSelect = () => {
    // Usage of the placeholder is very similar to React useState hook
    const [
        // Active value of the placeholder
        primaryMeasure,
        // Callback to set value of the placeholder
        setPrimaryMeasure
    ] = primaryMeasurePlaceholder.use();

    return (
        <div>
            Active primary measure identifier: {
                primaryMeasure
                    ? measureIdentifier(primaryMeasure)
                    : "No primary measure"
            }
            <button
                
                onClick={() => {
                    // Set value of the placeholder
                    setPrimaryMeasure(Md.Revenue);
                }}
            >
                Revenue
            </button>
        <div/>
    );
};
```

## Common placeholders

Common placeholders may hold one or multiple values (attributes/measures/filters/sorts/totals). You can create common placeholder by calling `newPlaceholder` method from `@gooddata/sdk-ui`. Note that you should not set other placeholders as the placeholder value - to combine multiple placeholders, use [composed placeholder](#composed-placeholders) instead. 

### Create common placeholder
Create common placeholder that may hold single or multiple values.
```
const measurePlaceholder = newPlaceholder();
```

### Set default value of the common placeholder
Create common placeholder with the default value.
```
const measurePlaceholder = newPlaceholder(Md.Revenue);
```

### Provide common placeholder to the visualization

You can provide placeholder instead of the concrete value to any visualization. Placeholder will be replaced by its set value or the default value.
```
<BarChart
    measures={[measurePlaceholder]}
/>
```

You can provide also placeholders that may hold array of values - it will be flattened during the placeholder resolution.
```
<BarChart
    measures={[measureGroupPlaceholder]}
/>
```

### Set validation and other options of the common placeholder
You can set custom validation or id of the placeholder when creating it.
```
const measurePlaceholder = newPlaceholder(Md.Revenue, {

    // For the debugging, it can be useful to speficy readable id.
    id: "primaryMeasure",

    // Specify validation for the placeholder value.
    validate: (measure) => {
        // throw error if some condition is not met
    },

});
```

### Get or set common placeholder value
By default, each common placeholder has [usePlaceholder](#usePlaceholder) hook attached to it for the convenience. Usage is very similar to React [useState](https://reactjs.org/docs/hooks-state.html) hook.

```
const MeasureSelect = () => {
    const [
        // measure is active value of the placeholder
        measure,
        // setMeasure is callback to update the placeholder value
        setMeasure
    ] = measurePlaceholder.use();

    return (
        <button
            onClick={() => {
                // Set active placeholder value
                setMeasure(Md.Revenue);
            }}
        >
            Revenue
        </button>
    );
};
```

## Composed placeholders

Composed placeholders are placeholders with a value derived from other placeholders and or your custom resolution context. You can create composed placeholder by calling `newComposedPlaceholder` method from `@gooddata/sdk-ui`.

### Create composed placeholder
By default, composed placeholder value is resolved as a tuple of resolved input placeholder values. In this case, it will be array of measures.
```
const combinedMeasuresPlaceholder = newComposedPlaceholder(
    [primaryMeasurePlaceholder, secondaryMeasurePlaceholder]
);
```

### Create composed placeholder with computed value
With composed placeholders, you can perform computations on top of resolved input placeholder values. This can be useful for example when you want to apply filters from one placeholder to particular measure placeholder.
```
const computedMeasurePlaceholder = newComposedPlaceholder(
    // Placeholders to compute the result
    [primaryMeasurePlaceholder, filtersPlaceholder],

    // Function to calculate the result from the resolved placeholder values
    ([primaryMeasure, filters]) => {
        if (!primaryMeasure) {
            return;
        }

        // Apply some filters for particular measure only
        return modifySimpleMeasure(primaryMeasure, (m) => m.filters(...filters));
    },
);
```

### Create composed placeholder that accepts custom resolution context

You can also provide your own resolution context to composed placeholders, which is useful if you want to influence the resolution of value based on some data that the placeholders don't know about. 

Note that when you have composed placeholders composed from other composed placeholders, **custom resolution context is shared among all of these placeholders.**

```
const arithmeticMeasurePlaceholder = newComposedPlaceholder(
    [primaryMeasurePlaceholder, secondaryMeasurePlaceholder],
    // Second argument offer a way to provide custom context for the resolution
    ([primaryMeasure, secondaryMeasure], { operator }) => {
        if (!primaryMeasure) {
            return;
        }

        // Create arithmetic measure from the input
        return newArithmeticMeasure([primaryMeasure, secondaryMeasure], operator);
    },
);

// Then you can call the hook in you component like this.
const arithmeticMeasure = arithmeticMeasurePlaceholder.use({ operator: "sum" });

// Or like this.
const arithmeticMeasure = useComputedPlaceholder(arithmeticMeasurePlaceholder, { operator: "sum" });
```

### Provide composed placeholder to the visualization
You can provide composed placeholder instead of the concrete value to any visualization. Placeholder will be replaced by its resolved value.
```
<BarChart
    measures={[arithmeticMeasurePlaceholder]}
    // Provide custom context for the composed placeholders resolution
    placeholdersResolutionContext={{ operator: "sum" }}
/>
```

### Get composed placeholder value
By default, each composed placeholder has [useComposedPlaceholder](#useComposedPlaceholder) hook attached to it for the convenience.

```
const MeasureSelect = () => {
    // Without resolution context.
    const measure = composedMeasurePlaceholder.use();

    // With resolution context.
    const measure = arithmeticMeasurePlaceholder.use({ operator: "sum" });

    // Usage with useComposedPlaceholder hook.
    const arithmeticMeasure = useComposedPlaceholder(arithmeticMeasurePlaceholder, { operator });

    ...
};
```

## Hooks
To obtain, set and resolve placeholder values GoodData.UI offers few React hooks.
- `usePlaceholder` to get or set common placeholder value.
- `usePlaceholders` to get or set multiple placeholder values at once.
- `useComposedPlaceholder` to get composed placeholder value.
- `useResolveValueWithPlaceholders` to resolve any value that may contain placeholders to actual values.
- `useResolveValuesWithPlaceholders` to resolve multiple values that may contain placeholders to actual values at once.

### usePlaceholder
React hook to get or set placeholder value.

```
const measurePlaceholder = newPlaceholder();

const Component = () => {
    // usePlaceholder hook is very similar to useState hook
    const [
        // measure is active or default value of the placeholder
        measure,
        // setMeasure is callback to update the placeholder value
        setMeasure
    ] = usePlaceholder(measurePlaceholder);

    // You can update the placeholder by providing the value
    setMeasure(Md.Revenue)

    // Or you can update the placeholder by providing update callback
    setMeasure((activeMeasure) => {
        // Update the placeholder value according to the active value
        const updatedMeasure = ...;

        return updatedMeasure;
    });
};
```

### usePlaceholders
React hook to get or set multiple placeholder values at once. It's useful if you want to perform any atomic change - for example set some preset of metadata values to multiple placeholders.

```
const measurePlaceholder = newPlaceholder();
const attributePlaceholder = newPlaceholder();

const Component = () => {
    const [
        [activeMeasure, activeAttribute],
        setMeasureAndAttribute
    ] = usePlaceholders([measurePlaceholder, attributePlaceholder]);

    // You can update multiple placeholders at once by providing the values.
    // Order of the values should be same as the order of the input placeholders.
    setMeasureAndAttribute([Md.Revenue, Md.Location]);

    // Or you can update mutiple placeholders at once by providing the update callback.
    setMeasureAndAttribute(([activeMeasure, activeAttribute]) => {
        // Update placeholders values according to the active values
        const updatedMeasure = ...;
        const updatedAttribute = ...;

        // Order of the values should be same as the order of the input placeholders.
        return [updatedMeasure, updatedAttribute];
    });
};
```

### useComposedPlaceholder
React hook to obtain composed placeholder value.

```
const measureGroupPlaceholder = newPlaceholder([Md.Revenue, Md.Costs]);

const selectedMeasurePlaceholder = newComposedPlaceholder(
    [measureGroupPlaceholder],
    // measures is resolved value of measures placeholder.
    // Second argument is custom resolution context
    // wich you can provide at the time you are calling it.
    ([measures], { measureIndex }) => {
        return measures[measureIndex];
    }
);

const Component = () => {
    // Get composed placeholder value. In this case it's resolved as Md.Revenue.
    const measure = selectedMeasurePlaceholder.use({ measureIndex: 0 });

    // In this case it's resolved as Md.Costs
    const measure = selectedMeasurePlaceholder.use({ measureIndex: 1 });

    // Usage with useComposedPlaceholder hook
    const measure = useComposedPlaceholder(selectedMeasurePlaceholder, { measureIndex: 0 });
};
```

### useResolveValueWithPlaceholders
React hook that accepts any value that may contains placeholders and replaces placeholders with the actual resolved values.

When the value is an array, placeholders holding array values are flattened.

Objects are not recursively traversed - placeholders nesting is not supported.

```
const measurePlaceholder = newPlaceholder(Md.Revenue);
const measureGroupPlaceholder = newPlaceholder([Md.Costs]);

const Component = () => {
    // Get resolved placeholder value. In this case it's resolved as Md.Revenue.
    const measure = useResolveValueWithPlaceholders(measurePlaceholder);

    // In this case it's resolved as [Md.Costs]
    const measures = useResolveValueWithPlaceholders(measureGroupPlaceholder);

    // Resolution is working even for arrays with placeholders mixed with other values.
    // Placeholders holding arrays are flattened.
    // In this case it's resolved as [Md.Sales, Md.Revenue, Md.Costs]
    const measures = useResolveValueWithPlaceholders([Md.Sales, measurePlaceholder, measuresPlaceholder]);
};
```

### useResolveValuesWithPlaceholders
React hook that accepts multiple values that may contains placeholders and replaces placeholders with the actual resolved values.

Resolution rules are same as for [useResolveValueWithPlaceholders](#useResolveValueWithPlaceholders) hook.

```
const measurePlaceholder = newPlaceholder(Md.Revenue);
const measureGroupPlaceholder = newPlaceholder([Md.Costs]);

const Component = () => {
    // Get resolved value of multiple placeholders at once.
    // In this case it's resolved as [Md.Revenue, [Md.Costs]].
    const [measure, measures] = useResolveValuesWithPlaceholders([
        measurePlaceholder,
        measureGroupPlaceholder
    ]);

};
```

## Initial placeholder values
You can set the initial values of the placeholders like this:

```
const Root = () =>  (
    <PlaceholdersProvider initialValues={[
        // pairs of [placeholder, initialValue]
        [measurePlaceholder, Md.Revenue],
        [attributePlaceholder, Md.State],
    ]}>
        <App />
    </PlaceholdersProvider>
);
```

## Usage with TypeScript
Placeholders have built-in first class TypeScript support.


### Providing placeholder types
You can specify common placeholder types like this:
```
// Placeholder that can hold any measure.
export const primaryMeasurePlaceholder = newPlaceholder<IMeasure>();

// Placeholder that can hold multiple attributes.
export const attributeGroupPlaceholder = newPlaceholder<IAttribute[]>([]);
```

### Type inference
When you provide default value to the placeholder, its type is inferred from the default value:
```
// Placeholder type is inferred from the primaryMeasure type
export const primaryMeasurePlaceholder = newPlaceholder(primaryMeasure);

// If the primaryMeasure type is too narrow (e.g. IMeasure<IPoPMeasureDefinition>),
// you may want to correct it like this, so it accepts any measure type.
export const primaryMeasurePlaceholder = newPlaceholder<IMeasure>(primaryMeasure);
```

Type inference is working also for  [useResolveValueWithPlaceholders](#useResolveValueWithPlaceholders) and all other hooks. 
```
export const measurePlaceholder = newPlaceholder<IMeasure>(Md.Sales);

// Value is correctly inferred as IMeasure.
const value = useResolveValueWithPlaceholders(measurePlaceholder)

export const attributesPlaceholder = newPlaceholder<IAttribute[]>([]);

// Value is correctly inferred as IAttribute[].
const value = useResolveValueWithPlaceholders(attributesPlaceholder)

// Inference is aware even of resolution array flattening.
// In this case, it's inferred as IAttribute[].
const value = useResolveValueWithPlaceholders([attributesPlaceholder])
```