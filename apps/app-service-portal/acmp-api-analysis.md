#

## ACMP API usage in Service Portal

This document summarizes how the service portal currently calls the legacy `@repo/lib-api-client` ACMP methods, including HTTP method, URL, and path/query/body parameters.

### getAcmpClients

**HTTP method**: `GET`  
**Endpoint**: `/acmp-service/instances/{organizationServiceInstanceId}/resources/clients`

| Parameter          | Location      | Type      | Required | Notes / Usage                                                                 |
| ------------------ | ------------ | --------- | -------- | ----------------------------------------------------------------------------- |
| `organizationServiceInstanceId`| path         | string    | yes      | From route param `viewId` in `ClientList`, `PushClientCommandPopupStep2`, `PushRolloutPopupStep2`. |
| `page`             | query        | number    | no       | 1-based page index; computed as `pageIndex + 1` from table pagination.       |
| `pageSize`         | query        | number    | no       | Page size from table pagination (10 in list views).                          |
| `search`           | query        | string    | no       | Free-text search string from `SearchInput`.                                  |
| body               | body         | —         | n/a      | No request body.                                                              |

### getAcmpAssets

**HTTP method**: `GET`  
**Endpoint**: `/acmp-service/instances/{organizationServiceInstanceId}/resources/assets`

| Parameter          | Location | Type   | Required | Notes / Usage                                                                 |
| ------------------ | -------- | ------ | -------- | ----------------------------------------------------------------------------- |
| `organizationServiceInstanceId`| path     | string | yes      | From route param `viewId` in `AssetList`.                                     |
| `page`             | query    | number | no       | 1-based; `pagination.pageIndex + 1`.                                          |
| `pageSize`         | query    | number | no       | From `pagination.pageSize` (10).                                              |
| `search`           | query    | string | no       | Search text from `SearchInput`.                                              |
| body               | body     | —      | n/a      | No request body.                                                              |

### getAcmpJobs

**HTTP method**: `GET`  
**Endpoint**: `/acmp-service/instances/{organizationServiceInstanceId}/resources/jobs`

| Parameter          | Location | Type   | Required | Notes / Usage                                                  |
| ------------------ | -------- | ------ | -------- | -------------------------------------------------------------- |
| `organizationServiceInstanceId`| path     | string | yes      | From `viewId` in `JobList`.                                   |
| `page`             | query    | number | no       | 1-based; `pagination.pageIndex + 1`.                          |
| `pageSize`         | query    | number | no       | From `pagination.pageSize` (10).                              |
| `search`           | query    | string | no       | Search string from `SearchInput`.                             |
| body               | body     | —      | n/a      | No request body.                                               |

### getAcmpTickets

**HTTP method**: `GET`  
**Endpoint**: `/acmp-service/instances/{organizationServiceInstanceId}/resources/tickets`

| Parameter          | Location | Type   | Required | Notes / Usage                                                  |
| ------------------ | -------- | ------ | -------- | -------------------------------------------------------------- |
| `organizationServiceInstanceId`| path     | string | yes      | From `viewId` in `TicketList`.                                |
| `page`             | query    | number | no       | 1-based; `pagination.pageIndex + 1`.                          |
| `pageSize`         | query    | number | no       | From `pagination.pageSize` (10).                              |
| `search`           | query    | string | no       | Search string from `SearchInput`.                             |
| body               | body     | —      | n/a      | No request body.                                               |

### getAcmpClientCommands

**HTTP method**: `GET`  
**Endpoint**: `/acmp-service/instances/{organizationServiceInstanceId}/resources/client-commands`

| Parameter          | Location | Type   | Required | Notes / Usage                                                  |
| ------------------ | -------- | ------ | -------- | -------------------------------------------------------------- |
| `organizationServiceInstanceId`| path     | string | yes      | From `viewId` in `PushClientCommandPopupStep1`.                |
| `page`             | query    | number | no       | 1-based; `pagination.pageIndex + 1`.                          |
| `pageSize`         | query    | number | no       | From `pagination.pageSize` (10).                              |
| `search`           | query    | string | no       | Search string from `SearchInput`.                             |
| `Authorization`    | header   | string | yes      | `Bearer {accessToken}`.                                       |
| body               | body     | —      | n/a      | No request body.                                               |

### getAcmpRolloutTemplates

**HTTP method**: `GET`  
**Endpoint**: `/acmp-service/instances/{organizationServiceInstanceId}/resources/rollout-templates`

| Parameter          | Location | Type   | Required | Notes / Usage                                                            |
| ------------------ | -------- | ------ | -------- | ------------------------------------------------------------------------ |
| `organizationServiceInstanceId`| path     | string | yes      | From `viewId` in `PushRolloutPopupStep1`.                               |
| `page`             | query    | number | no       | 1-based; `pagination.pageIndex + 1`.                                    |
| `pageSize`         | query    | number | no       | From `pagination.pageSize` (10).                                        |
| `search`           | query    | string | no       | Search string from `SearchInput`.                                       |
| body               | body     | —      | n/a      | No request body.                                                         |

