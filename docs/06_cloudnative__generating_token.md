---
title: Generating authentication token
sidebar_label: Generating authentication token
copyright: (C) 2007-2022 GoodData Corporation
id: cloudnative_generating_auth_token
---

To use OpenID Connect (OIDC) Identity Provider may not be convenient if you want to use the **GoodData.CN** API from the 
command line. For this use cases, you can issue and API Token and then use it for accessing **GoodData.CN**
resources.

To generate the **GoodData.CN** API token, you can either submit a POST request to `/api/entities/users/{:userId}/apiTokens` or you can use 
the valid authenticated session.

### Submitting POST request

In the `Authorization` header of the request described below, provide the value of a different token. You can use either another's users
API token or the [GDC_API_TOKEN](https://www.gooddata.com/developers/cloud-native/doc/1.7/administration/auth/bootstrap-token/). Do not forget
to replace the URL with the actual location with your **GoodData.CN** installation.

```
curl --request POST -H 'Content-type: application/vnd.gooddata.api+json' \
    -H 'Authorization: Bearer <other-token>' \
    -d '{"data":{"id":"mynewtoken","type":"apiToken"}}' \
    https://analytics.alpha.example.com/api/entities/users/john.doe/apiTokens | \
  jq data.attributes.bearerToken
```

To make this command work, you need to have [curl](https://curl.se/) and [jq](https://stedolan.github.io/jq/download/) installed on your computer.

### Using valid authenticated session

To generate the API Token through the valid authenticated session, follow these steps: 

1. Open a web browser with an authenticated session to the Organization's pages
2. Open the browser's Developer tools
3. Use following command where `{userId}` will be replaced with your actual User ID

```
fetch('/api/entities/users/{userId}/apiTokens', {
method: 'POST',
body: JSON.stringify({
  data: {
    id: 'mynewtoken',  // provide a unique ID of the API token
    type: 'apiToken'
  }
}),
headers: {
  'Content-type': 'application/vnd.gooddata.api+json'
}
})
.then(res => res.json())
.then(data => console.log(`Your new API token is ${data.data.attributes.bearerToken}`));
```

The generated API token looks similar to the following:

`am9obi5kb2U6bXluZXd0b2tlbjptbElGWGg1WkJ5K1YzRmFtdHhaYjhsUTU4aXIwS2svWQ==`

## Using generated API Token

To use your new API Token, add the `Authorization: Bearer <YOUR_API_TOKEN>` header to your HTTP requests. See [TigerTokenAuthProvider class](https://github.com/gooddata/gooddata-ui-sdk/blob/6c02df0d35687dc60ea0de5f3b8a2fdf62fa9760/libs/sdk-backend-tiger/src/auth.ts#L98) to learn more about API Token authentication.

If you are interested in the API tokens security, check [this page](https://www.gooddata.com/developers/cloud-native/doc/1.7/administration/auth/oidc-cookies/)