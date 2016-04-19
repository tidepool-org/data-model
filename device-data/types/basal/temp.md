## Basal deliveryType: `temp`

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

[ingestion, storage, client] The string `temp`.

<!-- TODO -->
<!-- end deliveryType -->

### duration

[ingestion, storage, client] An integer value representing a duration of time in milliseconds.

<!-- TODO -->
<!-- end duration -->

### percent

[ingestion, storage, client] A floating point number >= 0 representing a percentage multiplier of the current basal rate to obtain the temp rate in units per hour.

<!-- TODO -->
<!-- end percent -->

### rate

[ingestion, storage, client] A floating point number >= 0 representing the amount of insulin delivered in units per hour.

<!-- TODO -->
<!-- end rate -->

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
	"deliveryType": "temp",
	"duration": 1800000,
	"percent": 0.3,
	"rate": 0.585,
	"suppressed": {
		"type": "basal",
		"deliveryType": "scheduled",
		"scheduleName": "Very Active",
		"rate": 1.95
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
	"guid": "1a850cb9-f997-4487-b6b0-2ceee0fb5598",
	"id": "46b29d8dcb0c465d94d3b2fb2b29a4d6",
	"time": "2015-12-14T06:00:00.000Z",
	"timezoneOffset": -480,
	"uploadId": "SampleUploadId"
}
```

### example (ingestion)

```json
{
	"type": "basal",
	"deliveryType": "temp",
	"duration": 34200000,
	"percent": 0.65,
	"rate": 0.5525,
	"suppressed": {
		"type": "basal",
		"deliveryType": "scheduled",
		"scheduleName": "Vacation",
		"rate": 0.85
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
	"guid": "453e13d1-97e0-47a5-8f31-328bd80d07ca",
	"id": "454976a41ce54a4390e1a55a8d1f362e",
	"time": "2015-12-14T06:00:00.000Z",
	"timezoneOffset": -480,
	"uploadId": "SampleUploadId"
}
```

### example (storage)

```json
{
	"type": "basal",
	"deliveryType": "temp",
	"duration": 36000000,
	"percent": 0.25,
	"rate": 0.00625,
	"suppressed": {
		"type": "basal",
		"deliveryType": "scheduled",
		"scheduleName": "Weekday",
		"rate": 0.025
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
	"guid": "3f88fcc1-7ccf-4283-b726-382c1a46da6d",
	"id": "8176ee2174524ffbad54e4db381f99d3",
	"time": "2015-12-14T06:00:00.000Z",
	"timezoneOffset": -480,
	"uploadId": "SampleUploadId"
}
```
