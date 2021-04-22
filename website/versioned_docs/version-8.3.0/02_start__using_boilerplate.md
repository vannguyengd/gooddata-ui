---
title: Create Your First Application Using Accelerator Toolkit
sidebar_label: Create Your First Application Using Accelerator Toolkit
copyright: (C) 2007-2019 GoodData Corporation
id: version-8.3.0-create_new_application
original_id: create_new_application
---

Create your first analytical application using the **`@gooddata/create-gooddata-react-app`** tool. 

`@gooddata/create-gooddata-react-app` is a CLI-based tool that will guide you through the process of creating the application 
step by step in your terminal application. 

The tool can create an application that will target either the GoodData platform or GoodData.CN. 
The created application is ready for use with none or minimal additional configuration needed from your side.

**NOTE**: By default, the tool creates a new application designated to run on top of the GoodData platform. If you are a
GoodData.CN user, start the tool with an extra `--backend tiger` parameter. Remember that an application correctly
bootstrapped to run on top of GoodData.CN will always depend on `@gooddata/sdk-backend-tiger`.

This is what is going to happen when you run `@gooddata/create-gooddata-react-app`:

1. `@gooddata/create-gooddata-react-app` will download its packages and files to your computer.
2. When completed, it will ask you to select your domain from the list or let you enter your domain name manually.
3. Once you confirm your domain, the tool will install required dependencies and create the structure of your application.
4. It will then prompt you to start your application and will open the welcome page in your browser. The welcome page refer you to Accelerator Toolkit, which will allow you to set up your home dashboard with a test widget.

To start, go to https://github.com/gooddata/gooddata-create-gooddata-react-app, and follow the instructions in the README file. 
The created application contains its own README with further information about configuration, build and deployment options.

**NOTE:** This tutorial assumes that you already have an existing GoodData platform account or a GoodData.CN installation. 
You can create a GoodData platform account for free at [https://www.gooddata.com/free](https://www.gooddata.com/free) or download
GoodData.CN at [https://www.gooddata.com/developers](https://www.gooddata.com/developers).