### getAcmpClientNetworkCards

**HTTP method**: `GET`  
**Endpoint**: `/acmp-service/instances/{organizationServiceInstanceId}/resources/clients/{clientId}/network-cards`

| Parameter          | Location | Type   | Required | Notes / Usage                                                                 |
| ------------------ | -------- | ------ | -------- | ----------------------------------------------------------------------------- |
| `organizationServiceInstanceId`| path     | string | yes      | From `viewId` in `ClientNetworkList`.                                        |
| `clientId`         | path     | string | yes      | From `clientId` prop passed into `ClientNetworkList`.                         |
| `page`             | query    | number | no       | 1-based; `pagination.pageIndex + 1` (page size 5).                           |
| `pageSize`         | query    | number | no       | From `pagination.pageSize` (5).                                              |
| `search`           | query    | string | no       | Search string from `SearchInput`.                                           |
| body               | body     | —      | n/a      | No request body.                                                              |

### getAcmpClientInstalledSoftware

**HTTP method**: `GET`  
**Endpoint**: `/acmp-service/instances/{organizationServiceInstanceId}/resources/clients/{clientId}/installed-software`

| Parameter          | Location | Type   | Required | Notes / Usage                                                                 |
| ------------------ | -------- | ------ | -------- | ----------------------------------------------------------------------------- |
| `organizationServiceInstanceId`| path     | string | yes      | From `viewId` in `ClientInstalledSoftwareList`.                               |
| `clientId`         | path     | string | yes      | From `clientId` prop passed into `ClientInstalledSoftwareList`.              |
| `page`             | query    | number | no       | 1-based; `pagination.pageIndex + 1` (page size 5).                           |
| `pageSize`         | query    | number | no       | From `pagination.pageSize` (5).                                              |
| `search`           | query    | string | no       | Search string from `SearchInput`.                                           |
| body               | body     | —      | n/a      | No request body.                                                              |

### getAcmpClientHardDrives

**HTTP method**: `GET`  
**Endpoint**: `/acmp-service/instances/{organizationServiceInstanceId}/resources/clients/{clientId}/hard-drives`

| Parameter          | Location | Type   | Required | Notes / Usage                                                                 |
| ------------------ | -------- | ------ | -------- | ----------------------------------------------------------------------------- |
| `organizationServiceInstanceId`| path     | string | yes      | From `viewId` in `ClientHardwareList`.                                        |
| `clientId`         | path     | string | yes      | From `clientId` prop passed into `ClientHardwareList`.                        |
| `page`             | query    | number | no       | 1-based; `pagination.pageIndex + 1` (page size 5).                           |
| `pageSize`         | query    | number | no       | From `pagination.pageSize` (5).                                              |
| `search`           | query    | string | no       | Search string from `SearchInput`.                                           |
| body               | body     | —      | n/a      | No request body.                                                              |

### pushAcmpClientCommands

**HTTP method**: `POST`  
**Endpoint**: `/acmp-service/instances/{organizationServiceInstanceId}/resources/client-commands`

| Parameter          | Location | Type                | Required | Notes / Usage                                                                                  |
| ------------------ | -------- | ------------------- | -------- | ---------------------------------------------------------------------------------------------- |
| `organizationServiceInstanceId`| path     | string             | yes      | From `viewId` in `PushClientCommandPopupStep3`.                                               |
| `commandId`        | body     | string             | yes      | From `clientCommand.id` in `PushClientCommandPopupStep3`.                                     |
| `clientIds`        | body     | string[]           | yes      | Array of `client.id` from selected `AcmpClientListItem[]` in `PushClientCommandPopupStep3`.   |

Body shape:

- `{ commandId: string; clientIds: string[] }`

### pushAcmpRolloutTemplate

**HTTP method**: `POST`  
**Endpoint**: `/acmp-service/instances/{organizationServiceInstanceId}/resources/rollout-templates`

| Parameter          | Location | Type                                        | Required | Notes / Usage                                                                                                      |
| ------------------ | -------- | ------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------ |
| `organizationServiceInstanceId`| path     | string                                      | yes      | From `viewId` in `PushRolloutPopupStep3`.                                                                         |
| `rolloutId`        | body     | string                                      | yes      | From selected `rollout.id` in `PushRolloutPopupStep3`.                                                            |
| `clientIds`        | body     | string[]                                    | yes      | Derived from `clients.map(c => c.id)` in `PushRolloutPopupStep3`; other client override fields are not sent.      |

Body shape actually sent over the wire:

- `{ rolloutId: string; clientIds: string[] }`

Note: the UI collects per-client overrides `{ id, newName, newDescription }`, but the current legacy client maps this to `clientIds` only; the backend does not yet receive the overridden names/descriptions.


