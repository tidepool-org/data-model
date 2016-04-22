## Basal deliveryType: `scheduled`

**NB:** All fields are *required* unless otherwise noted.


> Jump to example JSON:

>  - [client example](#example-client)
>  - [ingestion example](#example-ingestion)
>  - [storage example](#example-storage)


### type

[ingestion, storage, client] The string `basal`.

This is the sub-type of `basal` event that represents intervals of basal insulin delivery that were triggered not by manual user entry but rather by the pump itself according to the basal schedule programmed by the user (or clinician).

<!-- end type -->

### deliveryType

[ingestion, storage, client] The string `scheduled`.

<!-- end deliveryType -->

### duration

> This field is **optional**.

[ingestion, storage, client] An integer value representing a duration of time in milliseconds.

<!-- TODO -->
<!-- end duration -->

### expectedDuration

> This field is **optional**.

[storage, client] An integer value representing an original programmed duration of time in milliseconds, copied from the `duration` field on ingestion when a following event has resulted in truncation of the original programmed duration.

<!-- TODO -->
<!-- end expectedDuration -->

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

In an ideal world, we at Tidepool would love to be able to surface to any user of `basal` data the name of the schedule that generated a particular `scheduled` basal event. Unfortunately, most of the manufacturers of insulin pumps do *not* provide the name of the basal schedule on each basal rate change event reported when the pump switches from one segment of a basal schedule to the next (or switches from a suspended state or temporary basal rate back to the active schedule).

For some manufacturers, we are able to build a complete history of the pump's settings, and thus we are able to infer the active schedule name by looking up the active pump settings for the time of a particular `basal` event. However, again due to how some manufacturers do (or *do not*) record pump settings changes, we are not always able to build this complete history, and so this lookup strategy is also not possible.

Prior to `_schemaVersion` 2, the `scheduleName` was *required* by the jellyfish data ingestion service, and as a result for some of the manufacturers we were providing the name of the currently active (as of time of upload) basal schedule, which is only correct for the final `basal` event in any upload. Thus, the `scheduleName` field should **not** be used for any computation of statistics or surfaced to the user for any `_schemaVersion` 1 data.

Going forward, now that `scheduleName` is an optional field, it should only be added to `basal` data when it is directly available in the raw data from an insulin pump or can be inferred with high confidence via lookup against a complete pump settings history.

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
