---
id: create_custom_attribute_filter
title: Create a Custom Attribute Filter
sidebar_label: Create a Custom Attribute Filter
copyright: (C) 2007-2020 GoodData Corporation
---

To implement a custom attribute filter, you have several options:

## AttributeFilter customization props
This is the best option if you need just a small UI tweaks of the default AttributeFilter component (e.g., render some of its parts in a different way).

Read more about the [customization props](attribute_filter_component#customize-attributefilter-components) or see [the live code example]().

## useAttributeFilterController hook
This is the best option if you need to implement a fully custom UI for the attribute filter. This option requires more coding, but you have a full control over the UI.

It has the identical convenient API as the [AttributeFilter](attribute_filter_component) component - the same input props and the same output props that are available in the [internal context](attribute_filter_component#accessing-internal-attributefilter-context) of the AttributeFilter component.

It works out of the box with other UI.SDK things - [BackendProvider](https://sdk.gooddata.com/gooddata-ui-apidocs/docs/sdk-ui.backendprovider.html), [WorkspaceProvider](https://sdk.gooddata.com/gooddata-ui-apidocs/docs/sdk-ui.workspaceprovider.html) and [visualization definition placeholders](placeholders).

See the [live code example]().

## useAttributeFilterHandler hook
This is the best option if you are using React, but the `useAttributeFilterController` hook does not cover all your requirements and you want access to more low level APIs that offer `IAttributeFilterHandler`.
This option requires more coding but you have a full control over the React integration of the `IAttributeFilterHandler` API.

See the [live code example]().

## IAttributeFilterHandler API
This is the best option if you can't or don't want to use React. It requires the most coding of all the mentioned options, but it also offers the most control for your custom attribute filter implementation.
- It's a framework agnostic JavaScript class, so you can integrate it with any UI framework, or even use it in a headless environment.
- It offers more low level APIs, such as firing custom attribute elements requests and subscription to various events.
- It has support for both multi and single selection.
- It still does a lot of the things for you out of the box - e.g., loading of the attribute metadata and elements selection during the initialization, and much more.

[Explore its interface]() or see the [live code example]().
