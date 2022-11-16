---
title: Introduction to GoodData Web Components
sidebar_label: Introduction to GoodData Web Components
copyright: (C) 2007-2022 GoodData Corporation
id: version-8.11.0-webcomponents_intro
original_id: webcomponents_intro
---

Starting from version 2.2.0, GoodData.CN includes a Web Components library that you can import into your application
to embed dashboards or individual insights. The library is also hosted at GoodData Cloud.

> Currently, we do not provide the WebComponents library for GoodData Platform.

The Web Components library is a thin wrapper around the [InsightView][1] and [Dashboard][2] components. While keeping the embedding easy, it allows a high level of integration with the host application. 

In the simplest form, the integration could look something like this:

```html
<script type="module" src="https://example.gooddata.com/components/my-workspace-id.js?auth=sso"></script>

<gd-dashboard dashboard="my-dashboard-id"></gd-dashboard>
<gd-insight insight="my-insight-id"></gd-insight>
```

> The **Web Components** library is using **GoodData.UI** under the hood. 
>
>It is loading React and all the necessary dependencies. However, it runs in the isolated scope that will not conflict with other JavaScript running in your app.

## Choosing the right embedding option

GoodData provides several options for embedding, such as **iframe embedding** for dashboards or the  **GoodData.UI React library** for dashboards and insights. The Web Components library is the middle ground between those two options. It is
more flexible than iframe embedding, yet simpler to integrate comparing to the React library. 

### When to use Web Components library?

* You do not want to use **iframe embedding** to avoid an overhead it creates or due to the security and compliance requirements of your company.
* You want to embed **a single insight**, but the iframe embedding only works for a complete dashboard.
* You are using **Angular**, **Vue** or any other non-React framework for the host application.
* You are using **a specific version of React** in your application, that is not compatible with GoodData.UI.

### When to use an iframe instead?

If you want the simplest possible dashboard embedding and do not require deep integration between the host application
and the dashboard, consider using iframe instead of Web Components.

### When to use GoodData.UI React library instead? 

If the host application is already written in React, consider using GoodData.UI instead of Web Components. It is more
flexible and provides a much better developer experience. You also avoid loading two instances of React and ReactDOM.

## Integration

### Prerequisites

Since Web Components is a relatively new technology, the library will not work in older browsers, such as
**Internet Explorer**. To be precise, refer to the
<a href="https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry#browser_compatibility" target="_blank">Custom Elements</a> and
<a href="https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot#browser_compatibility" target="_blank">Shadow DOM</a> browser compatibility sections on MDN.

You will also need to set up a **CORS configuration** on the GoodData server instance to allow the script from your application
domain to make network requests to the GoodData server. Refer to the CORS configuration sections in [GoodData.CN][3] and
[GoodData Cloud][4] documentation.

### Load the library

To integrate the library into your app, add a script tag with the correct URL to the `<head>`
section of your web page.

```html
<script type="module" src="https://{your-gd-server-url}/components/{workspace-id}.js?auth=sso"></script>

<!-- for example -->
<script type="module" src="https://example.gooddata.com/components/my-workspace.js?auth=sso"></script>
```

The script **must be** of the type `module`, as we are using JavaScript modules for this distribution.

The library will parse its own URL to pre-configure and allow you to skip the boilerplate code:
* The domain name `{your-gd-server-url}` must be the domain of your GoodData.CN server or the GoodData Cloud instance. 
    This is the domain where the script will be loaded from as well as the domain that will be used to load your insight and dashboard data. You cannot load the script from one instance to use it with data from another instance.
    **At the moment it's not possible to connect to several GoodData instances from a single runtime.**
* The `{workspace-id}` is the ID of the default workspace from where the library will be loading your insights and dashboards.
    It is possible to override this value for a specific insight or dashboard.
* The `auth` query parameter is optional. When provided, the library will authenticate the user automatically.
    See [Web Components Authentication][5] for more details.

### Embed insights and dashboards

Once the library is loaded to the application runtime, it will register two custom elements that you can use anywhere
on the page:

* `<gd-dashboard />` for [dashboard embedding][6].
* `<gd-insight />` for [insight embedding][7].

[1]:10_vis__insight_view.md
[2]:18_dashboard_component.md
[3]:https://www.gooddata.com/developers/cloud-native/doc/latest/manage-deployment/set-up-organizations/set-up-cors-for-organization/
[4]:https://www.gooddata.com/developers/cloud-native/doc/cloud/manage-deployment/set-up-organizations/set-up-cors-for-organization/
[5]:19_webcomponents_authentication.md
[6]:19_webcomponents_dashboard.md
[7]:19_webcomponents_insight.md
