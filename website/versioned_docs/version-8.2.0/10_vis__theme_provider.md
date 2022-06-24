---
title: Theme Provider
sidebar_label: Theme Provider
copyright: (C) 2007-2020 GoodData Corporation
id: version-8.2.0-theme_provider
original_id: theme_provider
---

The **Theme Provider component** allows you to customize the visual style of your dashboards by applying a theme (see [Create Custom Themes](https://help.gooddata.com/pages/viewpage.action?pageId=86794481)).

To be able to use the Theme Provider component, set up the `backend` and `workspace` properties in your application (see [Connecting to an Analytical Backend](02_start__connecting_backend.md#initial-setup)).

**NOTE:** Always use the Theme Provider component in the root of your application. A theme is applied globally to everything on a page. When you wrap one visual component with a `ThemeProvider` element, everything else will also be themed despite not being wrapped with the `ThemeProvider` element.

## Using the Theme Provider component with backend and workspace providers

When using the Theme Provider component with backend and workspace providers, you do not need to specify any additional props for your Theme Provider.

```jsx
import { BackendProvider, WorkspaceProvider } from "@gooddata/sdk-ui";
import { ThemeProvider } from "@gooddata/sdk-ui-theme-provider";

<BackendProvider backend={backend}>
    <WorkspaceProvider workspace="your-workspace-id">
        <ThemeProvider>
            <Application {...}>
        </ThemeProvider>
    </WorkspaceProvider>
</BackendProvider>
```

## Using the Theme Provider component without backend and workspace providers

When using the Theme Provider component without backend and workspace providers, you have to pass the `backend` and `workspace` props to your Theme Provider.

```jsx
import { ThemeProvider } from "@gooddata/sdk-ui-theme-provider";

<ThemeProvider backend={backend} workspace="your-workspace-id">
    <Application {...}>
</ThemeProvider>
```

## Using the Theme Provider component with a custom theme

You can create properties of a custom theme and pass the theme to the `ThemeProvider` element that you added to your application (for all available properties, see the [declaration of ITheme](https://github.com/gooddata/gooddata-ui-sdk/blob/master/libs/sdk-model/src/theme/index.ts#L765)).

```jsx
import { ThemeProvider } from "@gooddata/sdk-ui-theme-provider";

<ThemeProvider theme={customTheme}>
    <Application {...}/>
</ThemeProvider>

```

```jsx
import { ITheme } from "@gooddata/sdk-backend-spi";

export const customTheme: ITheme = {
  button: {
    borderRadius: "15",
    dropShadow: true,
    textCapitalization: true,
  },
  modal: {
    borderColor: "#1b4096",
    borderRadius: "5",
    borderWidth: "2",
    dropShadow: false,
    outsideBackgroundColor: "#e8cda2",
    title: {
      color: "#1b4096",
      lineColor: "#000",
    },
  },
  palette: {
    error: {
      base: "#ff2e5f",
    },
    primary: {
      base: "#eba12a",
    },
    success: {
      base: "#13ed4d",
    },
    warning: {
      base: "#ddff19",
    },
  },
  tooltip: {
    backgroundColor: "#101050",
    color: "#fff",
  },
  typography: {
    font:
      "url(https://cdn.jsdelivr.net/npm/roboto-font@0.1.0/fonts/Roboto/roboto-regular-webfont.ttf)",
    fontBold:
      "url(https://cdn.jsdelivr.net/npm/roboto-font@0.1.0/fonts/Roboto/roboto-bold-webfont.ttf)",
  },
};
```

## Example

```jsx
import { ThemeProvider } from "@gooddata/sdk-ui-theme-provider";

<div>
  <ThemeProvider>
    <BubbleHoverTrigger>
      <Button
        tagName="span"
        value="Hover over this link..."
        className="gd-button-link"
      />
      <Bubble className="bubble-primary">
        This is bubble content.
        <br />
        <Button value="Click here!" className="gd-button-positive" />
      </Bubble>
    </BubbleHoverTrigger>
  </ThemeProvider>
</div>
```
