## Basal deliveryType: `suspend`

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
<!-- start type -->

This is the sub-type of `basal` event that represents the total suspension of insulin delivery on an insulin pump within the stream of `basal` events, which should in the vast majority of cases be contiguous—that is, without gaps or overlaps. The user's inputs to suspend (and, later, resume) insulin delivery are part of Tidepool's `deviceEvent` data type, as the sub-type [`status`](../deviceEvent/status.md). Every interval that starts with a suspension of insulin delivery and ends with the resumption of insulin delivery is *also* represented as a `suspend` basal, documented here. This makes the calculation of statistics like total basal dose per day far easier.

Note, however, that no `rate` field appears on `suspend` basal events. The `rate` is always zero, and so this redundant information is not specified.

<!-- end type -->

* * * * *

### deliveryType

[ingestion, storage, client] The string `suspend`.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes
<!-- start deliveryType -->

<!-- end deliveryType -->

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
		max: 86400000
<!-- start duration -->

Just like [`scheduled`](./scheduled.md) basals, when ingesting through the legacy jellyfish ingestion service, `duration` is optional because jellyfish also uses the *sequence* of basal events to determine their durations - see [`previous`](./previous.md) for details.

In Tidepool's new platform APIs (under active development as of April, 2016 at the time of the initial drafting of this document), the `duration` field will be required on all `basal`s, including `suspend` basals, placing the burden on the client to determine the length of the interval between any pair of suspension and resumption of insulin delivery events that together define a `suspend` basal. (On only one insulin pump that we know of are suspensions of insulin delivery programmed for a set length of time upfront, like `temp` basals; in such cases, obviously, it is easy to provide the `duration` for the `suspend` basal.)

The new platform APIs expect this value to be >= 0 and <= 86400000 (the number of milliseconds in twenty-four hours), as no pump manufacturer that we know of currently allows the programming of a temporary basal rate for longer than twenty-four hours.

<!-- end duration -->

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
		max: 86400000
#### Changelog for `expectedDuration`

`_schemaVersion` ? (future): `expectedDuration` is implemented as described in this documentation. If the `_schemaVersion` listed here is "? (future)," all data up to and including the current `_schemaVersion` has **not** implemented `expectedDuration` as described.

<!-- start expectedDuration -->

