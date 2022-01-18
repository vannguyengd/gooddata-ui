---
id: version-8.4.0-supported_versions
title: Supported Versions and Compatibility
sidebar_label: Supported Versions and Compatibility
copyright: (C) 2007-2021 GoodData Corporation
original_id: supported_versions
---

This article explains how different versions of GoodData.UI go through the life cycle phases and what level of support you can expect when using a specific version.

As a general recommendation, we encourage you to always use the latest available version of GoodData.UI to make the user experience with integrating GoodData.UI as smooth and secure as possible and to ensure that GoodData.UI always uses the latest features of the GoodData platform.

## Life cycle phases

Each version of GoodData.UI goes through the following phases:

1. **General Availability** (GA)
    * **When it starts:** When a major version is publicly released. To get notified about a new version, subscribe to the [Release Notes](https://support.gooddata.com/hc/en-us/sections/203564877).
    * **What it means:** A version in GA is going through active development, receives all new features and bug fixes, which are applied on top of the last minor version.

2. **End-of-Development** (EOD)
    * **When it starts:** When a newer major version is publicly released.
    * **What it means:** A version in EOD receives only security fixes (unless they can be resolved by a SemVer-compatible upgrade) and fixes for critical issues. Only production dependencies receive the security fixes. These fixes are applied on top of the last minor version. No new features are added.

3. **End-of-Support** (EOS)
    * **When it starts:** The date is defined by GoodData.
    * **What it means:** A version in EOS receives neither new features nor bug fixes. No technical support is provided. Although the version is still available for use, we do not recommend that you use it.

4. **End-of-Life** (EOL)
    * **When it starts:** The date is defined by GoodData.
    * **What it means:** A version in EOL is removed from the GoodData platform and is not available for use.

## Status of GoodData.UI versions

The following table provides the lifecycle phases of GoodData.UI versions:

| Major Version | Status | GA | EOD | EOS | EOL | Last Minor Version |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 8 | Generally available | October 8, 2020 | _Not yet defined_ | _Not yet defined_ | _Not yet defined_ | 8.8 |
| 7 | End of Development | May 21, 2019 | October 8, 2020 | March 31, 2022 | _Not yet defined_ | 7.9 |
| 6 | End of Support | November 1, 2018 | May 21, 2019 | October 8, 2020 | _Not yet defined_ | 6.3 |
| 5 | End of Support | April 26, 2018 | November 1, 2018 | May 21, 2019 | _Not yet defined_ | 5.3 |

## Compatibility with GoodData.CN

The following table shows compatibility between GoodData.UI and [GoodData.CN](06_cloudnative__introduction.md).

| GoodData.CN Version | GoodData.UI Compatible Versions |
| :--- | :--- |
| 1.0.0 | 8.3.0 - 8.6.0 |
| 1.0.1 | 8.3.0 - 8.6.0 |
| 1.1.0 | 8.3.1 - 8.6.0 |
| 1.1.1 | 8.3.1 - 8.6.0 |
| 1.2.0 | 8.3.1 - 8.6.0 |
| 1.3.0 | 8.5.0 - 8.6.0 |
| 1.4.0 | 8.6.0 only |
| 1.5.0 | 8.7.0 and newer |
| 1.6.0 | 8.7.0 and newer |

The versions of GoodData.UI older than 8.3.0 are not compatible with GoodData.CN.
