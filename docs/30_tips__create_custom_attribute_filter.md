---
id: create_custom_attribute_filter
title: Create a Custom Attribute Filter
sidebar_label: Create a Custom Attribute Filter
copyright: (C) 2007-2020 GoodData Corporation
---

To implement a custom attribute filter, you have few options:

## AttributeFilter customization props
This is the best option, it you need just a small UI tweaks of the default AttributeFilter component (eg render some of its parts in a different way).

Read more about the [customization props](attribute_filter_component#customize-attributefilter-components) or see [the live code example]().

## useAttributeFilterController hook
This is the best option if you need to implement fully custom UI for the attribute filter. This option requires a bit more coding, but you have a full control over the UI.

It has identical convenient API as [AttributeFilter](attribute_filter_component) component - same input props and same output props that are available in the [internal context](attribute_filter_component#accessing-internal-attributefilter-context) of the AttributeFilter component.

It works out of the box with other UI.SDK things - [BackendProvider](https://sdk.gooddata.com/gooddata-ui-apidocs/docs/sdk-ui.backendprovider.html), [WorkspaceProvider](https://sdk.gooddata.com/gooddata-ui-apidocs/docs/sdk-ui.workspaceprovider.html) and [visualization definition placeholders](placeholders).

See the [live code example]().

## useAttributeFilterHandler hook
This is the best option if you are using React, but `useAttributeFilterController` hook does not cover all your requirements and you want an access to more low level APIs that offers `IAttributeFilterHandler`.
Note that this option requires more coding but you have a full control over the React integration of the `IAttributeFilterHandler` API.

See the [live code example]().

## IAttributeFilterHandler API
This is the best option if you can't or don't want to use React. It requires the most coding of all the mentioned options, but it also offers the most control for you custom attribute filter implementation.
- It's framework agnostic JavaScript class, so you can integrate it with any UI framework, or even use it in a headless environment.
- It offers more low level APIs, such as firing custom attribute elements requests and subscribtion to various events.
- It has support for both multi or single selection.
- It still does a lot of the thing for you out of the box - eg. loading of the attribute metadata and elements selection during the initialization, and much more.

[Explore its interface]() or see the [live code example]().
