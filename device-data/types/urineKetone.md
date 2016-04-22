## Urine Ketones (urineKetone)

**NB:** All fields are *required* unless otherwise noted.


> Jump to example JSON:

>  - [client example](#example-client)
>  - [ingestion example](#example-ingestion)
>  - [storage example](#example-storage)


### type

[ingestion, storage, client] The string `urineKetone`.

Urine ketones represent ketone concentration values obtained by home testing with ketone reagent strips, usually reacting positively to quantities of acetoacetic acid (rather than beta-ketones) in the urine. These records differ significantly from [blood ketone](bloodKetone.md) records because the values obtained are qualitative, not quantitative.

<!-- end type -->

### value

[ingestion, storage, client] String value representing a qualitative measurement of urine ketone concentration.

Must be one of: `negative`, `trace`, `small`, `moderate`, `large`.

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
	"type": "urineKetone",
	"value": "small",
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2015-12-02T23:57:15",
	"guid": "46dea583-d3ae-4ad8-ade1-9eb2d35c23bc",
	"id": "fd411030229545daab70cbbcc385d812",
	"time": "2015-12-03T07:57:15.661Z",
	"timezoneOffset": -480,
	"uploadId": "SampleUploadId"
}
```

### example (ingestion)

```json
{
	"type": "urineKetone",
	"value": "small",
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2015-12-02T23:57:15",
	"guid": "41cc7c40-1da2-4dd8-9d41-17ec58600112",
	"time": "2015-12-03T07:57:15.662Z",
	"timezoneOffset": -480,
	"uploadId": "SampleUploadId"
}
```

### example (storage)

```json
{
	"type": "urineKetone",
	"value": "moderate",
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2015-12-03T07:57:20.662Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2015-12-02T23:57:15",
	"guid": "aa9c27a0-d128-469c-99a6-6da54747f114",
	"id": "d18971f4ee3e47fb9cfd6eef3bced880",
	"time": "2015-12-03T07:57:15.662Z",
	"timezoneOffset": -480,
	"uploadId": "SampleUploadId"
}
```
