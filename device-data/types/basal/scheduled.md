<!-- auto-generated doc! most areas *not* editable -->

## Basal deliveryType: `scheduled`


> Jump to...(notable fields on this type)

>  - [type](#type)
>  - [deliveryType](#deliverytype)
>  - [duration](#duration)
>  - [expectedDuration](#expectedduration)
>  - [rate](#rate)
>  - [previous](#previous)
>  - [scheduleName](#schedulename)

**NB:** All fields are *required* unless otherwise noted.


> Jump to example JSON:

>  - [client example](#example-client)
>  - [ingestion example](#example-ingestion)
>  - [storage example](#example-storage)


### type

[ingestion, storage, client] The string `basal`.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes

<!-- start editable commentary on type -->

<!-- end editable commentary on type -->

* * * * *

### deliveryType

[ingestion, storage, client] The string `scheduled`.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes

<!-- start editable commentary on deliveryType -->

This is the sub-type of `basal` event that represents intervals of basal insulin delivery that were triggered not by manual user entry but rather by the pump itself according to the active basal schedule programmed by the user (or clinician).

<!-- end editable commentary on deliveryType -->

* * * * *

### duration

> This field is **optional** when ingesting data through the jellyfish service but **required** when ingesting data through the new platform APIs.

[ingestion, storage, client] An integer value representing a duration of time in milliseconds.

	QUICK SUMMARY
	Required:
		jellyfish: no (optional)
		platform: yes
	Numerical type: Integer value representing milliseconds.
	Range:
		min: 0
		max: 432000000

<!-- start editable commentary on duration -->

When ingesting through the legacy jellyfish ingestion service, `duration` is optional because jellyfish also uses the *sequence* of basal events to determine their durations - see [`previous`](./previous.md) for details.

In Tidepool's new platform APIs (under active development as of April, 2016 at the time of the initial drafting of this document), the `duration` field will be required on all `basal`s. In essence, we are moving to a system that places the burden on the client uploading data to determine the duration of `basal`s based on the sequence of basal rate change events (or directly reported in the data from the device, in the less common case).

Note that for some insulin pumps, even for a scheduled basal *not* interrupted by another event like a `suspend` or `temp`, the `duration` may not be the nice round numbers of milliseconds that might be expected given the schedule in the `pumpSettings`—e.g., 3600000 for a `basal` event lasting an hour. This is because of how some pumps schedule the small pulses of insulin delivery fulfilling the scheduled `rate`; depending on how the pulses are scheduled, the actual duration of the `basal` may be a bit over or under the scheduled `duration`.

The new platform APIs expect this value to be >= 0 and <= 432000000 (the number of milliseconds in five days), as we assume that any single basal interval, even for a user running a flat-rate basal schedule, is broken up by a suspension of delivery in order to change the infusion site and/or insulin reservoir at least every five days.

<!-- end editable commentary on duration -->

* * * * *

### expectedDuration

> This field is **optional**. At present, it is **only** added by the jellyfish data ingestion service.

[storage, client] An integer value representing an original programmed duration of time in milliseconds, copied from the `duration` field on ingestion when a following event has resulted in truncation of the original programmed duration.

	QUICK SUMMARY
	Required:
		jellyfish: no (optional)
		platform: no (optional)
	Numerical type: Integer value representing milliseconds.
	Range:
		min: > `duration`
		max: 432000000

<!-- start editable commentary on expectedDuration -->

On a scheduled basal ingested through the legacy jellyfish ingestion service, `expectedDuration` should *never* be included on a `scheduled` basal event, but it may be added by jellyfish under circumstances where a new basal event results in truncation of the duration of the original `scheduled` basal; most commonly this new event is a `temp` or `suspend`, but it could be a `scheduled` if a user is, for example, switching from one to another schedule as the active basal schedule. See the examples in [`previous`](./previous.md).

In Tidepool's new platform APIs (under active development as of April, 2016 at the time of the initial drafting of this document), the burden will be on the client to provide the `expectedDuration` where available and relevant, but it will never be a required field. Because of how burdensome (or impossible) it is to calculate `expectedDuration` for `scheduled` basals, we do **not** expect the uploading client to calculate it, except in cases where the source data makes it easy to include.

<!-- end editable commentary on expectedDuration -->

* * * * *

### rate

[ingestion, storage, client] A floating point number >= 0 representing the amount of insulin delivered in units per hour.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes
	Numerical type: Floating point value rounded to the appropriate significant figures for the device's precision.
	Range:
		min: 0.0
		max: 20.0

<!-- start editable commentary on rate -->

Different insulin pump manufacturers offer the ability to program basal rates with different levels of precision in terms of significant digits on the `rate`. We endeavor to represent each `rate` as accurately as possible for each insulin pump; occasionally when values are stored to a falsely large number of floating point digits this means rounding the raw `rate` value found in a record from a pump in order to match the significant digits of precision advertised by the manufacturer. It is the burden of the uploading client to handle this rounding since the number of significant digits for `rate`s varies according to the pump manufacturer.

Many insulin pump manufacturers do not allow a basal rate higher than 10.0 or 15.0 units per hour; our new platform APIs will reject any value higher than 20.0 units per hour.

<!-- end editable commentary on rate -->

* * * * *

### previous

> This field is **optional** when ingesting data through the jellyfish service but will no longer exist when ingesting data through the new platform APIs.

[ingestion] An object representing the `basal` event just prior to this event or, equivalently, just the `id` of said object.

[storage, client] This field does not appear, as it is only used in processing during ingestion and not stored.

	QUICK SUMMARY
	Required:
		jellyfish: no (optional)
		platform: nonexistent

<!-- start editable commentary on previous -->

See [`previous`](./previous.md) for detailed documentation on this deprecated field.

<!-- end editable commentary on previous -->

* * * * *

### scheduleName

> This field is **optional**.

[ingestion, storage, client] A string: the name of the basal schedule.

	QUICK SUMMARY
	Required:
		jellyfish: no (optional)
		platform: no (optional)

#### Changelog for `scheduleName`

`_schemaVersion` 2: `scheduleName` became **optional**.

<!-- start editable commentary on scheduleName -->

<!-- DRAFT: discuss with @jhbate -->

Note that `.` and `$` are illegal characters in object keys for MongoDB's serialized JSON (BSON). These characters can, however, appear in basal schedule names for some insulin pump manufacturers. At present, we are dealing with this in at least one client-side "driver" for retrieving and processing insulin pump data prior to upload[^a], but we may decide to deal with this on the server side as part of our validation step in the new platform APIs.

In an ideal world, we at Tidepool would love to be able to surface to any user of `basal` data the name of the schedule that generated a particular `scheduled` basal event. Unfortunately, most of the manufacturers of insulin pumps do *not* provide the name of the basal schedule on each basal rate change event reported when the pump switches from one segment of a basal schedule to the next (or switches from a suspended state or temporary basal rate back to the active schedule).

For some manufacturers, we are able to build a complete history of the pump's settings, and thus we are able to infer the active schedule name by looking up the active pump settings at the time of a particular `basal` event. However, again due to how some manufacturers do (or *do not*) record pump settings changes, we are not always able to build this complete history, and so this lookup strategy is also in many cases not possible.

Prior to `_schemaVersion` 2, the `scheduleName` was *required* by the jellyfish data ingestion service, and as a result for some of the manufacturers we were providing the name of the currently active (as of time of upload) basal schedule, which is only correct for the final `basal` event in any upload. Thus, the `scheduleName` field should **not** be used for any computation of statistics or surfaced to the user for any `_schemaVersion` 1 data.

Going forward, now that `scheduleName` is an optional field, it should only be added to `basal` data when it is directly available in the raw data from an insulin pump or can be inferred with high confidence via lookup against a complete pump settings history.

<!-- end editable commentary on scheduleName -->

* * * * *

### clockDriftOffset

See [common fields](../../common.md).

<!-- start editable commentary on clockDriftOffset -->
<!-- TODO -->
<!-- end editable commentary on clockDriftOffset -->

* * * * *

### conversionOffset

See [common fields](../../common.md).

<!-- start editable commentary on conversionOffset -->
<!-- TODO -->
<!-- end editable commentary on conversionOffset -->

* * * * *

### deviceId

See [common fields](../../common.md).

<!-- start editable commentary on deviceId -->
<!-- TODO -->
<!-- end editable commentary on deviceId -->

* * * * *

### deviceTime

See [common fields](../../common.md).

<!-- start editable commentary on deviceTime -->
<!-- TODO -->
<!-- end editable commentary on deviceTime -->

* * * * *

### time

See [common fields](../../common.md).

<!-- start editable commentary on time -->
<!-- TODO -->
<!-- end editable commentary on time -->

* * * * *

### timezoneOffset

See [common fields](../../common.md).

<!-- start editable commentary on timezoneOffset -->
<!-- TODO -->
<!-- end editable commentary on timezoneOffset -->

* * * * *

### uploadId

See [common fields](../../common.md).

<!-- start editable commentary on uploadId -->
<!-- TODO -->
<!-- end editable commentary on uploadId -->

* * * * *

### _active

See [common fields](../../common.md).

<!-- start editable commentary on _active -->
<!-- TODO -->
<!-- end editable commentary on _active -->

* * * * *

### _groupId

See [common fields](../../common.md).

<!-- start editable commentary on _groupId -->
<!-- TODO -->
<!-- end editable commentary on _groupId -->

* * * * *

### _schemaVersion

See [common fields](../../common.md).

<!-- start editable commentary on _schemaVersion -->
<!-- TODO -->
<!-- end editable commentary on _schemaVersion -->

* * * * *

### _version

See [common fields](../../common.md).

<!-- start editable commentary on _version -->
<!-- TODO -->
<!-- end editable commentary on _version -->

* * * * *

### createdTime

See [common fields](../../common.md).

<!-- start editable commentary on createdTime -->
<!-- TODO -->
<!-- end editable commentary on createdTime -->

* * * * *

### guid

See [common fields](../../common.md).

<!-- start editable commentary on guid -->
<!-- TODO -->
<!-- end editable commentary on guid -->

* * * * *

### id

See [common fields](../../common.md).

<!-- start editable commentary on id -->
<!-- TODO -->
<!-- end editable commentary on id -->

* * * * *

### example (client)

```json
{
	"type": "basal",
	"deliveryType": "scheduled",
	"duration": 61200000,
	"rate": 0.95,
	"scheduleName": "Weekend",
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-06-13T19:00:00",
	"guid": "3483ef73-2eb1-40d0-accd-0fae2d812ebf",
	"id": "dafca36d61394a5b93e5975ac6e6ba29",
	"time": "2016-06-14T02:00:00.000Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (ingestion)

```json
{
	"type": "basal",
	"deliveryType": "scheduled",
	"duration": 61200000,
	"rate": 0.45,
	"scheduleName": "Stress",
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-06-13T19:00:00",
	"time": "2016-06-14T02:00:00.000Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (storage)

```json
{
	"type": "basal",
	"deliveryType": "scheduled",
	"duration": 7200000,
	"rate": 1.8,
	"scheduleName": "Vacation",
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2016-06-14T02:00:05.000Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-06-13T19:00:00",
	"guid": "d829dab2-46e8-4977-bca3-de2a28269f2c",
	"id": "e499052181d94f3c9353822453be0d1f",
	"time": "2016-06-14T02:00:00.000Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

[^a]: See, for example, [this chrome-uploader commit](https://github.com/tidepool-org/chrome-uploader/pull/95/commits/2c2bcf2db3e609c703a65967399784dcd47e49af 'GitHub: chrome-uploader').
