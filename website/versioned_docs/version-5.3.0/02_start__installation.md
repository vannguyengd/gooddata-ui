---
title: Installation
sidebar_label: Installation
copyright: (C) 2007-2018 GoodData Corporation
id: version-5.3.0-installation
original_id: installation
---

This article describes how to install GoodData.UI React components and a few steps to accomplish before you can start creating your visualizations.

**NOTE:** Before you install GoodData.UI, make sure that you have a GoodData account (see [About GoodData.UI](01_intro__about_gooddataui.md#supported-technologies)).

## Installation

Run the following:

```bash
yarn add @gooddata/react-components
```

```bash
$ npm install @gooddata/react-components
```
## Before you start coding

1. Get your **workspace ID**. The workspace ID is a unique 32-character identifier of your workspace within the GoodData platform. You need your workspace ID to connect your workspace with the visualizations that you are going to create. To get your workspace ID, see [Find the Workspace ID](https://help.gooddata.com/pages/viewpage.action?pageId=86796773).
2. Obtain **object identifiers** using [gdc-catalog-export](02_start__catalog_export.md). The object identifier is a reference to a workspace object. You need the identifiers to display attributes, measures, visualizations, filters, and other objects.
    
    The identifier of an object is consistent across your domain regardless of the GoodData workspace it lives in. The object identifier is a text string. Example: `franchiseFeesAdRoyaltyIdentifier`
3. Pick a **visualization type** from the prepared React components (table, column chart, bar chart, and so on) and, optionally, one or more properties to use with the selected visualization. Alternatively, you can fetch raw data and create a fully custom visualization.
