---
title: Embed a Dashboard Created in KPI Dashboards
sidebar_label: Embed a Dashboard Created in KPI Dashboards
copyright: (C) 2007-2021 GoodData Corporation
id: embed_dashboard
---

To embed an existing dashboard created in KPI Dashboards, use the [DashboardView component](10_vis__dashboard_view.md).

**Steps:**

1. Obtain the identifier of the dashboard via [catalog-export](02_start__catalog_export.md).

2. Import the DashboardView component from the `@gooddata/sdk-ui-ext` package into your app:

    ```javascript
    import { DashboardView } from "@gooddata/sdk-ui-ext";
    ```

3. Create a `DashboardView` component in your app, and provide it with the project ID and the visualization identifier that you obtained at Step 1:

    ```jsx
    import { DashboardView } from "@gooddata/sdk-ui-ext";
    import "@gooddata/sdk-ui-ext/styles/css/main.css";

    <DashboardView dashboard="aby3polcaFxy" />;
    ```

## Edit mode

The DashboardView component itself does not support editing of the dashboards. However, you can use the Embedded KPI Dashboard application to edit the dashboards and then use DashboardView to view them.

**NOTE:** The following example will **not** make sure that the custom filters you may have set for DashboardView will be reflected in the embedded KPI Dashboards. To do that, use the [postMessages API](https://help.gooddata.com/pages/viewpage.action?pageId=81968283). In addition, any customization you may have set using the [customizations](10_vis__dashboard_view.md#customizations) will **not** be applied to the embedded KPI Dashboards.

```jsx
import React, { useCallback, useEffect, useState } from "react";
import { DashboardView, clearDashboardViewCaches } from "@gooddata/sdk-ui-ext";
import { useWorkspace } from "@gooddata/sdk-ui";
import { EmbeddedKpiDashboard } from "@gooddata/sdk-embedding";

const dashboardId = "<dashboard-id>";
const backendUrl = "<backend-url>";

const containerStyle = {
    width: 1200, // set to at least 1170px, otherwise edit mode of KPI Dashboards will not work properly
    height: 800, // set a fixed height to prevent layout shifts when switching to and from edit mode
};

const DashboardViewEditExample = () => {
    const [isEditing, setIsEditing] = useState(false);
    const workspace = useWorkspace();

    const listener = useCallback((e) => {
        const type = e.data.gdc?.event.name;

        if (type === EmbeddedKpiDashboard.GdcKdEventType.DashboardSaved) {
            // this means the user has made some changes and saved them
            // clear cache to make sure the dashboard is reloaded...
            clearDashboardViewCaches();
            // ... and switch back to view mode
            setIsEditing(false);
        } else if (type === EmbeddedKpiDashboard.GdcKdEventType.SwitchedToView) {
            // this means the user did not save the changes and clicked the "Cancel" button
            // so we just switch back to view mode
            setIsEditing(false);
        }
    }, []);

    useEffect(() => {
        // when switching to edit mode, attach an event listener to detect when the user is done with their edits
        // and we remove the listener when switching back
        if (isEditing) {
            window.addEventListener("message", listener, false);
        } else {
            window.removeEventListener("message", listener, false);
        }

        // clean up when this component is unmounted
        return () => window.removeEventListener("message", listener, false);
    }, [isEditing]);

    return (
        <div style={containerStyle}>
            {isEditing ? (
                {/*
                    - we use an iframe with a special URL constructed from the dashboard data
                      (the "?mode=edit" will make sure the KPI Dashboards will open directly in edit mode)
                    - we make sure it fills the whole parent container by setting the size to 100%
                */}
                <iframe
                    src={`${backendUrl}/dashboards/embedded/#/project/${workspace}/dashboard/${dashboardId}?mode=edit`}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                />
            ) : (
                <React.Fragment>
                    <button onClick={() => setIsEditing(true)}>
                        Edit dashboard using embedded KPI Dashboards
                    </button>
                    <DashboardView dashboard={dashboardId} />
                </React.Fragment>
            )}
        </div>
    );
};
```
