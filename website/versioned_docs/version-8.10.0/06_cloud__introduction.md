---
title: GoodData Cloud Introduction
sidebar_label: GoodData Cloud Introduction
copyright: (C) 2007-2021 GoodData Corporation
id: version-8.10.0-cloud_introduction
original_id: cloud_introduction
---

**GoodData Cloud** is a solution with a powerful analytics engine, an efficient query language, and a resilient semantic data layer – all built with developers in mind.

## GoodData Cloud and GoodData.UI

GoodData Cloud is an API-first product and comes with a comprehensive REST API that exposes all its functionality.

GoodData.UI builds on top of these REST APIs and encapsulates them in the **Analytical Backend** abstraction that exposes
the analytical capabilities to UI components. GoodData.UI provides several packages that help communicate with GoodData Cloud:

-  `@gooddata/api-client-tiger` is a low-level API client interfacing with the GoodData Cloud REST APIs.
-  `@gooddata/sdk-backend-tiger` is a library that implements the **Analytical Backend** abstraction on top of GoodData Cloud.

All the React components of GoodData.UI are located in the packages prefixed with `@gooddata/sdk-ui-`. These packages use
exclusively the Analytical Backend abstraction and are thus separated from the implementation details of a specific backend.

A typical GoodData.UI application creates and configures an instance of the GoodData Cloud Analytical Backend once and then uses this instance in all React components.

## Get started with GoodData Cloud

You can create a GoodData Cloud account for free at [https://www.gooddata.com/trial/](https://www.gooddata.com/trial/). Your account will come with a demo workspace and data. You can spin up a new application on top of this workspace in less than a minute using our [accelerator toolkit](02_start__using_boilerplate.md), and try GoodData.UI yourself.

**IMPORTANT**: Before you start, check how GoodData.UI supports [specific versions of GoodData Cloud](01_supported_versions.md#compatibility-with-gooddata-cloud). The first version of GoodData.UI that supports GoodData Cloud is 8.10.0.
