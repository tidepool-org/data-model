## Basal deliveryType: `scheduled`

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

[ingestion, storage, client] The string `scheduled`.

<!-- TODO -->
<!-- end deliveryType -->

### duration

> This field is **optional**.

[ingestion, storage, client] An integer value representing a duration of time in milliseconds.

<!-- TODO -->
<!-- end duration -->

### rate

[ingestion, storage, client] A floating point number >= 0 representing the amount of insulin delivered in units per hour.

<!-- TODO -->
<!-- end rate -->

### scheduleName

> This field is **optional**.

[ingestion, storage, client] A string: the name of the basal schedule.

#### Changelog for `scheduleName`

`_schemaVersion` 2: `scheduleName` became **optional**.

<!-- TODO -->
<!-- end scheduleName -->

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
	"deliveryType": "scheduled",
	"duration": 55800000,
	"rate": 0.3,
	"scheduleName": "Stress",
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2015-12-14T06:00:05.000Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2015-12-13T22:00:00",
	"guid": "acf54a1e-b8cc-4e30-8d02-00f8d19a7705",
	"id": "e1103d589ed3435b93b55d066a86ca4d",
	"time": "2015-12-14T06:00:00.000Z",
	"timezoneOffset": -480,
	"uploadId": "SampleUploadId"
}
```

### example (ingestion)

```json
{
	"type": "basal",
	"deliveryType": "scheduled",
	"duration": 59400000,
	"rate": 1.95,
	"scheduleName": "Vacation",
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2015-12-14T06:00:05.000Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2015-12-13T22:00:00",
	"guid": "1fd42248-c2f1-4bc8-bac0-17ec2a00b70d",
	"id": "aa1d2b35d2ca4e169d6031c20e7dbb31",
	"time": "2015-12-14T06:00:00.000Z",
	"timezoneOffset": -480,
	"uploadId": "SampleUploadId"
}
```

### example (storage)

```json
{
	"type": "basal",
	"deliveryType": "scheduled",
	"duration": 50400000,
	"rate": 0.8,
	"scheduleName": "Stress",
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2015-12-14T06:00:05.000Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2015-12-13T22:00:00",
	"guid": "20e7431c-a1e6-417c-a9aa-424b2a7795f4",
	"id": "5be070148b784212921f1503e2562703",
	"time": "2015-12-14T06:00:00.000Z",
	"timezoneOffset": -480,
	"uploadId": "SampleUploadId"
}
```
