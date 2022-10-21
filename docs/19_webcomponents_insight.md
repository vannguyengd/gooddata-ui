---
title: Insight custom element
sidebar_label: Insight custom element
copyright: (C) 2007-2022 GoodData Corporation
id: webcomponents_insight
---

You can embed a single insight into your application using `gd-insight` custom element, like so:

```html
<!-- minimal setup -->
<gd-insight insight="my-insight-id"></gd-insight>
```

> Note, the `gd-insight` element is using flex layout and will adjust to the size of its container. If the container
> does not have `display` property set to `flex`, the widget will have a zero height. You can also define the element
> height explicitly with CSS, for example using inline `style` attribute: `style="height:500px"`.

## Supported attributes

```html
<!-- all supported attributes -->
<gd-insight
    insight="my-insight-id"
    workspace="my-workspace-id"
    locale="en_US"
    title="Custom insight title"
></gd-insight>
```

* `insight` - mandatory, an ID of the insight to embed.
* `workspace` - optional, an ID of the workspace for this dashboard. By default, it's taken from the context
  (e.g. from the script URL).
* `locale` - optional, defaults to `en-US`. The localization of the visualization. For available languages,
    see [the full list of available localizations].
* `title` - optional, if provided as a boolean shortcut attribute, will render the insight title. If provided as a string,
    will override the default value and render the visualization with that string.

```html
<!-- with no `title` attribute, the title will not be rendered -->
<gd-insight insight="my-insight"></gd-insight>

<!-- with boolean `title` attribute, the title will be loaded from server and rendered above the visualization -->
<gd-insight insight="my-insight" title></gd-insight>

<!-- with string `title` attribute, the title will be overridden and rendered above the visualization -->
<gd-insight insight="my-insight" title="My custom attribute title"></gd-insight>
```

You can also provide a workspace id on the context level instead of passing it
as an attribute to every dashboard. See a code example of the [Web Components authentication] article.

Note, that locale property affects only the UI elements and not your data or metadata language.

## Supported events

`gd-insight` emits the following events:

* `drill` - when drill is initiated by the user.
* `error` - an error occurred while evaluating the data for the insight.
* `exportReady` - user requested the export, and it's now ready.
* `loadingChanged` - loading state of the insight has changed.
* `insightLoaded` - insight data is fully loaded.

Events **do not bubble** and **are not cancelable**. For more info on the event payload, see callback description of
[the InsightView component].

You can subscribe to the events same way as to any other DOM event:

```html
<gd-insight insight="my-insight" id="some-dom-id"></gd-insight>
<script>
    const insightEl = document.getElementById("some-dom-id");
    insightEl.addEventListener("drill", (event) => {
        // See what's in the event payload
        console.log(event.detail);
    });
</script>
```

[the full list of available localizations]:https://github.com/gooddata/gooddata-ui-sdk/blob/master/libs/sdk-ui/src/base/localization/Locale.ts
[the InsightView component]:https://sdk.gooddata.com/gooddata-ui/docs/visualization_component.html#properties
[Web Components authentication]:19_webcomponents_authentication.md#programmatic-authentication
