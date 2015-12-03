## Continuous Blood Glucose (cbg)

**NB:** All fields are *required* unless otherwise noted.

### type

[ingestion, storage, client] The string `cbg`.

This is the Tidepool data type for continuous glucose monitor (CGM) sensor data. `cbg` is an abbreviation of 'continuous blood glucose' and contrasts with `smbg`, abbreviating 'self-monitored blood glucose'. `smbg` is the Tidepool data type for traditional fingerstick blood glucose meter data.

<!-- end type -->

### units

[ingestion] One of two string values: `mg/dL` or `mmol/L`.

[storage, client] The string `mmol/L`.

See [units](../units.md) for further explanation of blood glucose units.

<!-- end units -->

### value

[ingestion] Blood glucose value in either mg/dL (integer) or mmol/L (float), with appropriately matching `units` field.

[storage, client] Blood glucose value in mmol/L (float, potentially unrounded), with appropriately matching `units` field.

<!-- end value -->

### _active

See [common fields](../common.md).

### _groupId

See [common fields](../common.md).

### _schemaVersion

See [common fields](../common.md).

### _version

See [common fields](../common.md).

### clockDriftOffset

See [common fields](../common.md).

### conversionOffset

See [common fields](../common.md).

### createdTime

See [common fields](../common.md).

### deviceId

See [common fields](../common.md).

### deviceTime

See [common fields](../common.md).

### guid

See [common fields](../common.md).

### id

See [common fields](../common.md).

### time

See [common fields](../common.md).

### timezoneOffset

See [common fields](../common.md).

### uploadId

See [common fields](../common.md).

### example (client)

```json
{
	"type": "cbg",
	"value": 33.026950546720926,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2015-11-08T20:46:34",
	"guid": "4d6e70b9-84b4-417d-9c88-55b090132186",
	"id": "fc52ab2a65d441bdbc1c76526ccc762d",
	"time": "2015-11-09T04:46:34.238Z",
	"timezoneOffset": -480,
	"units": "mmol/L",
	"uploadId": "SampleUploadId"
}
```

### example (ingestion)

```json
{
	"type": "cbg",
	"value": 242,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2015-11-08T20:46:34",
	"guid": "39a8b40a-b182-4106-be89-3d05678e08e9",
	"time": "2015-11-09T04:46:34.239Z",
	"timezoneOffset": -480,
	"units": "mg/dL",
	"uploadId": "SampleUploadId"
}
```

### example (storage)

```json
{
	"type": "cbg",
	"value": 2.719866515612311,
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2015-11-09T04:46:39.240Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2015-11-08T20:46:34",
	"guid": "7431a469-b0fc-4dbd-95c0-41cf272795c3",
	"id": "5a6b3ea800be46288e2a2f036cbff848",
	"time": "2015-11-09T04:46:34.240Z",
	"timezoneOffset": -480,
	"units": "mmol/L",
	"uploadId": "SampleUploadId"
}
```
