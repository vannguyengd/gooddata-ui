---
id: version-8.3.0-platform_intro
title: GoodData Platform Introduction
sidebar_label: GoodData Platform Introduction
copyright: (C) 2007-2018 GoodData Corporation
original_id: platform_intro
---

The **GoodData platform** is a powerful end-to-end analytics platform as a service with multi-tenant distribution that scales to hundreds of terabytes of data and hundreds of thousands of users. Learn more about the [GoodData platform](https://help.gooddata.com/pages/viewpage.action?pageId=34341327) and how to [embed its analytics possibilities](https://help.gooddata.com/pages/viewpage.action?pageId=34340962).

## GoodData platform and GoodData.UI

The GoodData platform comes with a comprehensive REST API that exposes all its functionality.

GoodData.UI builds on top of these REST APIs and encapsulates them in the **Analytical Backend** abstraction that exposes
the analytical capabilities to UI components. GoodData.UI provides several packages that help communicate with the GoodData platform:

-  `@gooddata/api-client-bear` is a low-level API client interfacing with the GoodData platform REST APIs.
-  `@gooddata/api-model-bear` is a companion library for the API client and contains TypeScript type definitions.
-  `@gooddata/sdk-backend-bear` is a library that implements the **Analytical Backend** abstraction on top of the GoodData platform.

All the React components of GoodData.UI are located in the packages prefixed with `@gooddata/sdk-ui-`. These packages use exclusively the Analytical Backend abstraction and are thus separated from the implementation details of a specific backend.

A typical GoodData.UI application creates and configures an instance of the GoodData platform Analytical Backend once and then uses this instance in all React components.

## Get started with the GoodData platform Freemium plan

You can create a GoodData platform account for free at [https://www.gooddata.com/free/](https://www.gooddata.com/free/). Your account will come with a demo workspace and data. You can spin up a new application on top of this workspace in less than a minute using our [accelerator toolkit](02_start__using_boilerplate.md), and try GoodData.UI yourself.
