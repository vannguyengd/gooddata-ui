---
title: Create Your First Application Using Accelerator Toolkit
sidebar_label: Create Your First Application Using Accelerator Toolkit
copyright: (C) 2007-2019 GoodData Corporation
id: create_new_application
---

Create your first analytical application using the **`@gooddata/create-gooddata-react-app`** tool.

## About `@gooddata/create-gooddata-react-app`

`@gooddata/create-gooddata-react-app` is a CLI-based tool that will guide you through the process of creating the application
step by step in your terminal application.

The tool can create an application that will target either the GoodData platform or GoodData.CN.
The created application is ready for use with none or minimal additional configuration needed from your side.

**NOTE**: By default, the tool creates a new application designated to run on top of the GoodData platform. If you are a GoodData Cloud or GoodData.CN user, start the tool with an extra `--backend tiger` parameter. Remember that an application correctly
bootstrapped to run on top of GoodData Cloud or GoodData.CN will always depend on `@gooddata/sdk-backend-tiger`.

This is what is going to happen when you run `@gooddata/create-gooddata-react-app`:

1. `@gooddata/create-gooddata-react-app` will download its packages and files to your computer.
2. When completed, it will ask you to select your domain from the list or let you enter your domain name manually.
3. Once you confirm your domain, the tool will install required dependencies and create the structure of your application.
4. It will then prompt you to start your application and will open the welcome page in your browser.

### Internet Explorer
Internet Explorer 11 is [no longer supported](https://help.gooddata.com/pages/viewpage.action?pageId=86775029).

## How to use `@gooddata/create-gooddata-react-app`

To start, go to [https://github.com/gooddata/gooddata-create-gooddata-react-app](https://github.com/gooddata/gooddata-create-gooddata-react-app), and follow the instructions in the README file.
The created application contains its own README with further information about configuration, build and deployment options.

**NOTE:** This tutorial assumes that you already have an existing GoodData platform or GoodData Cloud account or a GoodData.CN installation.
You can create a GoodData platform account for free at [https://www.gooddata.com/free/](https://www.gooddata.com/free/), a GoodData Cloud account for free at [https://www.gooddata.com/trial/](https://www.gooddata.com/trial/) or download
GoodData.CN at [https://www.gooddata.com/developers/](https://www.gooddata.com/developers/).

>GoodData.CN 2.2 is not compatible with @gooddata/create-gooddata-react-app@0.21.0
## Third party cookie protection

When you use the `create-gooddata-react-app`, you must **turn off** any 3rd party cookie protections in your browser. 

This is necessary for authentication to work as expected. Some browsers may consider the authentication cookie as a third party cookie (which is basically true, because this cookie is intended for the host that is the target for the proxying requests). 

>Every browser has a special name for this feature. Chrome names this feature *Block third-party cookies*; Firefox names it *Enhanced tracking protection*.