Refer to the discussion of [`expectedDuration`](./temp.md#expectedduration) in the `temp` basal documentation. The only case where we may be able to implement `expectedDuration` for `suspend` basals in the future is the rare case of insulin pumps that require setting a `duration` for a suspension of insulin delivery upfront instead of providing a simple toggle between `suspended` and `resumed` insulin delivery status on the pump.

<!-- end expectedDuration -->

* * * * *

### previous

> This field is **optional** when ingesting data through the jellyfish service but will no longer exist when ingesting data through the new platform APIs.

[ingestion] An object representing the `basal` event just prior to this event or, equivalently, just the `id` of said object.

[storage, client] This field does not appear, as it is only used in processing during ingestion and not stored.

	QUICK SUMMARY
	Required:
		jellyfish: no (optional)
		platform: nonexistent
<!-- start previous -->

See [`previous`](./previous.md) for detailed documentation on this deprecated field.

<!-- end previous -->

* * * * *

### suppressed

> This field is **optional**.

[ingestion, storage, client] An object representing another `basal` event - namely, the event that is currently suppressed (inactive) because this suspend basal is in effect.

	QUICK SUMMARY
	Required:
		jellyfish: no (optional)
		platform: no (optional)
<!-- start suppressed -->

See the discussion of the [`suppressed`](./temp.md#suppressed) field on `temp` basals.

The only differences for `suspend` basals are that:
- The `deliveryType` of the embedded `suppressed` basal may be either `temp` or `scheduled`.
- The embedded `suppressed` basal may *itself* have an embedded `suppressed` basal event. This can happen in particular with insulin pumps integrated with continuous glucose monitors such that the following may happen: (a) the PWD blood glucose is falling, and he or she (or a caregiver) programs a `temp` basal (which embeds a `suppressed` scheduled basal) in an attempt to prevent hypoglycemia but (b) the PWD's blood glucose continues to fall, and the automatic low glucose suspend feature of the insulin pump suspends insulin delivery, creating a `suspend` basal that embeds the `temp` basal as *its* `suppressed`.

<!-- end suppressed -->

* * * * *

### clockDriftOffset

See [common fields](../../common.md).

<!-- start clockDriftOffset -->
<!-- TODO -->
<!-- end clockDriftOffset -->

* * * * *

### conversionOffset

See [common fields](../../common.md).

<!-- start conversionOffset -->
<!-- TODO -->
<!-- end conversionOffset -->

* * * * *

### deviceId

See [common fields](../../common.md).

<!-- start deviceId -->
<!-- TODO -->
<!-- end deviceId -->

* * * * *

### deviceTime

See [common fields](../../common.md).

<!-- start deviceTime -->
<!-- TODO -->
<!-- end deviceTime -->

* * * * *

### guid

See [common fields](../../common.md).

<!-- start guid -->
<!-- TODO -->
<!-- end guid -->

* * * * *

### time

See [common fields](../../common.md).

<!-- start time -->
<!-- TODO -->
<!-- end time -->

* * * * *

### timezoneOffset

See [common fields](../../common.md).

<!-- start timezoneOffset -->
<!-- TODO -->
<!-- end timezoneOffset -->

* * * * *

### uploadId

See [common fields](../../common.md).

<!-- start uploadId -->
<!-- TODO -->
<!-- end uploadId -->

* * * * *

### _active

See [common fields](../../common.md).

<!-- start _active -->
<!-- TODO -->
<!-- end _active -->

* * * * *

### _groupId

See [common fields](../../common.md).

<!-- start _groupId -->
<!-- TODO -->
<!-- end _groupId -->

* * * * *

### _schemaVersion

See [common fields](../../common.md).

<!-- start _schemaVersion -->
<!-- TODO -->
<!-- end _schemaVersion -->

* * * * *

### _version

See [common fields](../../common.md).

<!-- start _version -->
<!-- TODO -->
<!-- end _version -->

* * * * *

### createdTime

See [common fields](../../common.md).

<!-- start createdTime -->
<!-- TODO -->
<!-- end createdTime -->

* * * * *

### id

See [common fields](../../common.md).

<!-- start id -->
<!-- TODO -->
<!-- end id -->

* * * * *

### example (client)

```json
{
	"type": "basal",
	"deliveryType": "suspend",
	"duration": 86400000,
	"expectedDuration": 103680000,
	"suppressed": {
		"type": "basal",
		"deliveryType": "scheduled",
		"scheduleName": "Weekday",
		"rate": 1.1
	},
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-04-26T22:00:00",
	"guid": "8736dce1-c3e5-4aa5-b00c-13fd72553697",
	"id": "3ad5e0b167754d4e99035622012cbc2e",
	"time": "2016-04-27T05:00:00.000Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (ingestion)

```json
{
	"type": "basal",
	"deliveryType": "suspend",
	"duration": 55800000,
	"expectedDuration": 66960000,
	"previous": {
		"type": "basal",
		"deliveryType": "scheduled",
		"duration": 3600000,
		"rate": 0.375,
		"scheduleName": "Vacation",
		"clockDriftOffset": 0,
		"conversionOffset": 0,
		"deviceId": "DevId0987654321",
		"deviceTime": "2016-04-26T21:00:00",
		"guid": "e43dc384-ac8c-4b19-8028-053b55cb4fb3",
		"time": "2016-04-27T04:00:00.000Z",
		"timezoneOffset": -420,
		"uploadId": "SampleUploadId"
	},
	"suppressed": {
		"type": "basal",
		"deliveryType": "scheduled",
		"scheduleName": "Vacation",
		"rate": 0.575
	},
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-04-26T22:00:00",
	"guid": "6cfeea3a-0517-40c1-8aad-f56b171abaa5",
	"time": "2016-04-27T05:00:00.000Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (storage)

```json
{
	"type": "basal",
	"deliveryType": "suspend",
	"duration": 72000000,
	"expectedDuration": 86400000,
	"suppressed": {
		"type": "basal",
		"deliveryType": "scheduled",
		"scheduleName": "Weekend",
		"rate": 1.625
	},
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2016-04-27T05:00:05.000Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-04-26T22:00:00",
	"guid": "d16750a0-3925-418e-8554-def63855ac49",
	"id": "8ba01840e3154beeb56260217abc72c9",
	"time": "2016-04-27T05:00:00.000Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```
