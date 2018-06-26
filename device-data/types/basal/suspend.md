<!-- auto-generated doc! most areas *not* editable -->

## Basal deliveryType: `suspend`


> Jump to...(notable fields on this type)

>  - [type](#type)
>  - [deliveryType](#deliverytype)
>  - [duration](#duration)
>  - [expectedDuration](#expectedduration)
>  - [previous](#previous)
>  - [suppressed](#suppressed)

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

<!-- Added by Eden: TODO -->

<!-- end editable commentary on type -->

* * * * *

### deliveryType

[ingestion, storage, client] The string `suspend`.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes

<!-- start editable commentary on deliveryType -->

This is the sub-type of `basal` event that represents the total suspension of insulin delivery on an insulin pump 'within the stream' - <!-- Note by Eden: clarify -->of `basal` events, which should in the vast majority of cases be contiguous—that is, without gaps or overlaps. The user's inputs to suspend (and, later, resume) insulin delivery are part of Tidepool's `deviceEvent` data type, as the sub-type [`status`](../deviceEvent/status.md). Every interval that starts with a suspension of insulin delivery and ends with the resumption of insulin delivery is *also* represented as a `suspend` basal, documented here. This makes the calculation of statistics like total basal dose per day far easier.

Note, however, that no `rate` field appears on `suspend` basal events. The `rate` is always zero, and so this redundant information is not specified.

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
		max: 86400000

<!-- start editable commentary on duration -->

Just like [`scheduled`](./scheduled.md) basals, when ingesting through the legacy jellyfish ingestion service, `duration` is optional because jellyfish also uses the *sequence* of basal events to determine their durations - see [`previous`](./previous.md) for details.

In Tidepool's new platform APIs (under active development as of April, 2016 at the time of the initial drafting of this document), the `duration` field will be required on all `basal`s, including `suspend` basals, placing the burden on the client to determine the length of the interval between any pair of suspension and resumption of insulin delivery events that together define a `suspend` basal. (On only one insulin pump that we know of are suspensions of insulin delivery programmed for a set length of time upfront, like `temp` basals; in such cases, obviously, it is easy to provide the `duration` for the `suspend` basal.)

The new platform APIs expect this value to be >= 0 and <= 86400000 (the number of milliseconds in twenty-four hours), as no pump manufacturer that we know of currently allows the programming of a temporary basal rate for longer than twenty-four hours.

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
		min: >= `duration`
		max: 86400000

#### Changelog for `expectedDuration`

`_schemaVersion` ? (future): `expectedDuration` is implemented as described in this documentation. If the `_schemaVersion` listed here is "? (future)," all data up to and including the current `_schemaVersion` has **not** implemented `expectedDuration` as described.

<!-- start editable commentary on expectedDuration -->

Refer to the discussion of [`expectedDuration`](./temp.md#expectedduration) in the `temp` basal documentation. The only case where we may be able to implement `expectedDuration` for `suspend` basals in the future is the rare case of insulin pumps that require setting a `duration` for a suspension of insulin delivery upfront instead of providing a simple toggle between `suspended` and `resumed` insulin delivery status on the pump.

<!-- end editable commentary on expectedDuration -->

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

### suppressed

> This field is **optional**.

[ingestion, storage, client] An object representing another `basal` event - namely, the event that is currently suppressed (inactive) because this suspend basal is in effect.

	QUICK SUMMARY
	Required:
		jellyfish: no (optional)
		platform: no (optional)
May contain—only!—the following properties:

 * type
 * deliveryType
 * percent
 * rate
 * scheduleName
 * suppressed

#### suppressed.type

[ingestion, storage, client] The string `basal`.

	QUICK SUMMARY
	Required:
		jellyfish: no (optional)
		platform: yes

#### suppressed.deliveryType

[ingestion, storage, client] A string—either `scheduled` or `temp`—encoding the `deliveryType` of the currently suppressed basal event.

	QUICK SUMMARY
	Required:
		jellyfish: no (optional)
		platform: yes
	Range: Must be one of:
		`scheduled`
		`temp`

#### suppressed.percent

> This field is **optional**.

[ingestion, storage, client] A floating point number >= 0 representing a percentage multiplier of the current basal rate to obtain the temp rate in units per hour.

	QUICK SUMMARY
	Required:
		jellyfish: no (optional)
		platform: no (optional)
	Numerical type: Floating point value representing a percentage, where 1.0 represents 100%.
	Range:
		min: 0.0
		max: 10.0

#### suppressed.rate

[ingestion, storage, client] A floating point number >= 0 representing the amount of insulin delivered in units per hour.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes
	Numerical type: Floating point value rounded to the appropriate significant figures for the device's precision.
	Range:
		min: 0.0
		max: 20.0

#### suppressed.scheduleName

> This field is **optional**.

[ingestion, storage, client] A string: the name of the basal schedule.

	QUICK SUMMARY
	Required:
		jellyfish: no (optional)
		platform: no (optional)

#### suppressed.suppressed

> This field is **optional**.

[ingestion, storage, client] A nested object representing another `basal` event suppressed by the also-suppressed current `basal` event.

	QUICK SUMMARY
	Required:
		jellyfish: no (optional)
		platform: no (optional)

<!-- start editable commentary on suppressed -->

See the discussion of the [`suppressed`](./temp.md#suppressed) field on `temp` basals.

The only differences for `suspend` basals are that:
- The `deliveryType` of the embedded `suppressed` basal may be either `temp` or `scheduled`.
- The embedded `suppressed` basal may *itself* have an embedded `suppressed` basal event. This can happen in particular with insulin pumps integrated with continuous glucose monitors such that the following may happen: (a) the person with diabetes' blood glucose is falling, and he or she (or a caregiver) programs a `temp` basal (which embeds a `suppressed` scheduled basal) in an attempt to prevent hypoglycemia but (b) the person with diabetes' blood glucose continues to fall, and the automatic low glucose suspend feature of the insulin pump suspends insulin delivery, creating a `suspend` basal that embeds the `temp` basal as *its* `suppressed`.

Also see [the full explanation of `suppressed`](./suppressed.md) (including the tracking of `suppressed` for `temp` and `suspend` basals that cross one or more basal schedule boundaries) for further information, explanations, and examples.

<!-- end editable commentary on suppressed -->

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
	"deliveryType": "suspend",
	"duration": 10800000,
	"expectedDuration": 12960000,
	"suppressed": {
		"type": "basal",
		"deliveryType": "scheduled",
		"scheduleName": "Stress",
		"rate": 1.05
	},
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2018-05-14T18:00:00",
	"guid": "f9623fae-217c-47e1-a49c-85b7a9bca8ac",
	"id": "ba1027905672484babe56579f9291204",
	"time": "2018-05-14T08:00:00.000Z",
	"timezoneOffset": 600,
	"uploadId": "SampleUploadId"
}
```

### example (ingestion)

```json
{
	"type": "basal",
	"deliveryType": "suspend",
	"duration": 86400000,
	"expectedDuration": 103680000,
	"suppressed": {
		"type": "basal",
		"deliveryType": "scheduled",
		"scheduleName": "Very Active",
		"rate": 1.55
	},
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2018-05-14T18:00:00",
	"time": "2018-05-14T08:00:00.000Z",
	"timezoneOffset": 600,
	"uploadId": "SampleUploadId"
}
```

### example (storage)

```json
{
	"type": "basal",
	"deliveryType": "suspend",
	"duration": 34200000,
	"expectedDuration": 41040000,
	"suppressed": {
		"type": "basal",
		"deliveryType": "scheduled",
		"scheduleName": "Weekday",
		"rate": 1.525
	},
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2018-05-14T08:00:05.000Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2018-05-14T18:00:00",
	"guid": "f96df9f8-40f4-4f05-a4d4-c27af663ec2e",
	"id": "76b597d3d2354902b6dcd924d58fbd37",
	"time": "2018-05-14T08:00:00.000Z",
	"timezoneOffset": 600,
	"uploadId": "SampleUploadId"
}
```
