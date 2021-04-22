---
id: backend_agnostic_apps
title: Building backend-agnostic applications 
sidebar_label: Building backend-agnostic applications
copyright: (C) 2007-2021 GoodData Corporation
---

All GoodData.UI React components use the **Analytical Backend** abstraction to interface with the backend. The purpose of this
abstraction is to hide implementation detail from the application.

We have introduced this layer of abstraction so that existing React components can be reused between the GoodData platform and GoodData.CN. We also use the Analytical Backend abstraction in our own applications: Analytical Designer and Dashboards. Thanks to this, we can have a single codebase that can run on top of either the GoodData platform or GoodData.CN.

This document lists recommended practices that can help you build applications that can run on both the GoodData platform
and GoodData.CN or support one of them but can be refactored to run on the other with minimum effort.

### Stick to using the Analytical Backend services

This is an obvious recommendation: all interactions between your application and backend must go through an instance
of the Analytical Backend. The Analytical Backend SPI is already very comprehensive and likely has services for everything
you may need. 

We do not yet have full documentation of the SPI on this site. However, the SPI is well-structured and documented
code. You can discover the capabilities by browsing the interfaces. Check out the descriptions of the [IAnalyticalBackend](https://github.com/gooddata/gooddata-ui-sdk/blob/master/libs/sdk-backend-spi/src/backend/index.ts) and the [IAnalyticalWorkspace](https://github.com/gooddata/gooddata-ui-sdk/blob/master/libs/sdk-backend-spi/src/workspace/index.ts).

### Isolate any code that uses API client packages

In some cases, you may be forced to use an API client for the GoodData platform or GoodData.CN and make some
calls that are not available through the Analytical Backend SPI.

If you have to do this, we recommend separating and co-locating the platform-specific calls and hiding it behind an interface. You can approach this in several ways:

-  Create an actual interface and implementation for it using the platform-specific calls.
-  Create a function that addresses a particular concern of your application and it does that by using the API client directly.
   
If your application has to work with data returned by the API client, never use the raw response of an API call.
Instead, extract the data that your application needs, and return it in a new structure that is under your control.

There are many ways to approach this. The goal is to never let the direct API calls "pollute" your application. Try to keep the 
imports of `@gooddata/api-client-bear` or `@gooddata/api-client-tiger` in as few files as possible.

If you follow these recommendations, then even if you had to fall back to use direct API calls, they will be all 
concentrated in one place. Switching the Analytical Backend implementation means you know exactly where to go and
what to reimplement.

### Treat object `ref`s opaquely

The Analytical Backend abstraction consistently uses the `ref` properties for entities that may need to be referenced by 
other entities or may be passed by reference to another service.

The type of object stored in `ref` is fully in control of a specific Analytical Backend implementation and matches
the object identification and referencing scheme used by the server. 

The `ref` properties are of the `ObjRef` type, which is a union of `UriRef` and `IdentifierRef`; one of these types will be used
by the backend. If your application has to work with entity identifiers or has to reference entities, it should always do 
so using an instance of `ObjRef`. 

The ideal scenario is that your application obtains and uses an instance of `ObjRef` at runtime from an entity returned by
the Analytical Backend services. The application can then use the `areObjRefsEqual` function from `@gooddata/sdk-model` to test
equality with another instance of `ObjRef`.

In some scenarios though (for example, if your application needs to have a reference to an object at compile time), you will need to hardcode a reference in your application.

If you have to do this, we recommend defining all the `ref`s in a single file and exposing them as constants that the rest of your application uses opaquely:

-  For the GoodData platform and for applications that need to work on top of a number of different workspaces derived from the same master workspace, you must reference objects using their identifier and use the `idRef` factory function to create an instance of `ObjRef`.
-  For the GoodData platform and applications that will always target a single workspace, you can reference objects by their URI and use the `uriRef` factory function to create an instance of `ObjRef`.
-  For GoodData.CN, you must reference objects using their identifier and type and use the `idRef` factory function and pass the type as the second parameter.
   
If you follow these recommendations, then even if you had to hardcode references to entities in your application, they
will be all in one place and all under well-named constants.
