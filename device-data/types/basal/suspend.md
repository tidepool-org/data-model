## Basal deliveryType: `suspend`

**NB:** All fields are *required* unless otherwise noted.


> Jump to example JSON:

>  - [client example](#example-client)
>  - [ingestion example](#example-ingestion)
>  - [storage example](#example-storage)


### type

[ingestion, storage, client] The string `basal`.

<!-- TODO -->
<!-- end type -->

### deliveryType

[ingestion, storage, client] The string `suspend`.

<!-- TODO -->
<!-- end deliveryType -->

### duration

[ingestion, storage, client] An integer value representing a duration of time in milliseconds.

<!-- TODO -->
<!-- end duration -->

### previous

> This field is **optional**.

[ingestion] An object representing the `basal` event just prior to this event.

[storage, client] This field does not appear, as it is only used in processing during ingestion and not stored.

<!-- TODO -->
<!-- end previous -->

### suppressed

> This field is **optional**.

[ingestion, storage, client] An object representing another `basal` event - namely, the event that is currently suppressed (inactive) because this suspend basal is in effect.

<!-- TODO -->
<!-- end suppressed -->

### clockDriftOffset

See [common fields](../../common.md).

### conversionOffset

See [common fields](../../common.md).

### deviceId

See [common fields](../../common.md).

### deviceTime

See [common fields](../../common.md).

### guid

See [common fields](../../common.md).

### time

See [common fields](../../common.md).

### timezoneOffset

See [common fields](../../common.md).

### uploadId

See [common fields](../../common.md).

### _active

See [common fields](../../common.md).

### _groupId

See [common fields](../../common.md).

### _schemaVersion

See [common fields](../../common.md).

### _version

See [common fields](../../common.md).

### createdTime

See [common fields](../../common.md).

### id

See [common fields](../../common.md).

### example (client)

```json
{
	"type": "basal",
	"deliveryType": "suspend",
	"duration": 34200000,
	"suppressed": {
		"type": "basal",
		"deliveryType": "scheduled",
		"scheduleName": "Very Active",
		"rate": 0.825
	},
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2016-04-22T01:00:05.000Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-04-21T18:00:00",
	"guid": "8b2a51f7-631c-4a4b-ac33-4846c7a5fd9e",
	"id": "e1bf1e57700e477789d8392a46c7d56d",
	"time": "2016-04-22T01:00:00.000Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (ingestion)

```json
{
	"type": "basal",
	"deliveryType": "suspend",
	"duration": 79200000,
	"suppressed": {
		"type": "basal",
		"deliveryType": "scheduled",
		"scheduleName": "Vacation",
		"rate": 0.825
	},
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2016-04-22T01:00:05.000Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-04-21T18:00:00",
	"guid": "c8cf6781-dda9-4015-800a-133dcaf2ecd9",
	"id": "b2bf766e8afa4f7c9914d06ab5695957",
	"time": "2016-04-22T01:00:00.000Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (storage)

```json
{
	"type": "basal",
	"deliveryType": "suspend",
	"duration": 14400000,
	"suppressed": {
		"type": "basal",
		"deliveryType": "scheduled",
		"scheduleName": "Weekday",
		"rate": 1.075
	},
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2016-04-22T01:00:05.000Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-04-21T18:00:00",
	"guid": "23145008-6faf-4352-9c3c-32245926806b",
	"id": "51554888ba9948d383bee8ffbd4d86a7",
	"time": "2016-04-22T01:00:00.000Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```
