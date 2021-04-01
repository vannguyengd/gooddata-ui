---
title: Set Up Development on Workstation
sidebar_label: Set Up Development on Workstation
copyright: (C) 2007-2021 GoodData Corporation
id: cloudnative_local_dev
---

The robust authentication setup of GoodData.CN requires careful server-side configuration in order to 
correctly function in cross-origin requests. The all-in-one image installation of GoodData.CN is set up
so that cross-origin requests coming from applications running on `https://localhost:8443` will work correctly.

If you created your application using [accelerator toolkit](02_start__using_boilerplate.md) or followed the instructions in 
[Integrate into an existing application](06_cloudnative__integration.md) then the development environment on your local 
workstation is all set and good to go.

If for some reason you had to deviate from this setup and can not reconfigure the server to get everything aligned,
then this guide can help you get started with local development fast and easy.

**IMPORTANT**: The setup document here is suitable for development purposes only. **Never** use this setup in a production deployment.

The two steps below describe how to switch your application to use API Token for authentication and how to use a 
development proxy to avoid CORS.

## Step 1. Use token authentication provider

Switching the GoodData.CN analytical backend to use token based authentication means using a different
authentication provider. We have created the `TigerTokenAuthProvider` for this purpose:

```javascript
import tigerFactory, {TigerTokenAuthProvider} from "@gooddata/sdk-backend-tiger";

const backend = tigerFactory().withAuthentication(new TigerTokenAuthProvider(process.env.ENV_VARIABLE_WITH_TOKEN));
```

This will ensure that all API calls triggered by the Analytical Backend will send `Authorization` header with `Bearer` token
coming from the `ENV_VARIABLE_WITH_TOKEN` environment variable.

**HINT**: Your application can detect whether it runs in development mode or in production mode and then configure the analytical backend's authentication provider 
to be `TigerTokenAuthProvider` in development or `ContextDeferredAuthProvider` in production. 

## Step 2. Set up a development proxy
 
An often used tactic to overcome CORS is to use a development proxy running on the same origin as the development server. The proxy
will forward all calls to the actual backend servers.

This is the proxy configuration that uses the `http-proxy-middleware`: 

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

You need to make sure that this proxy is included in your development server startup. If you are using Create React App
then create a `setupProxy.js` file in your `src` directory, and the scripts will pick it up. 
