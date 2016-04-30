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

This is the sub-type of `bolus` event that represents a bolus insulin dose programmed to be delivered spread evenly over a `duration` of time (typically fifteen minutes to several hours).

<!-- end type -->

* * * * *

### subType

[ingestion, storage, client] The string `square`.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes
<!-- start subType -->

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
		min: > `duration`
		max: 86400000
<!-- start expectedDuration -->

When a `square` bolus is interrupted (for example, by an occlusion or pump malfunction) or canceled by the user, the `expectedDuration` field is used to store the original duration of time that the user programmed for delivery of the dose of insulin encoded in `extended`. The `duration` field, in contrast, encodes the actual elapsed duration of dose delivery.

The minimum value of `expectedDuration` is any value greater than that encoded under `duration` since any other value (i.e., less than or equal to `duration`) cannot obtain from interruption or cancellation of a bolus. See above under [`duration`](#duration) for discussion of the maximum value for this field.

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
	"extended": 1.75,
	"expectedExtended": 2.625,
	"duration": 27000000,
	"expectedDuration": 40500000,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-04-28T17:47:19",
	"guid": "934ab94d-691e-435b-85ce-85396bbd4bb8",
	"id": "7627cc7b6bed4607afea2e7169feef40",
	"time": "2016-04-29T00:47:19.070Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (ingestion)

```json
{
	"type": "bolus",
	"subType": "square",
	"extended": 5,
	"expectedExtended": 7.5,
	"duration": 43200000,
	"expectedDuration": 64800000,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-04-28T17:47:19",
	"guid": "afff26de-a4c9-47d3-b259-a1e9c9642e9f",
	"time": "2016-04-29T00:47:19.071Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (storage)

```json
{
	"type": "bolus",
	"subType": "square",
	"extended": 5,
	"expectedExtended": 7.5,
	"duration": 48600000,
	"expectedDuration": 72900000,
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2016-04-29T00:47:24.071Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-04-28T17:47:19",
	"guid": "971025b7-593c-448b-bd1e-867c1fd37923",
	"id": "60772979ca6747b1abf4d43c3c7bd929",
	"time": "2016-04-29T00:47:19.071Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```
