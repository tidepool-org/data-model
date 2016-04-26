## Basal deliveryType: `temp`

**NB:** All fields are *required* unless otherwise noted.


> Jump to example JSON:

>  - [client example](#example-client)
>  - [ingestion example](#example-ingestion)
>  - [storage example](#example-storage)


### type

[ingestion, storage, client] The string `basal`.

<!-- start type -->

This is the sub-type of `basal` event that represents temporary intervals of basal insulin delivery requested by the user. Insulin pumps allow the request of a temporary basal insulin rate for a period of time up to twenty-four hours as a percentage of the current active rate or as a rate specified by the user. Some insulin pumps allow the user to set temporary basal rates *both* by percentage and by manual specification at the user's choice; other insulin pumps only expose one of these interfaces.

<!-- end type -->

### deliveryType

[ingestion, storage, client] The string `temp`.

<!-- start deliveryType -->

<!-- end deliveryType -->

### duration

[ingestion, storage, client] An integer value representing a duration of time in milliseconds.

**Range**: The new platform APIs expect this value to be >= 0 and <= 86400000 (the number of milliseconds in twenty-four hours), as no pump manufacturer that we know of currently allows the programming of a temporary basal rate for longer than twenty-four hours.

<!-- start duration -->

Unlike on [`scheduled`](./scheduled.md) basals, both the legacy jellyfish ingestion API and the new platform APIs *require* a `duration` on every `temp` basal since an insulin pump user is always required to program a duration for a temporary basal rate interval along with the desired temporary rate (or percentage of active rate) itself.

<!-- end duration -->

### expectedDuration

> This field is **optional**. It is **only** added by the jellyfish data ingestion service.

[storage, client] An integer value representing an original programmed duration of time in milliseconds, copied from the `duration` field on ingestion when a following event has resulted in truncation of the original programmed duration.

**Range**: The new platform APIs expect this value to be >= 0 and <= 432000000 (the number of milliseconds in five days), as we assume that any single basal interval, even for a user running a flat-rate basal schedule, is broken up by a suspension of delivery in order to change the infusion site and/or insulin reservoir at least every five days.

<!-- start expectedDuration -->
<!-- TODO -->
<!-- end expectedDuration -->

### percent

> This field is **optional**.

[ingestion, storage, client] A floating point number >= 0 representing a percentage multiplier of the current basal rate to obtain the temp rate in units per hour.

<!-- start percent -->
<!-- TODO -->
<!-- end percent -->

### previous

> This field is **optional**.

[ingestion] An object representing the `basal` event just prior to this event.

[storage, client] This field does not appear, as it is only used in processing during ingestion and not stored.

<!-- start previous -->
<!-- TODO -->
<!-- end previous -->

### rate

> This field is **optional**.

[ingestion, storage, client] A floating point number >= 0 representing the amount of insulin delivered in units per hour.

**Range**: Many insulin pump manufacturers do not allow a basal rate higher than 10.0 or 15.0 units per hour; our new platform APIs will reject any value higher than 20.0 units per hour.

<!-- start rate -->
<!-- TODO -->
<!-- end rate -->

### suppressed

> This field is **optional**.

[ingestion, storage, client] An object—or, equivalently, just the string `id` of said object—representing another `basal` event - namely, the event that is currently suppressed (inactive) because this temp basal is in effect.

<!-- start suppressed -->
<!-- TODO -->
<!-- end suppressed -->

### clockDriftOffset

See [common fields](../../common.md).

<!-- start clockDriftOffset -->
<!-- TODO -->
<!-- end clockDriftOffset -->

### conversionOffset

See [common fields](../../common.md).

<!-- start conversionOffset -->
<!-- TODO -->
<!-- end conversionOffset -->

### deviceId

See [common fields](../../common.md).

<!-- start deviceId -->
<!-- TODO -->
<!-- end deviceId -->

### deviceTime

See [common fields](../../common.md).

<!-- start deviceTime -->
<!-- TODO -->
<!-- end deviceTime -->

### guid

See [common fields](../../common.md).

<!-- start guid -->
<!-- TODO -->
<!-- end guid -->

### time

See [common fields](../../common.md).

<!-- start time -->
<!-- TODO -->
<!-- end time -->

### timezoneOffset

See [common fields](../../common.md).

<!-- start timezoneOffset -->
<!-- TODO -->
<!-- end timezoneOffset -->

### uploadId

See [common fields](../../common.md).

<!-- start uploadId -->
<!-- TODO -->
<!-- end uploadId -->

### _active

See [common fields](../../common.md).

<!-- start _active -->
<!-- TODO -->
<!-- end _active -->

### _groupId

See [common fields](../../common.md).

<!-- start _groupId -->
<!-- TODO -->
<!-- end _groupId -->

### _schemaVersion

See [common fields](../../common.md).

<!-- start _schemaVersion -->
<!-- TODO -->
<!-- end _schemaVersion -->

### _version

See [common fields](../../common.md).

<!-- start _version -->
<!-- TODO -->
<!-- end _version -->

### createdTime

See [common fields](../../common.md).

<!-- start createdTime -->
<!-- TODO -->
<!-- end createdTime -->

### id

See [common fields](../../common.md).

<!-- start id -->
<!-- TODO -->
<!-- end id -->

### example (client)

```json
{
	"type": "basal",
	"deliveryType": "temp",
	"duration": 50400000,
	"percent": 0.1,
	"rate": 0.057499999999999996,
	"suppressed": {
		"type": "basal",
		"deliveryType": "scheduled",
		"scheduleName": "Weekend",
		"rate": 0.575
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
	"guid": "cb0654f4-410e-4499-bfe0-8cae5a6699c7",
	"id": "7c743024618a4d089ef67e1d6b7077c9",
	"time": "2016-04-22T01:00:00.000Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (ingestion)

```json
{
	"type": "basal",
	"deliveryType": "temp",
	"duration": 48600000,
	"percent": 0.85,
	"rate": 0.27625,
	"suppressed": {
		"type": "basal",
		"deliveryType": "scheduled",
		"scheduleName": "Vacation",
		"rate": 0.325
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
	"guid": "7387ebf0-bebd-464a-836a-278fd6d91b33",
	"id": "04b396b6db57456989fe78fce93f5123",
	"time": "2016-04-22T01:00:00.000Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (storage)

```json
{
	"type": "basal",
	"deliveryType": "temp",
	"duration": 27000000,
	"percent": 0.85,
	"rate": 1.19,
	"suppressed": {
		"type": "basal",
		"deliveryType": "scheduled",
		"scheduleName": "Very Active",
		"rate": 1.4
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
	"guid": "ed7819ee-fcab-492d-8029-625f0f67c8ed",
	"id": "0357c1c81a1a4a41ad94d5b3cd39b9d9",
	"time": "2016-04-22T01:00:00.000Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```
