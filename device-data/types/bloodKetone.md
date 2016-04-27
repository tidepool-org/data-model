## Blood Ketones (bloodKetone)

**NB:** All fields are *required* unless otherwise noted.


> Jump to example JSON:

>  - [client example](#example-client)
>  - [ingestion example](#example-ingestion)
>  - [storage example](#example-storage)


### type

[ingestion, storage, client] The string `bloodKetone`.

Blood ketones represent ketone concentration values (specifically beta-ketones, primarily beta-hydroxy butyric acid) obtained from a fingerstick meter capable of reading specialized blood ketone testing strips. Tidepool does not yet provide a data model for urine ketones, which are measured qualitatively, not quantitatively.

<!-- end type -->

### units

[ingestion, storage, client] The string `mmol/L`.

<!-- end units -->

### value

[ingestion, storage, client] Blood ketone value in mmol/L (float), with appropriately matching `units` field.

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
	"type": "bloodKetone",
	"value": 3,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2015-11-25T19:20:27",
	"guid": "13d95c21-d909-4f63-b594-7c6b8bb9be39",
	"id": "c19df6b0d3ac4f5788eb462f457cde6b",
	"time": "2015-11-26T03:20:27.739Z",
	"timezoneOffset": -480,
	"units": "mmol/L",
	"uploadId": "SampleUploadId"
}
```

### example (ingestion)

```json
{
	"type": "bloodKetone",
	"value": 1.4,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2015-11-25T19:20:27",
	"guid": "2a4d4c7e-548c-4f0c-bbf9-b6dc1b078c1e",
	"time": "2015-11-26T03:20:27.740Z",
	"timezoneOffset": -480,
	"units": "mg/dL",
	"uploadId": "SampleUploadId"
}
```

### example (storage)

```json
{
	"type": "bloodKetone",
	"value": 1.7,
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2015-11-26T03:20:32.740Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2015-11-25T19:20:27",
	"guid": "f81688e4-9768-4a5e-a4e2-12ce838a322d",
	"id": "b8ff67379ab0419baa9f73ae1966f729",
	"time": "2015-11-26T03:20:27.740Z",
	"timezoneOffset": -480,
	"units": "mmol/L",
	"uploadId": "SampleUploadId"
}
```
