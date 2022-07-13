---
id: version-8.10.0-about_gooddataui
title: About GoodData.UI
sidebar_label: About GoodData.UI
copyright: (C) 2007-2018 GoodData Corporation
original_id: about_gooddataui
---

GoodData.UI is a TypeScript framework for building analytical applications on top of the GoodData platform, GoodData Cloud or GoodData.CN.

GoodData.UI consists of multiple libraries with clear-cut responsibilities ranging from low-level REST API clients up to visualization libraries that deliver React-based components to render different types of charts and tables.

With GoodData.UI, you can:

* Create utility programs that interact directly with the GoodData platform, GoodData Cloud or GoodData.CN APIs (for example, to automate routine
  maintenance and management tasks).

* Create visualizations of data stored on the GoodData platform, GoodData Cloud or GoodData.CN using [visual components](10_vis__start_with_visual_components.md).

* Embed insights created in Analytical Designer using [InsightView](10_vis__insight_view.md).

* Create [new visual components](50_custom__create_new_visualization.md) for your data to address your specific analytical needs.

This documentation is intended for front-end software developers and requires JavaScript knowledge.

## Supported technologies

GoodData.UI is compatible with:

* React >=16.8.0 <18.0.0, [Angular 9+](30_tips__use_angular_2.x.md)
* [TypeScript](02_start__api_maturity.md#typescript-type-considerations) >=4.0.2, ES6, ES5
* Node ^12.15.0 LTS
* [Officially supported browsers](https://help.gooddata.com/pages/viewpage.action?pageId=86775029)

**NOTE:** [Server-side rendering](https://github.com/reduxjs/redux/blob/master/docs/usage/ServerRendering.md) is *not* supported.

### Internet Explorer and mandatory polyfills

#### ES6 polyfill

To run a GoodData.UI application in Internet Explorer 11, you must have the ES6 polyfill. For more information, see the [compatibility table](http://kangax.github.io/compat-table/es6/) and the instructions [here](https://github.com/zloirock/core-js).

If you are using Babel, you can use the [Babel polyfill](https://babeljs.io/docs/usage/polyfill/) in your index to specifically include only the needed polyfill code.

#### CSS variable polyfill

Because Internet Explorer 11 does not support [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/var), add one of the [polyfills](https://github.com/search?q=css+variables+polyfill) to avoid styling issues. We do not recommend any specific polyfill, because you may approach this situation differently (for example, transform variables to static values at build time vs. generate and append CSS classes at runtime). Each approach has certain limitations, so choose the one that best suits your needs.

#### Geo pushpin charts

Starting with GoodData.UI Version 8.8, [geo pushpin charts](10_vis__geo_pushpin_chart_component.md) are not supported in Internet Explorer 11.

## Get GoodData

To use GoodData.UI, you must have an account on the GoodData platform or GoodData Cloud, or an installation of GoodData.CN. You can create a GoodData platform account for free at [https://www.gooddata.com/free/](https://www.gooddata.com/free/), a GoodData Cloud account for free at [https://www.gooddata.com/trial/](https://www.gooddata.com/trial/) or download GoodData.CN at [https://www.gooddata.com/developers/](https://www.gooddata.com/developers/).

## Upcoming features

Take a look at our [Roadmap](01_intro__roadmap.md) to see what new features are coming to GoodData.UI.