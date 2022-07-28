---
title: Web Components authentication
sidebar_label: Web Components authentication
copyright: (C) 2007-2022 GoodData Corporation
id: webcomponents_authentication
---

You can configure Web Components library to automatically attempt user authentication with GoodData server using
`auth` query parameter in the script URL. If you need more control over the authentication flow, you can also [authenticate
the user programmatically](#programmatic-authentication).

`auth` parameter can take several values depending on what GoodData product you're using (GoodData.CN, Cloud or Platform):

* [`sso`](#gooddatacn-and-gooddata-cloud-sso) - for GoodData.CN and GoodData Cloud SSO
* [`bearSso`](#gooddata-platform-sso) - for GoodData platform SSO
* [`bear`](#gooddata-platform-login) - for GoodData platform login

If `auth` parameter is not provided or takes any value other than `sso`, `bearSso` or `bear`, the library will not
run auto-authentication and will expect you to run [programmatic authentication](#programmatic-authentication).
Meanwhile, all custom elements present on the page will render a loading animation.

> All your users need to have a GoodData account and have access to your GoodData workspace. If some users
> do not have a GoodData account or do not have access to the workspace, see [Grant users access to your workspace].

## Programmatic authentication

If you want to customize the authentication flow, you'll need to provide the authenticated backend by yourself.
Web Components library hosts several more files that you can import to your browser runtime and that expose
backend factories for GoodData.CN, GoodData Cloud and platform.

Custom authentication would look something like this:

```html
<script type="module">
    // Import the library along with `setContext` method
    import { setContext } from "https://example.gooddata.com/components/my-workspace.js";
    // Import Tiger backend for GoodData.CN and GoodData Cloud
    import factory, { ContextDeferredAuthProvider } from "https://example.gooddata.com/components/tigerBackend.js";
    // Or Bear backend for GoodData platform
    // import factory, { ContextDeferredAuthProvider } from "https://example.gooddata.com/components/bearBackend.js";

    function myAuthenticationHandler(authError) {
        // ... define the logic for custom authentication flow
    }
    
    // Set up tiger backend and default workspace id
    setContext({
        backend: factory()
            .onHostname("https://example.gooddata.com")
            .withAuthentication(new ContextDeferredAuthProvider(myAuthenticationHandler)),
        workspaceId: "my-workspace",
        // Optionally, provide a mapbox token to use with Geo pushpin charts
        mapboxToken: "my-mapbox-token",
    });
</script>
```

See our docs for more information on [Tiger authentication] and [Bear authentication].

## Gooddata.CN and GoodData Cloud SSO

Automatic Tiger SSO will run if you add `?auth=sso` parameter to the script URL, for example:

```html
<script type="module" src="https://example.gooddata.com/components/my-workspace.js?auth=sso"></script>
```

It is equivalent of running the following programmatic setup:

```html
<script type="module">
    import { setContext } from "https://example.gooddata.com/components/my-workspace.js";
    import factory, { ContextDeferredAuthProvider, redirectToTigerAuthentication } from "https://example.gooddata.com/components/tigerBackend.js";
    
    setContext({
        backend: factory()
            .onHostname("https://example.gooddata.com")
            .withAuthentication(new ContextDeferredAuthProvider(redirectToTigerAuthentication)),
        workspaceId: "my-workspace",
    });
</script>
```

Whenever a user is not authenticated with the GoodData server, the library will redirect the browser window to the
SSO provider that you configured at GoodData. Once the user is logged in, the SSO provider will redirect the browser window
back to the exact same page it was before the first redirect.

## GoodData Platform SSO

Automatic Bear SSO will run if you add `?auth=bearSso` parameter to the script URL, for example:

```html
<script type="module" src="https://example.gooddata.com/components/my-workspace.js?auth=bearSso"></script>
```

It is equivalent of running the following programmatic setup:

```html
<script type="module">
    import { setContext } from "https://example.gooddata.com/components/my-workspace.js";
    import factory, { ContextDeferredAuthProvider, redirectToBearSsoAuthentication } from "https://example.gooddata.com/components/bearBackend.js";
    
    
    setContext({
        backend: factory()
            .onHostname("https://example.gooddata.com")
            .withAuthentication(new ContextDeferredAuthProvider(redirectToBearSsoAuthentication)),
        workspaceId: "my-workspace",
    });
</script>
```

Whenever a user is not authenticated with the GoodData server, the library will initiate [Service provider-initiated SAML SSO authentication flow].

## GoodData Platform login

Automatic Bear login will run if you add `?auth=bear` parameter to the script URL, for example:

```html
<script type="module" src="https://example.gooddata.com/components/my-workspace.js?auth=bear"></script>
```

It is equivalent of running the following programmatic setup:

```html
<script type="module">
    import { setContext } from "https://example.gooddata.com/components/my-workspace.js";
    import factory, { ContextDeferredAuthProvider, redirectToBearAuthentication } from "https://example.gooddata.com/components/bearBackend.js";
    
    
    setContext({
        backend: factory()
            .onHostname("https://example.gooddata.com")
            .withAuthentication(new ContextDeferredAuthProvider(redirectToBearAuthentication)),
        workspaceId: "my-workspace",
    });
</script>
```

If user is not yet authenticated, the script will redirect the user to /account.html page on the GoodData server and,
upon successful login, back to the original page. Read more about [Bear login].

[Grant users access to your workspace]:30_tips__sso.md#grant-users-access-to-your-workspace
[Tiger authentication]:06_cloudnative__authentication.md
[Bear authentication]:30_tips__sso.md
[Service provider-initiated SAML SSO authentication flow]:30_tips__sso.md#sso-is-implemented-on-your-site
[Bear login]:30_tips__sso.md#sso-is-not-implemented-on-your-site
