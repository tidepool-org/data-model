## Basal deliveryType: `scheduled`

**NB:** All fields are *required* unless otherwise noted.


> Jump to example JSON:

>  - [client example](#example-client)
>  - [ingestion example](#example-ingestion)
>  - [storage example](#example-storage)


### type

[ingestion, storage, client] The string `basal`.

<!-- start type -->

This is the sub-type of `basal` event that represents intervals of basal insulin delivery that were triggered not by manual user entry but rather by the pump itself according to the active basal schedule programmed by the user (or clinician).

<!-- end type -->

### deliveryType

[ingestion, storage, client] The string `scheduled`.

<!-- start deliveryType -->

<!-- end deliveryType -->

### duration

> This field is **optional** when ingesting data through the jellyfish service but **required** when ingesting data through the new platform APIs.

[ingestion, storage, client] An integer value representing a duration of time in milliseconds.

**Range**: The new platform APIs expect this value to be >= 0 and <= 432000000 (the number of milliseconds in five days), as we assume that any single basal interval, even for a user running a flat-rate basal schedule, is broken up by a suspension of delivery in order to change the infusion site and/or insulin reservoir at least every five days.

<!-- start duration -->

When ingesting through the legacy jellyfish ingestion service, `duration` is optional because jellyfish also uses the *sequence* of basal events to determine their durations - see [`previous`](#previous) below for details.

In Tidepool's new platform APIs (under active development as of April, 2016 at the time of the initial drafting of this document), the `duration` field will be required on all `basal`s. In essence, we are moving to a system that places the burden on the client uploading data to determine the duration of `basal`s based on the sequence of basal rate change events (or directly reported in the data from the device, in the less common case).

Note that for some insulin pumps, even for a scheduled basal *not* interrupted by another event like a `suspend` or `temp`, the `duration` may not be the nice round numbers of milliseconds that might be expected given the schedule in the `pumpSettings`—e.g., 3600000 for a `basal` event lasting an hour. This is because of how some pumps schedule the small pulses of insulin delivery fulfilling the scheduled `rate`; depending on how the pulses are scheduled, the actual duration of the `basal` may be a bit over or under the scheduled `duration`.

<!-- end duration -->

### expectedDuration

> This field is **optional**. It is **only** added by the jellyfish data ingestion service.

[storage, client] An integer value representing an original programmed duration of time in milliseconds, copied from the `duration` field on ingestion when a following event has resulted in truncation of the original programmed duration.

**Range**: The new platform APIs expect this value to be >= 0 and <= 432000000 (the number of milliseconds in five days), as we assume that any single basal interval, even for a user running a flat-rate basal schedule, is broken up by a suspension of delivery in order to change the infusion site and/or insulin reservoir at least every five days.

<!-- start expectedDuration -->

On a scheduled basal ingested through the legacy jellyfish ingestion service, `expectedDuration` should *never* be included on a `scheduled` basal event, but it may be added by jellyfish under circumstances where a new basal event results in truncation of the duration of the original `scheduled` basal; most commonly this new event is a `temp` or `suspend`, but it could be a `scheduled` if a user is, for example, switching from one to another schedule as the active basal schedule. See the examples below under [`previous`](#previous).

<!-- DRAFT: discuss with @gniezen! -->
In Tidepool's new platform APIs (under active development as of April, 2016 at the time of the initial drafting of this document), the burden will be on the client to provide the `expectedDuration` where available and relevant, but it will never be a required field.

<!-- end expectedDuration -->

### rate

[ingestion, storage, client] A floating point number >= 0 representing the amount of insulin delivered in units per hour.

**Range**: Many insulin pump manufacturers do not allow a basal rate higher than 10.0 or 15.0 units per hour; our new platform APIs will reject any value higher than 20.0 units per hour.

<!-- start rate -->

Different insulin pump manufacturers offer the ability to program basal rates with different levels of precision in terms of significant digits on the `rate`. We endeavor to represent each `rate` as accurately as possible for each insulin pump; occasionally when values are stored to a falsely large number of floating point digits this means rounding the raw `rate` value found in a record from a pump in order to match the significant digits of precision advertised by the manufacturer. It is the burden of the uploading client to handle this rounding since the number of significant digits for `rate`s varies according to the pump manufacturer.

<!-- end rate -->

### previous

> This field is **optional** when ingesting data through the jellyfish service but will no longer exist when ingesting data through the new platform APIs.

[ingestion] An object representing the `basal` event just prior to this event.

[storage, client] This field does not appear, as it is only used in processing during ingestion and not stored.

<!-- start previous -->

The legacy jellyfish data ingestion API was designed for *real-time* ingestion of diabetes device data. This posed a problem for ingesting events like `basal` events that are *not* point-in-time but rather represent intervals of time. There are a couple of obvious solutions to this problem:
1. At the start `time` of a `basal` event, upload the `basal` and include the expected `duration` but update it later if it turns out to be incorrect when the next `basal` event is ingested.
1. At the start `time` of a `basal` event, upload the `basal`; when the next `basal` interval starts, upload it with a reference to the *first* basal. Keep including a reference to the previous basal on each `basal` event and use the actual sequence of `basal`s to determine the actual `duration` of each.

Partly because insulin pumps tend to report `basal` events *without* durations—most pumps simply report "basal rate change" events when the pump switches from delivering one rate to another—the second strategy, which does not require the inclusion of a `duration` on each `basal` event, was chosen as the strategy implemented in jellyfish. For a deep dive into the details of how the legacy jellyfish ingestion API processed sequenced `basal` events with a `previous`, see the following section.

In Tidepool's new platform APIs (under active development as of April, 2016 at the time of the initial drafting of this document), `previous` will no longer be an allowed field on `basal` events, and all `basal` events are expected to be uploaded with a `duration`. Essentially, we are now placing the burden on the client to process the sequence of raw basal (rate change) events coming from an insulin pump and determine the `duration` of each interval `basal` event prior to upload. Since the challenge of determining the `duration` for `basal` events has proven to be slightly different given each manufacturer's raw data model, we believe that it makes the most sense for determining the `duration` of `basal` events to fall within the uploading client's responsibilities.

#### Uploading sequences of `scheduled` basal (rate change) events

We start with a basal with no previous:

```json
{
  "type": "basal",
  "deliveryType": "scheduled",
  "duration": 3600000,
  "rate": 0.7,
  "scheduleName": "Vacation",
  "clockDriftOffset": 0,
  "conversionOffset": 0,
  "deviceId": "DevId0987654321",
  "deviceTime": "2016-04-25T12:00:00",
  "guid": "4f90a365-647c-49e0-8ff5-365df35019cc",
  "time": "2016-04-25T19:00:00.000Z",
  "timezoneOffset": -420,
  "uploadId": "SampleUploadId"
}
```

Then we submit another basal that includes the first as its `previous`:

```json
{
  "type": "basal",
  "deliveryType": "scheduled",
  "duration": 39600000,
  "rate": 1.2,
  "previous": {
    "type": "basal",
    "deliveryType": "scheduled",
    "duration": 3600000,
    "rate": 0.7,
    "scheduleName": "Vacation",
    "clockDriftOffset": 0,
    "conversionOffset": 0,
    "deviceId": "DevId0987654321",
    "deviceTime": "2016-04-25T12:00:00",
    "guid": "4f90a365-647c-49e0-8ff5-365df35019cc",
    "time": "2016-04-25T19:00:00.000Z",
    "timezoneOffset": -420,
    "uploadId": "SampleUploadId"
  },
  "scheduleName": "Weekend",
  "clockDriftOffset": 0,
  "conversionOffset": 0,
  "deviceId": "DevId0987654321",
  "deviceTime": "2016-04-25T13:00:00",
  "guid": "f41d375f-b92a-4aef-807e-05963370b420",
  "time": "2016-04-25T20:00:00.000Z",
  "timezoneOffset": -420,
  "uploadId": "SampleUploadId"
}
```

This will result in the jellyfish API storing the following to the Tidepool cloud:

```json
[
  {
    "type": "basal",
    "deliveryType": "scheduled",
    "duration": 3600000,
    "rate": 0.7,
    "scheduleName": "Vacation",
    "_active": true,
    "_groupId": "abcdef",
    "_schemaVersion": 0,
    "_version": 0,
    "clockDriftOffset": 0,
    "conversionOffset": 0,
    "createdTime": "2016-04-25T20:00:05.000Z",
    "deviceId": "DevId0987654321",
    "deviceTime": "2016-04-25T12:00:00",
    "guid": "4f90a365-647c-49e0-8ff5-365df35019cc",
    "id": "fcjk8r9m8hrqaiskaa3oa7ol47tkfefe",
    "time": "2016-04-25T19:00:00.000Z",
    "timezoneOffset": -420,
    "uploadId": "SampleUploadId"
  },
  {
    "type": "basal",
    "deliveryType": "scheduled",
    "duration": 39600000,
    "rate": 1.2,
    "scheduleName": "Weekend",
    "_active": true,
    "_groupId": "abcdef",
    "_schemaVersion": 0,
    "_version": 0,
    "clockDriftOffset": 0,
    "conversionOffset": 0,
    "createdTime": "2016-04-25T20:00:05.000Z",
    "deviceId": "DevId0987654321",
    "deviceTime": "2016-04-25T13:00:00",
    "guid": "f41d375f-b92a-4aef-807e-05963370b420",
    "id": "dshhn6ev3uc7gbbe6kq7aqlik8tvhjn7",
    "time": "2016-04-25T20:00:00.000Z",
    "timezoneOffset": -420,
    "uploadId": "SampleUploadId"
  }
]
```

The above case represents the normal and best-case scenario, but the jellyfish API was also designed to handle various cases in which not all of the data expectations are met.

**Case 1**: A sequence of `scheduled` basals with a skipped event.

As before, we start with a basal with no previous:

```json
{
  "type": "basal",
  "deliveryType": "scheduled",
  "duration": 3600000,
  "rate": 0.7,
  "scheduleName": "Vacation",
  "clockDriftOffset": 0,
  "conversionOffset": 0,
  "deviceId": "DevId0987654321",
  "deviceTime": "2016-04-25T12:00:00",
  "guid": "4f90a365-647c-49e0-8ff5-365df35019cc",
  "time": "2016-04-25T19:00:00.000Z",
  "timezoneOffset": -420,
  "uploadId": "SampleUploadId"
}
```

Then we submit another basal with a `previous` that is *not* the first `basal` we started with but rather an event that has *not* been uploaded between the first `basal` submitted and the current one:

```json
{
  "type": "basal",
  "deliveryType": "scheduled",
  "duration": 73800000,
  "rate": 0.325,
  "previous": {
    "type": "basal",
    "deliveryType": "scheduled",
    "duration": 3600000,
    "rate": 0.4,
    "scheduleName": "Stress",
    "clockDriftOffset": 0,
    "conversionOffset": 0,
    "deviceId": "DevId0987654321",
    "deviceTime": "2016-04-25T15:00:00",
    "guid": "247c5c1c-d392-48c4-8df2-b55748e873cf",
    "time": "2016-04-25T22:00:00.000Z",
    "timezoneOffset": -420,
    "uploadId": "SampleUploadId"
  },
  "scheduleName": "Stress",
  "clockDriftOffset": 0,
  "conversionOffset": 0,
  "deviceId": "DevId0987654321",
  "deviceTime": "2016-04-25T16:00:00",
  "guid": "41f708b3-34fb-4dc8-820c-e780c411a129",
  "time": "2016-04-25T23:00:00.000Z",
  "timezoneOffset": -420,
  "uploadId": "SampleUploadId"
}
```

This will result in the jellyfish API storing the following to the Tidepool cloud:

```json
[
  {
    "type": "basal",
    "deliveryType": "scheduled",
    "duration": 3600000,
    "rate": 0.7,
    "scheduleName": "Vacation",
    "_active": true,
    "_groupId": "abcdef",
    "_schemaVersion": 0,
    "_version": 1,
    "clockDriftOffset": 0,
    "conversionOffset": 0,
    "createdTime": "2016-04-25T23:09:05.140Z",
    "deviceId": "DevId0987654321",
    "deviceTime": "2016-04-25T12:00:00",
    "guid": "4f90a365-647c-49e0-8ff5-365df35019cc",
    "id": "fcjk8r9m8hrqaiskaa3oa7ol47tkfefe",
    "time": "2016-04-25T19:00:00.000Z",
    "timezoneOffset": -420,
    "uploadId": "SampleUploadId",
    "annotations": [
      {
        "code": "basal/mismatched-series",
        "nextId": "vppkt7da2u8tdokkt0jbrbvepllthrv2"
      }
    ]
  },
  {
    "type": "basal",
    "deliveryType": "scheduled",
    "duration": 73800000,
    "rate": 0.325,
    "scheduleName": "Stress",
    "_active": true,
    "_groupId": "abcdef",
    "_schemaVersion": 0,
    "_version": 0,
    "clockDriftOffset": 0,
    "conversionOffset": 0,
    "createdTime": "2016-04-25T23:09:05.172Z",
    "deviceId": "DevId0987654321",
    "deviceTime": "2016-04-25T16:00:00",
    "guid": "41f708b3-34fb-4dc8-820c-e780c411a129",
    "id": "vppkt7da2u8tdokkt0jbrbvepllthrv2",
    "time": "2016-04-25T23:00:00.000Z",
    "timezoneOffset": -420,
    "uploadId": "SampleUploadId"
  }
]
```

Note that the jellyfish ingestion API does **not** store the `previous` with a `time` of `2016-04-25T22:00:00.000Z` since this reference did *not* match a `basal` event that had already been submitted and stored to the Tidepool cloud. In addition, the first `basal` submitted (i.e., the `basal` just prior to the gap in the sequence) is marked with an annotation with the code `basal/mismatched-series`.

**Case 2**: A `scheduled` that overlaps with a prior event in the basal stream.

Once again we start by submitting a basal with no previous:

```json
{
  "type": "basal",
  "deliveryType": "scheduled",
  "duration": 4000000,
  "rate": 1.9,
  "scheduleName": "Weekend",
  "clockDriftOffset": 0,
  "conversionOffset": 0,
  "deviceId": "DevId0987654321",
  "deviceTime": "2016-04-25T15:00:00",
  "guid": "f9122f02-3690-439e-8130-4cbda9a5a618",
  "time": "2016-04-25T22:00:00.000Z",
  "timezoneOffset": -420,
  "uploadId": "SampleUploadId"
}
```

Then we submit another basal that includes the first as its `previous`, except that the `time` of the new `basal` occurs *before* the `time` that would be expected had the `duration` of the first basal event been fulfilled:

```json
{
  "type": "basal",
  "deliveryType": "scheduled",
  "duration": 77400000,
  "rate": 0.875,
  "previous": {
    "type": "basal",
    "deliveryType": "scheduled",
    "duration": 4000000,
    "rate": 1.9,
    "scheduleName": "Weekend",
    "clockDriftOffset": 0,
    "conversionOffset": 0,
    "deviceId": "DevId0987654321",
    "deviceTime": "2016-04-25T15:00:00",
    "guid": "f9122f02-3690-439e-8130-4cbda9a5a618",
    "time": "2016-04-25T22:00:00.000Z",
    "timezoneOffset": -420,
    "uploadId": "SampleUploadId"
  },
  "scheduleName": "Weekend",
  "clockDriftOffset": 0,
  "conversionOffset": 0,
  "deviceId": "DevId0987654321",
  "deviceTime": "2016-04-25T16:00:00",
  "guid": "38d9e8c6-943d-4e76-aede-25c4a6a7b4ba",
  "time": "2016-04-25T23:00:00.000Z",
  "timezoneOffset": -420,
  "uploadId": "SampleUploadId"
}
```

This will result in the jellyfish API storing the following to the Tidepool cloud:

```json
[
  {
    "type": "basal",
    "deliveryType": "scheduled",
    "duration": 3600000,
    "expectedDuration": 4000000,
    "rate": 1.9,
    "scheduleName": "Weekend",
    "_active": true,
    "_groupId": "abcdef",
    "_schemaVersion": 0,
    "_version": 1,
    "clockDriftOffset": 0,
    "conversionOffset": 0,
    "createdTime": "2016-04-25T23:29:52.209Z",
    "deviceId": "DevId0987654321",
    "deviceTime": "2016-04-25T15:00:00",
    "guid": "f9122f02-3690-439e-8130-4cbda9a5a618",
    "id": "up6uvs31k0qte789jd24r7rf27fduuv8",
    "time": "2016-04-25T22:00:00.000Z",
    "timezoneOffset": -420,
    "uploadId": "SampleUploadId"
  },
  {
    "type": "basal",
    "deliveryType": "scheduled",
    "duration": 77400000,
    "rate": 0.875,
    "scheduleName": "Weekend",
    "_active": true,
    "_groupId": "abcdef",
    "_schemaVersion": 0,
    "_version": 0,
    "clockDriftOffset": 0,
    "conversionOffset": 0,
    "createdTime": "2016-04-25T23:33:07.008Z",
    "deviceId": "DevId0987654321",
    "deviceTime": "2016-04-25T16:00:00",
    "guid": "38d9e8c6-943d-4e76-aede-25c4a6a7b4ba",
    "id": "vppkt7da2u8tdokkt0jbrbvepllthrv2",
    "time": "2016-04-25T23:00:00.000Z",
    "timezoneOffset": -420,
    "uploadId": "SampleUploadId"
  }
]
```

Note that the `duration` on the initial basal event was updated to reflect the actual length of the interval during which that segment of the basal schedule ran. An [`expectedDuration`](#expectedduration) was also added by the jellyfish ingestion service to retain a record of the original `duration` that was stored before the first basal event was truncated by the second.

<!-- end previous -->

### scheduleName

> This field is **optional**.

[ingestion, storage, client] A string: the name of the basal schedule.

#### Changelog for `scheduleName`

`_schemaVersion` 2: `scheduleName` became **optional**.

<!-- start scheduleName -->

<!-- DRAFT: discuss with @jhbate -->

Note that `.` and `$` are illegal characters in object keys for MongoDB's serialized JSON (BSON). These characters can, however, appear in basal schedule names for some insulin pump manufacturers. At present, we are dealing with this in at least one client-side "driver" for retrieving and processing insulin pump data prior to upload[^a], but we may decide to deal with this on the server side as part of our validation step in the new platform APIs.

In an ideal world, we at Tidepool would love to be able to surface to any user of `basal` data the name of the schedule that generated a particular `scheduled` basal event. Unfortunately, most of the manufacturers of insulin pumps do *not* provide the name of the basal schedule on each basal rate change event reported when the pump switches from one segment of a basal schedule to the next (or switches from a suspended state or temporary basal rate back to the active schedule).

For some manufacturers, we are able to build a complete history of the pump's settings, and thus we are able to infer the active schedule name by looking up the active pump settings at the time of a particular `basal` event. However, again due to how some manufacturers do (or *do not*) record pump settings changes, we are not always able to build this complete history, and so this lookup strategy is also in many cases not possible.

Prior to `_schemaVersion` 2, the `scheduleName` was *required* by the jellyfish data ingestion service, and as a result for some of the manufacturers we were providing the name of the currently active (as of time of upload) basal schedule, which is only correct for the final `basal` event in any upload. Thus, the `scheduleName` field should **not** be used for any computation of statistics or surfaced to the user for any `_schemaVersion` 1 data.

Going forward, now that `scheduleName` is an optional field, it should only be added to `basal` data when it is directly available in the raw data from an insulin pump or can be inferred with high confidence via lookup against a complete pump settings history.

<!-- end scheduleName -->

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

[^a]: See, for example, [this chrome-uploader commit](https://github.com/tidepool-org/chrome-uploader/pull/95/commits/2c2bcf2db3e609c703a65967399784dcd47e49af 'GitHub: chrome-uploader').
