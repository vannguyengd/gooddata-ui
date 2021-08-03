---
title: Set Up Development on a Workstation
sidebar_label: Set Up Development on a Workstation
copyright: (C) 2007-2021 GoodData Corporation
id: version-8.3.0-cloudnative_local_dev
original_id: cloudnative_local_dev
---

The robust authentication setup of GoodData.CN requires careful server-side configuration in order to correctly function in cross-origin requests. The installation of the GoodData.CN All-in-One image is set up so that cross-origin requests coming from applications running on `http://localhost:8443` work correctly.

* If you created your application using [accelerator toolkit](02_start__using_boilerplate.md) or followed the instructions in 
[Integrate into an Existing Application](06_cloudnative__integration.md), the development environment on your local workstation is all set and ready for use.
* If for some reason you had to deviate from this setup and cannot reconfigure the server to get everything aligned, do the following:
    1. [Use a token authentication provider](#use-a-token-authentication-provider).
    2. [Set up a development proxy](#set-up-a-development-proxy).

**IMPORTANT!** The setup documented further in this article is suitable for development purposes only. **Never** use this setup in a production deployment.

## Use a token authentication provider

Switching the GoodData.CN analytical backend to use token-based authentication means using a different authentication provider. We have created the `TigerTokenAuthProvider` for this purpose:

```javascript
import tigerFactory, {TigerTokenAuthProvider} from "@gooddata/sdk-backend-tiger";

const backend = tigerFactory().withAuthentication(new TigerTokenAuthProvider(process.env.ENV_VARIABLE_WITH_TOKEN));
```

This ensures that all API calls triggered by the Analytical Backend will send the `Authorization` header with the `Bearer` token coming from the `ENV_VARIABLE_WITH_TOKEN` environment variable.

**HINT:** Your application can detect whether it runs in development mode or in production mode and then configure the Analytical Backend's authentication provider to be `TigerTokenAuthProvider` in development or `ContextDeferredAuthProvider` in production. 

## Set up a development proxy
 
An often used tactic to overcome CORS is to use a development proxy running on the same origin as the development server. The proxy
will forward all calls to the actual backend servers.

This is the proxy configuration that uses `http-proxy-middleware`: 

```javascript
const proxy = require("http-proxy-middleware");

const domain = "<your_installation_hostname_including_schema>";
module.exports = function (app) {
     app.use(proxy("/api", {
         changeOrigin: true,
         cookieDomainRewrite: "localhost",
         secure: false,
         target: domain,
         headers: {
             host: domain.replace(/https:\/\//, ""),
             origin: null,
             "X-Requested-With": "XMLHttpRequest",
         },
         onProxyReq: function(proxyReq, _req, _res) {
             proxyReq.setHeader("accept-encoding", "identity");
         },
     }));
     app.use(proxy("/*.html", {
         "changeOrigin": true,
         "secure": false,
         "target": domain
     }));
     app.use(proxy("/packages/*.{js,css}", {
         "changeOrigin": true,
         "secure": false,
         "target": domain
     }));
 };
```

Make sure that this proxy is included in your development server startup. If you are using Create React App, create a `setupProxy.js` file in your `src` directory, and the scripts will pick it up.
