---
id: improve_performance
title: Improve Dashboard component's performance
sidebar_label: Improve Dashboard component's performance
copyright: (C) 2022 GoodData Corporation
---

## Caching the backend
While using the Dashboard component, it's recommended to wrap the backend instance with the `withCaching` decorator for better performance. 
The decorator needs settings object to be handed over as a parameter to configure where the cache should be applied and to what size should the cache grow. We have provided the recommended caching options (see `RecommendedCachingConfiguration` within the `@gooddata/sdk-backend-base` package.


### Caching backend configuration options

| Caching option | Description | Recommended setting |
| :--- | :--- | :--- |
| maxExecutions | Maximum number of executions which will have their results cached. | 10 |
| maxResultWindows | Maximum number of execution result's pages to cache PER result. | 5 |
| maxCatalogs | Maximum number of workspaces for which to cache catalogs. | 1 |
| maxCatalogOptions | Catalog can be viewed in many different ways - determined by the options specified during load. | 50 |
| maxSecuritySettingsOrgs | Maximum number of organizations that will have its security settings cached. | 3 |
| maxSecuritySettingsOrgUrls | Maximum number of URLs per organization that will have its validation result cached. | 100 |
| maxSecuritySettingsOrgUrlsAge | Maximum age of cached organization's URL validation results. The value is in milliseconds. | 300 000 |
| maxAttributeWorkspaces | Maximum number of workspaces for which to cache selected workspace attribute service calls. | 1 |
| maxAttributeDisplayFormsPerWorkspace | Maximum number of attribute display forms to cache per workspace. | 100 |
| maxWorkspaceSettings | Maximum number of settings for a workspace and for a user to cache per workspace. | 1 |

