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

### previous

[ingestion] An object representing the `basal` event just prior to this event.

[storage, client] This field does not appear, as it is only used in processing during ingestion and not stored.

<!-- TODO -->
<!-- end previous -->

### scheduleName

> This field is **optional**.

[ingestion, storage, client] A string: the name of the basal schedule.

#### Changelog for `scheduleName`

`_schemaVersion` 2: `scheduleName` became **optional**.

<!-- TODO -->
<!-- end scheduleName -->

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
	"deliveryType": "scheduled",
	"duration": 18000000,
	"rate": 1.225,
	"scheduleName": "Weekday",
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2016-04-22T01:00:05.000Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-04-21T18:00:00",
	"guid": "d3df90a0-50d9-46d2-9272-5f589dc81b4b",
	"id": "e0a193ebc15c412cb7ecf5e16902b9e1",
	"time": "2016-04-22T01:00:00.000Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (ingestion)

```json
{
	"type": "basal",
	"deliveryType": "scheduled",
	"duration": 3600000,
	"rate": 0.35,
	"scheduleName": "Vacation",
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2016-04-22T01:00:05.000Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-04-21T18:00:00",
	"guid": "dbe7bc72-311a-451c-b4fb-ada6e735359f",
	"id": "88188e3f83554837a2fee439a28055b5",
	"time": "2016-04-22T01:00:00.000Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (storage)

```json
{
	"type": "basal",
	"deliveryType": "scheduled",
	"duration": 36000000,
	"rate": 1.85,
	"scheduleName": "Stress",
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2016-04-22T01:00:05.000Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-04-21T18:00:00",
	"guid": "d8802cc1-f143-4294-a6e3-54a8ccb45621",
	"id": "c3809a3f8bc24db4905f3039af0143b2",
	"time": "2016-04-22T01:00:00.000Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```
