---
title: Dashboard Plugins upgrade guide
sidebar_label: Dashboard Plugins upgrade guide
copyright: (C) 2007-2021 GoodData Corporation
id: dashboard_plugins_upgrade
---

To make sure your Dashboard Plugins are up-to-date with the latest bugfixes and features, it is a recommended practice
to occasionally upgrade them. In this article we the basic steps to achieve this are outlined.

There are two ways of upgrading the plugins: bootstrapping a new plugin or manually performing the necessary steps.

## Bootstrapping a new plugin

The safest way to perform the upgrade currently is to bootstrap a whole new plugin using the following command

```bash
npx @gooddata/plugin-toolkit@latest dashboard-plugin init
```

specifying the same name as your original plugin, and then carrying over the code you have in your plugin.
This will make sure that all the dependencies, configuration, etc. is up to date.

After carrying over your code, you should test your plugin, and then rebuild it and redeploy it to the hosting of your choice.

## Manual upgrade

If for some reason bootstrapping a new plugin is not suitable for you, you can follow these steps to perform the upgrade manually.

### Step 1. Upgrade the @gooddata dependencies

The first step is to upgrade all the `@gooddata` dependencies to the latest stable versions.
To find the current version used in your plugin, check your `package.json` file for the version next to the `"@gooddata/sdk-ui-dashboard"` entry.

To find the latest stable version available, run the following in your terminal:

```bash
npm view @gooddata/sdk-ui-dashboard dist-tags.latest
```

If the latest version is the same as the one you already have, you can move to the next step, your dependencies are already up to date.

Otherwise, replace the current version by the latest version available for all the `@gooddata` packages that have it in the `package.json` file.
Make sure to keep the carets (`^`) in. Finally, run the install command of your package manager of choice:

```bash
# for npm
npm install

# for yarn
yarn install
```

### Step 2. Check for updates in the config files

On occasion, there are some changes needed also in some of the configuration files. To get the appropriate version of the files, use this URL:

```bash
https://github.com/gooddata/gooddata-ui-sdk/blob/vX.Y.Z/tools/dashboard-plugin-template
```

where the `vX.Y.Z` is the version you are upgrading to. Check the files there to see if there are any significant changes compared to your plugin directory.
>**Note:** For webpack.config.js, ignore the potential changes in the `proxy` object keys (e.g. if you have `"/api"` instead of `"/gdc"`, that is fine do not update that).

### Step 3. Test your plugin locally

Run your plugin locally using the `npm start` command and make sure it still behaves the way you wanted.

### Step 4. Build and deploy your plugin

Once you are sure your plugin still works well, build it and deploy it to the hosting you are using for the plugin.
