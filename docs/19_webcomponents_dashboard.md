---
title: Dashboard custom element
sidebar_label: Dashboard custom element
copyright: (C) 2007-2022 GoodData Corporation
id: webcomponents_dashboard
---

You can embed view-only GoodData dashboard into your application using `gd-dashboard` custom element, like so:

```html
<!-- minimal setup -->
<gd-dashboard dashboard="my-dashboard-id"></gd-dashboard>
```

## Supported attributes

```html
<!-- all supported attributes -->
<gd-dashboard
    dashboard="my-dashboard-id"
    workspace="my-workspace-id"
    locale="en_US"
    readonly
></gd-dashboard>
```

* `dashboard` - mandatory, an ID of the dashboard to embed.
* `workspace` - optional, an ID of the workspace for this dashboard. By default, it's taken from the context
    (e.g. from the script URL).
* `locale` - optional, defaults to `en-US`. The localization of the visualization. For available languages,
    see [the full list of available localizations].
* `readonly` - optional, if enabled, the dashboard will be embedded in read-only mode disabling any user interaction
  that would alter any backend state (disabling creating/changing alerts, creating scheduled emails, and so on).

You can also provide a workspace id on the context level instead of passing it
as an attribute to every dashboard. See a code example of the [Web Components authentication] article.

Note, that locale property affects only the UI elements and not your data or metadata language.

## Supported events

`gd-dashboard` emits [the same events as the Dashboard component].
Events **do not bubble** and **are not cancelable**. Here is how you can subscribe to one from your code:

```html
<gd-dashboard dashboard="my-dashboard-id" id="some-dom-id"></gd-dashboard>
<script>
    const dashboardEl = document.getElementById("some-dom-id");
    dashboardEl.addEventListener("GDC.DASH/EVT.INITIALIZED", (event) => {
        // See what's in the event payload
        console.log(event.detail);
    });
</script>
```

[the full list of available localizations]:https://github.com/gooddata/gooddata-ui-sdk/blob/master/libs/sdk-ui/src/base/localization/Locale.ts
[Web Components authentication]:19_webcomponents_authentication.md#programmatic-authentication
[the same events as the Dashboard component]:https://sdk.gooddata.com/gooddata-ui-apidocs/docs/sdk-ui-dashboard.dashboardeventtype.html
