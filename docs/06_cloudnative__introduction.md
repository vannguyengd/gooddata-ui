---
title: GoodData.CN Introduction
sidebar_label: GoodData.CN Introduction
copyright: (C) 2007-2021 GoodData Corporation
id: cloudnative_introduction
---

**GoodData.CN** is a deployed solution with a powerful analytics engine, an efficient query language, and a resilient semantic data layer – all built with developers in mind. It is purpose-built to scale with microservices, and you can deploy it in containers next to your data warehouse.

## GoodData.CN and GoodData.UI

GoodData.CN is an API-first product and comes with a comprehensive REST API that exposes all its functionality.

GoodData.UI builds on top of these REST APIs and encapsulates them in the **Analytical Backend** abstraction that exposes
the analytical capabilities to UI components. GoodData.UI provides several packages that help communicate with GoodData.CN:

-  `@gooddata/api-client-tiger` is a low-level API client interfacing with the GoodData.CN REST APIs.
-  `@gooddata/sdk-backend-tiger` is a library that implements the **Analytical Backend** abstraction on top of GoodData.CN.

All the React components of GoodData.UI are located in the packages prefixed with `@gooddata/sdk-ui-`. These packages use
exclusively the Analytical Backend abstraction and are thus separated from the implementation details of a specific backend.

A typical GoodData.UI application creates and configures an instance of the GoodData.CN Analytical Backend once and then uses this instance in all React components.

## Get started with GoodData.CN

You can learn more about and download GoodData.CN Community Edition for free at [https://www.gooddata.com/developers/](https://www.gooddata.com/developers/). You can get started with GoodData.CN Community Edition in minutes and then spin up a new application on top of it using our [accelerator toolkit](02_start__using_boilerplate.md).

**IMPORTANT**: Before you start, check how GoodData.UI supports [specific versions of GoodData.CN](01_supported_versions.md#compatibility-with-gooddatacn). The first version of GoodData.UI that supports GoodData.CN is 8.3.0.
