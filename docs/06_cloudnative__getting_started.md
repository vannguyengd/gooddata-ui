---
title: Getting started
sidebar_label: Getting started
copyright: (C) 2007-2022 GoodData Corporation
id: cloudnative_getting_started
---

**GoodData.CN** is a deployed solution with a powerful analytics engine, an efficient query language, and a resilient semantic data layer – all built with developers in mind. It is purpose-built to scale with microservices, and you can deploy it in containers next to your data warehouse.

## GoodData.UI packages for GoodData.CN

| Package | Reason |
|---------|-----------------|
| sdk-backend-tiger | Allows developer to communicate with GoodData.CN backend without low-level details concerns |
| api-client-tiger  | Thin REST API for GoodData.CN |

### sdk-backend-tiger

The [@gooddata/sdk-backend-tiger](https://www.npmjs.com/package/@gooddata/sdk-backend-tiger) package provides a convenient way to communicate with Analytical Backend for GoodData.CN.

The functionality includes following:

- authentication functions (setting correct authentication provider, authentication checks, authentication, de-authentication), see [authentication](06_cloudnative__authentication.md).
- telemetry settings for component usage tracking
- getting and creating metadata objects
- running executions
- getting available workspaces
- creating new users

### GoodData.CN backend capabilities

| Capability                       | Description                       |
| -------------------------------- | --------------------------------- |
| hasTypeScopedIdentifiers         | Type scoped identifiers are unique on type level only, therefor both `identifier` as well as `type` must be provided while using `IdentifierRef` |
| canCalculateGrandTotals          | Backend is capable to calculate and include grand totals in the resulting data view. |
| maxDimensions                    | Can produce 2 result dimensions |
| supportsRankingFilter            | Supports Ranging Filters |
| supportsExplain                  | Supports downloading of files used for debugging | 
| usesStrictAccessControl          | Access to restricted MD object is possible only with proper permissions. The object is not reachable without these permission event if you know the object's URI |
| allowsInconsistentRelations      | Allows objects with broken references |

### api-client-tiger

The [@gooddata/api-client-tiger](https://www.npmjs.com/package/@gooddata/api-client-tiger) provides an easy way to perform specific low-level tasks targeting the platform on GoodData.CN backend, e.g.: 

- AFM executions
- Filtering
- MetaData utilities

It is highly recommended to use this API only if there is no higher-level components or abstraction convenient enough for you to use.

## Where to continue

- [InsightView component](10_vis__insight_view.md) - The InsightView component is a generic component that renders insights created and saved by Analytical Designer.
- [Dashboard component](18_dashboard_component.md) - Using this component, we aim to address creation and consumption of rich, interactive, and responsive dashboards.
- [Catalog export](02_start__catalog_export.md) - Exports a list of catalog items and date datasets from a GoodData workspace into JavaScript or TypeScript code.
- [Custom executions](50_custom__execution.md) - An execution is a combination of attributes, measures, and filters that describes what data you want to calculate.