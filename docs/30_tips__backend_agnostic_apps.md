---
id: backend_agnostic_apps
title: Building backend-agnostic applications 
sidebar_label: Building backend-agnostic applications
copyright: (C) 2007-2021 GoodData Corporation
---

All GoodData.UI React components use the **Analytical Backend** abstraction to interface with the backend. The purpose of this
abstraction is to hide implementation detail from the application.

We have introduced this layer of abstraction so that it is possible to reuse existing React components between GoodData Platform
and GoodData Cloud Native. We also use the analytical backend abstraction in our own applications - Analytical Designer and KPI Dashboards.
Thanks to this we can have a single codebase that can run on top of either GoodData Platform or GoodData Cloud Native.

This document lists recommended practices that can help you to build applications that can run on both GoodData Platform
and GoodData Cloud Native or support just one of them but can be refactored with minimum effort to run on the other.

### Stick to using Analytical Backend services

This is an obvious recommendation: all interactions between your application and backend must go through an instance
of Analytical Backend. The Analytical Backend SPI is already very comprehensive and likely has services for everything
you may need. 

We do not yet have full documentation of the SPI on this site, however the SPI is a well-structured and documented
code; you can discover the capabilities by browsing the interfaces. Check out the descriptions of the [IAnalyticalBackend](https://github.com/gooddata/gooddata-ui-sdk/blob/master/libs/sdk-backend-spi/src/backend/index.ts)
and the [IAnalyticalWorkspace](https://github.com/gooddata/gooddata-ui-sdk/blob/master/libs/sdk-backend-spi/src/workspace/index.ts).

### Isolate any code that uses API client packages

In some cases you may be forced to use an API client for GoodData Platform or GoodData Cloud Native and make some
calls that are not available through the Analytical Backend SPI.

If you have to do this we recommend separating and co-locating the platform-specific calls. It is also ideal to hide
it behind an interface. You can approach this in several ways: 

-  Create an actual interface and implementation for it using the platform-specific calls
-  Create a function that addresses a particular concern of your application, and it does that by using
   the API client directly
   
If your application has to work with data returned by the API client, never use the raw response of an API call.
Instead, extract the data that your application needs and return it in a new structure that is under your control.

There are many ways to approach this. The goal is to never let the direct API calls 'pollute' your application. Try to keep the 
imports of `@gooddata/api-client-bear` or `@gooddata/api-client-tiger` in as few files as possible.

If you follow these recommendations, then even if you had to fall back to use direct API calls, they will be all 
concentrated in one place. Switching the analytical backend implementation means you know exactly where to go and
what to reimplement.

### Treat object `ref`s opaquely

The Analytical Backend abstraction consistently uses the `ref` properties for entities that may need to be referenced by 
other entities or may be passed by reference to another service.

The type of object stored in `ref` is fully in control of the concrete Analytical Backend implementation and matches
the object identification and referencing scheme used by server. 

The `ref` properties are of type `ObjRef` which is a union of `UriRef` and `IdentifierRef` - one of these types will be used
by the backend. If your application has to work with entity identifiers or has to reference entities it should always do 
so using an instance of `ObjRef`. 

The ideal scenario is that your application obtains and uses an instance of `ObjRef` at runtime from an entity returned by
the analytical backend services. The application can then use `areObjRefsEqual` function from `@gooddata/sdk-model` to test
equality with another instance of `ObjRef`.

In some scenarios though - for example if your application needs to have a reference to an object at compile time - you will need to hardcode a reference in your application. 

If you have to do this, then we recommend defining all the `ref`s in a single file and expose them as constants that
the rest of your application uses opaquely:

-  For GoodData Platform and for applications that need to work on top of a number of different workspaces derived from the 
   same master workspace, you must reference objects using their identifier and use the `idRef` factory function to create
   an instance of `ObjRef`
-  For GoodData Platform and applications that will always target just a single workspace, you can reference objects by
   their URI and use `uriRef` factory function to create an instance of `ObjRef`
-  For GoodData Cloud Native you must reference objects using their identifier and type and use the `idRef` factory
   function and pass the type as the second parameter
   
If you follow these recommendations that even if you had to hardcode references to entities in your application, they
will be all in one place and all under well-named constants.


