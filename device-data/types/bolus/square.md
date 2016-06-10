## Bolus subType: `square`

**NB:** All fields are *required* unless otherwise noted.


> Jump to example JSON:

>  - [client example](#example-client)
>  - [ingestion example](#example-ingestion)
>  - [storage example](#example-storage)


### type

[ingestion, storage, client] The string `bolus`.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes

<!-- start type -->

<!-- end type -->

* * * * *

### subType

[ingestion, storage, client] The string `square`.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes

#### Changelog for `subType`

`_schemaVersion` ? (future): We plan to migrate from `square` to `extended` in the future.

<!-- start subType -->

This is the sub-type of `bolus` event that represents a bolus insulin dose programmed to be delivered spread evenly over a `duration` of time (typically fifteen minutes to several hours).

We plan to migrate all Tidepool data to use `extended` as the value of this sub-type rather than `square` in order to improve the consistency of the data model. With `subType` containing `extended` and the `extended` field containing the value of the delivered insulin dose, this sub-type of `bolus` event will be parallel to `normal` boluses, where the `subType` is `normal` and the `normal` field contains the value of the delivered insulin dose.

<!-- end subType -->

* * * * *

### extended

[ingestion, storage, client] A floating point value representing units of insulin.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes
	Numerical type: Floating point value rounded to the appropriate significant figures for the device's precision.
	Range:
		min: > 0.0
		max: 100.0

<!-- start extended -->

The `extended` field encodes the numerical value of the dose of insulin delivered over the `duration` by an insulin pump. As with `normal` boluses, we do not allow the upload of boluses with a total delivered dose of 0 units.

Refer to the documentation for [`normal`](normal.md) boluses for an explanation of the range of this field.

<!-- end extended -->

* * * * *

### expectedExtended

> This field is **optional**.

[ingestion, storage, client] A floating point value representing units of insulin.

	QUICK SUMMARY
	Required:
		jellyfish: no (optional)
		platform: no (optional)
	Numerical type: Floating point value rounded to the appropriate significant figures for the device's precision.
	Range:
		min: > `extended`
		max: 100.0

<!-- start expectedExtended -->

When a `square` bolus is interrupted (for example, by an occlusion or pump malfunction) or canceled by the user, the `expectedExtended` field is used to store the original value of the dose of insulin that the user programmed, while `extended` represents the value of the dose that was actually delivered.

Refer to the documentation for [`normal`](normal.md) boluses for an explanation of the range of this field.

<!-- end expectedExtended -->

* * * * *

### duration

[ingestion, storage, client] An integer value representing a duration of time in milliseconds.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes
	Numerical type: Integer value representing milliseconds.
	Range:
		min: 0
		max: 86400000

<!-- start duration -->

The `duration` field encodes the actual elapsed duration of time, in milliseconds, spent delivering the dose of insulin encoded in `extended`.

<!-- DRAFT: discuss with Gerrit -->
The user interface for some insulin pumps allows a user to program a `square` bolus with a 0 duration; this is logically equivalent to a `normal` bolus but in order to expose device data with the highest level of fidelity possible, we preserve the record as a sub-type `square` and allow the upload of the event with a value of 0 for `duration`.

To the best of our knowledge, no insulin pump allows the programming of a `square` bolus with a duration longer than twenty-four hours, and so we have chosen this as the maximum value accepted by the new platform APIs.

<!-- end duration -->

* * * * *

### expectedDuration

> This field is **optional**.

[ingestion, storage, client] An integer value representing an original programmed duration of time in milliseconds when the programmed event did not complete due to interruption or user cancellation.

	QUICK SUMMARY
	Required:
		jellyfish: no (optional)
		platform: no (optional)
	Numerical type: Integer value representing milliseconds.
	Range:
		min: >= `duration`
		max: 86400000

<!-- start expectedDuration -->

When a `square` bolus is interrupted (for example, by an occlusion or pump malfunction) or canceled by the user, the `expectedDuration` field is used to store the original duration of time that the user programmed for delivery of the dose of insulin encoded in `extended`. The `duration` field, in contrast, encodes the actual elapsed duration of dose delivery.

The minimum value of `expectedDuration` is any value greater than or equal to that encoded under `duration` since any other value (i.e., less than `duration`) cannot obtain from interruption or cancellation of a bolus. Note that the `expectedDuration` can only be *equal* to the `duration` in the very rare and special case that the `duration` is 0. See above under [`duration`](#duration) for discussion of the minimum and maximum values for this field.

<!-- end expectedDuration -->

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
	"type": "bolus",
	"subType": "square",
	"extended": 3.5,
	"expectedExtended": 5.25,
	"duration": 3600000,
	"expectedDuration": 5400000,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-06-09T12:36:25",
	"guid": "9955131d-4e4d-442c-b02a-7c7aabf2e620",
	"id": "dd0b07bee0424ff9ac933cb43a534bc5",
	"time": "2016-06-09T19:36:25.093Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (ingestion)

```json
{
	"type": "bolus",
	"subType": "square",
	"extended": 4,
	"expectedExtended": 6,
	"duration": 75600000,
	"expectedDuration": 113400000,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-06-09T12:36:25",
	"guid": "c284e67d-36f7-4176-8e43-1442a0bbd25d",
	"time": "2016-06-09T19:36:25.094Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (storage)

```json
{
	"type": "bolus",
	"subType": "square",
	"extended": 8.75,
	"expectedExtended": 13.125,
	"duration": 32400000,
	"expectedDuration": 48600000,
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2016-06-09T19:36:30.094Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-06-09T12:36:25",
	"guid": "cce2e0d6-f40c-4280-a407-bff3a90ffa8a",
	"id": "3ba0317b3eb54a0f80644e70aef1059e",
	"time": "2016-06-09T19:36:25.094Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```
