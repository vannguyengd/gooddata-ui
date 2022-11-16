---
id: version-8.3.0-supported_versions
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
| 8 | Generally available | October 8, 2020 | _Not yet defined_ | _Not yet defined_ | _Not yet defined_ | 8.11 |
| 7 | End-of-Support | May 21, 2019 | October 8, 2020 | March 31, 2022 | _Not yet defined_ | 7.9 |
| 6 | End-of-Support | November 1, 2018 | May 21, 2019 | October 8, 2020 | _Not yet defined_ | 6.3 |
| 5 | End-of-Support | April 26, 2018 | November 1, 2018 | May 21, 2019 | _Not yet defined_ | 5.3 |

## Compatibility with GoodData.CN

The following table shows compatibility between GoodData.UI and [GoodData.CN](06_cloudnative__introduction.md).

<style type="text/css">
table tr th, table tr td {min-width:unset;}

.tg  {border-collapse:collapse;border-spacing:10;}
.tg td{ border-color:black;border-style:solid;border-width:1px;font-size:14px;
  overflow:hidden;padding:10px 5px;word-break:normal;}
.tg th{border-color:black;border-style:solid;border-width:1px;font-size:12px;
  font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
.tg .tg-cly1{background-color:#fff;text-align:center;writing-mode: vertical-rl;transform:rotate(180deg);}

.tg .tg-kftd{background-color:#fff;text-align:left;vertical-align:top}
.tg .tg-0lax{text-align:center;vertical-align:top}
.tg .tg-0lax2{background-color:#fff;text-align:center;vertical-align:top}

</style>
<table class="tg">
<thead>
  <tr>
    <th class="tg-0lax" colspan="2" rowspan="2" style="background-color:#fff;border-top-color:#fff;border-left-color:#fff"></th>
    <th class="tg-0lax2" colspan="10">GoodData.UI</th>
  </tr>
  <tr style="background-color:#fff">
    <th class="tg-kftd">8.11.0</th>
    <th class="tg-kftd">8.10.0</th>
    <th class="tg-kftd">8.9.0</th>
    <th class="tg-kftd">8.8.0</th>
    <th class="tg-kftd">8.7.0</th>
    <th class="tg-kftd">8.6.0</th>
    <th class="tg-kftd">8.5.0</th>
    <th class="tg-kftd">8.4.0</th>
    <th class="tg-kftd">8.3.1</th>
    <th class="tg-kftd">8.3.0</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-cly1" rowspan="11" >GoodData.CN</td>
    <td class="tg-kftd" style="background-color:#fff">2.2</td>
    <td class="tg-0lax">✓</td>
    <td class="tg-0lax">✓</td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
  </tr>
  <tr>
    <td class="tg-kftd" style="background-color:#fff">2.1</td>
    <td class="tg-0lax">✓</td>
    <td class="tg-0lax">✓</td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
  </tr>
  <tr>
    <td class="tg-kftd" style="background-color:#fff">2.0</td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax">✓</td>
    <td class="tg-0lax">✓</td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
  </tr>
  <tr>
    <td class="tg-kftd" style="background-color:#fff">1.7</td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax">✓</td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
  </tr>
  <tr>
    <td class="tg-kftd" style="background-color:#fff">1.6</td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax">✓</td>
    <td class="tg-0lax">✓</td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
  </tr>
  <tr>
    <td class="tg-kftd" style="background-color:#fff">1.5</td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax">✓</td>
    <td class="tg-0lax">✓</td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
  </tr>
  <tr>
    <td class="tg-kftd" style="background-color:#fff">1.4</td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax">✓</td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
  </tr>
  <tr>
    <td class="tg-kftd" style="background-color:#fff">1.3</td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax">✓</td>
    <td class="tg-0lax">✓</td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
  </tr>
  <tr>
    <td class="tg-kftd" style="background-color:#fff">1.2</td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax">✓</td>
    <td class="tg-0lax">✓</td>
    <td class="tg-0lax">✓</td>
    <td class="tg-0lax">✓</td>
    <td class="tg-0lax"></td>
  </tr>
  <tr>
    <td class="tg-kftd" style="background-color:#fff">1.1</td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax">✓</td>
    <td class="tg-0lax">✓</td>
    <td class="tg-0lax">✓</td>
    <td class="tg-0lax">✓</td>
    <td class="tg-0lax"></td>
  </tr>
  <tr>
    <td class="tg-kftd" style="background-color:#fff">1.0</td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax"></td>
    <td class="tg-0lax">✓</td>
    <td class="tg-0lax">✓</td>
    <td class="tg-0lax">✓</td>
    <td class="tg-0lax">✓</td>
    <td class="tg-0lax">✓</td>
  </tr>
</tbody>
</table>


The versions of GoodData.UI older than 8.3.0 are not compatible with GoodData.CN.
