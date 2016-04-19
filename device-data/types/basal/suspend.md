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

### suppressed

> This field is **optional**.

[ingestion, storage, client] An object representing another `basal` event - namely, the event that is currently suppressed (inactive) because this temp basal is in effect.

<!-- TODO -->
<!-- end suppressed -->

### _active

See [common fields](../../common.md).

### _groupId

See [common fields](../../common.md).

### _schemaVersion

See [common fields](../../common.md).

### _version

See [common fields](../../common.md).

### clockDriftOffset

See [common fields](../../common.md).

### conversionOffset

See [common fields](../../common.md).

### createdTime

See [common fields](../../common.md).

### deviceId

See [common fields](../../common.md).

### deviceTime

See [common fields](../../common.md).

### guid

See [common fields](../../common.md).

### id

See [common fields](../../common.md).

### time

See [common fields](../../common.md).

### timezoneOffset

See [common fields](../../common.md).

### uploadId

See [common fields](../../common.md).

### previous

[ingestion] An object representing the `basal` event just prior to this event.

[storage, client] This field does not appear, as it is only used in processing during ingestion and not stored.

<!-- TODO -->
<!-- end previous -->

### example (client)

```json
{
	"type": "basal",
	"deliveryType": "suspend",
	"duration": 57600000,
	"suppressed": {
		"type": "basal",
		"deliveryType": "scheduled",
		"scheduleName": "Weekend",
		"rate": 0.375
	},
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2015-12-14T06:00:05.000Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2015-12-13T22:00:00",
	"guid": "91d8622b-e1c9-42b8-b3d7-5a030c808c6e",
	"id": "75befbb738364d71a82819193e313d91",
	"time": "2015-12-14T06:00:00.000Z",
	"timezoneOffset": -480,
	"uploadId": "SampleUploadId"
}
```

### example (ingestion)

```json
{
	"type": "basal",
	"deliveryType": "suspend",
	"duration": 5400000,
	"suppressed": {
		"type": "basal",
		"deliveryType": "scheduled",
		"scheduleName": "Vacation",
		"rate": 0.725
	},
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2015-12-14T06:00:05.000Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2015-12-13T22:00:00",
	"guid": "cb7fe2ea-451d-42e8-a419-0fb787ba99c6",
	"id": "b17f03e2d15842af814546cd435e7562",
	"time": "2015-12-14T06:00:00.000Z",
	"timezoneOffset": -480,
	"uploadId": "SampleUploadId"
}
```

### example (storage)

```json
{
	"type": "basal",
	"deliveryType": "suspend",
	"duration": 86400000,
	"suppressed": {
		"type": "basal",
		"deliveryType": "scheduled",
		"scheduleName": "Stress",
		"rate": 1.65
	},
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2015-12-14T06:00:05.000Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2015-12-13T22:00:00",
	"guid": "7a65695b-be78-48e8-ac9f-a428284ddf22",
	"id": "327fd41a08774d00889a68a76df06b46",
	"time": "2015-12-14T06:00:00.000Z",
	"timezoneOffset": -480,
	"uploadId": "SampleUploadId"
}
```
