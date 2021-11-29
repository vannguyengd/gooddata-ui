---
title: Dashboard Plugins
sidebar_label: Plugins
copyright: (C) 2007-2021 GoodData Corporation
id: dashboard_plugins
---

Dashboard Plugins (plugins) allow developers to create and integrate custom code into GoodData KPI Dashboards. With plugins, you
as a developer can customize and enhance the vanilla dashboard experience available to the dashboard consumers.

The plugins are essential part of the GoodData dashboard stack; check out the [architecture overview](18_dashboard_intro.md#architecture-overview) in the introduction
page to learn more.

## Anatomy of a plugin

In the end the dashboard plugin is an object that implements a contract defined by GoodData and that is built and bundled
in a way supported by the GoodData.UI's Dashboard Loader.

Dashboard plugins are registered into a workspace and from then on they can be used on any number of dashboards. To
facilitate plugin reuse across dashboards, it is furthermore possible to parameterize link between dashboard and plugin.

Note that GoodData.UI provides a CLI tool that handles all the essential boilerplate to get started quick and easy.
This section goes into more detail just to set the foundation.

### Plugin contract and lifecycle

The plugin contract (contract) is described by an interface defined in the `@gooddata/sdk-ui-dashboard` package. You can see the [code here](https://github.com/gooddata/gooddata-ui-sdk/blob/master/libs/sdk-ui-dashboard/src/plugins/plugin.ts).

The contract is versioned to accommodate for potential future breaking changes. However at this moment the only supported version of
the contract is the v1 which we intend to enhance in a backward compatible fashion.

The contract is fairly straightforward and specifies what are the things that you as an author have to provide or implement:

-  properties through which you provide metadata about the plugin
-  optionally implement `onPluginLoaded` lifecycle function; this will be called as the plugin assets are loaded and
   before dashboard initialization

-  implement `register` function; this will be called during dashboard initialization and before `Dashboard` component
   will be mounted. This is where your code has change to register customizations and enhancements

-  optionally implement `onPluginUnload` lifecycle function; this will be called when the `Dashboard` component
   enhanced by your plugin is unmounted

### Build and bundling

GoodData.UI Dashboard Loader relies on [Webpack Module Federation](https://webpack.js.org/concepts/module-federation/) to load and link
plugins at runtime.

The plugin must be built into a bundle that is configured to inherit these dependencies from the context into which it is loaded:

-  all `@gooddata` dependencies except the `@gooddata/sdk-ui-dashboard`
-  `react`, `react-dom` and `react-intl`

Apart form this, plugin can depend on other packages and include custom assets as it sees fit.

Correct build of the plugin is essential to have your plugin load successfully. The plugin template that is part of the
GoodData.UI ships with [default webpack config](https://github.com/gooddata/gooddata-ui-sdk/blob/master/tools/dashboard-plugin-template/webpack.config.js)
that you really should use as a starting point.

### Runtime guarantees and implications

#### Lifecycle

Every time your plugin is loaded to be used on a Dashboard, it will be instantiated exactly once. If implemented, your
`onPluginLoaded`, `register` and `onPluginUnload` will be called once every time a Dashboard that links to your
plugin is loaded.

#### Dependencies

When you build your plugin against a particular version of `@gooddata/sdk-ui-dashboard`, the plugin will be 'locked' to
that version of the Dashboard component. Transitively, any dashboards that link with your plugin will be locked to
that same version of the Dashboard component.

What this means is that any changes and improvements that we do into KPI Dashboards will not be available on the
dashboards enhanced by the plugin until you upgrade your plugin and build it against the latest version of the
`@gooddata/sdk-ui-dashboard`.

We decided to go with this strict behavior in order to give you strong guarantees that plugins enhanced by your
dashboard will work predictably regardless of how we change the vanilla experience.

In the future, we may expand in this area and allow your plugins to automatically follow the latest stable build
of the Dashboard component.

Note: since core dependencies `@gooddata` dependencies are provided to your plugin at runtime, the dashboard enhanced
by your plugin will still benefit from improvements related to insight rendering. The interop of insight rendering
between GoodData Analytical Designer and KPI Dashboard is in place.

### Capabilities

The dashboard customization and enhancement capabilities are exposed to your plugin code via customization APIs. An
instance of the API will be provided to your code at the time of plugin `register`. You can then use those APIs to:

-  add/remove event handlers
-  register custom widget types and React components used to render them
-  place items that will render your custom widgets
-  override React components to use when rendering insights
-  override React components to use when rendering KPIs

Furthermore, your event handlers and React components can use a subset of Model Selector APIs to obtain additional
data from the current dashboard's state.

### Reminder about API Maturity

The Dashboard Plugin and Dashboard Component APIs follow the API Maturity guidelines that we describe [in this document](02_start__api_maturity.md). All
the Plugin APIs and the customization APIs are marked as `@public` and we will not be doing any breaking changes in them.

However the API landscape of the Dashboard component is vast and may be tempting. Going through the code you will find many
interesting API's that are currently in `@alpha` stage.

We cannot prevent you from using `@alpha` APIs, however we have to warn you at this point: using those APIs will most likely
lead to breakage when you try to upgrade your dashboard plugin to use newer version of the `@gooddata/sdk-ui-dashboard`.

### Limitations

-  Plugins are only in effect for consumers in view mode. Plugins are currently not loaded into edit mode.

-  Hosting: at this time, GoodData does not provide hosting for your built plugins. When you build your plugin, you will have to
   host it yourself in a publicly available location that supports HTTPS.

See our [Roadmap](01_intro__roadmap.md) to learn when we want to handle these limitations and feel free to provide
additional feedback.

## Before you start

A minimal setup is needed before your GoodData KPI Dashboards can start using plugins. The setup varies between
GoodData platform and GoodData.CN.

### Configuration on GoodData platform

1.  Ensure that the `dashboardComponentDevRollout` platform setting is set to true on your GoodData domain or at least
    on the workspace where you would like to use the plugins.

    This setting should be turned on already for most GoodData domains but please verify it before proceeding.

2.  Set up hosting for plugins and add it to `dashboardPluginHosts` setting

    This is a security measure. Only your GoodData domain admin can add hosts into `dashboardPluginHosts` list. The
    goal of this setting is to give your domain admin control from where it is possible to load the plugins. This should
    be a trusted and controlled location where only privileged developers can upload plugin artifacts.

    Note: there may be multiple semi-colon separated hosts in this list.

    **IMPORTANT**: Never put untrusted hosts into this list. Always put hosts that are under your organization's
    control and appropriate review and governance. Otherwise you run risk of malicious code leaking your data.

**IMPORTANT LIMITATION**: The dashboard plugins will never load for a user that is a domain admin. For domain admins,
the GoodData KPI Dashboards application will prevent load of any external scripts and assets outside of GoodData
platform.

### Configuration on GoodData.CN

Similar to GoodData platform, you need to set up hosting for your plugins. To enable loading plugins from the hosting
location you need to update the Content Security Policy of your GoodData.CN installation's gateway.

## Getting Started

To easiest and the only recommended way to get started building Dashboard Plugins is using our Plugin Development
Toolkit.

The toolkit comes with an CLI tool that will help you bootstrap a new plugin. To initialize a new plugin run:

```bash
npx @gooddata/plugin-toolkit dashboard-plugin init
```

You will be prompted to enter all the essentials and then the tool with bootstrap a new plugin project for you. This
project will contain a walking skeleton for your plugin including scripts to correctly build the plugin bundles.

The toolkit supports additional actions:

-  add a plugin into a workspace
-  link dashboard with a plugin added into a workspace
-  unlink dashboard from a plugin

Please follow the documentation in your new plugin's README file to learn more. Happy coding.