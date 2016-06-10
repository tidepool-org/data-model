<!-- auto-generated doc! most areas *not* editable -->

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

<!-- start editable commentary on type -->

<!-- end editable commentary on type -->

* * * * *

### subType

[ingestion, storage, client] The string `square`.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes

#### Changelog for `subType`

`_schemaVersion` ? (future): We plan to migrate from `square` to `extended` in the future.

<!-- start editable commentary on subType -->

This is the sub-type of `bolus` event that represents a bolus insulin dose programmed to be delivered spread evenly over a `duration` of time (typically fifteen minutes to several hours).

We plan to migrate all Tidepool data to use `extended` as the value of this sub-type rather than `square` in order to improve the consistency of the data model. With `subType` containing `extended` and the `extended` field containing the value of the delivered insulin dose, this sub-type of `bolus` event will be parallel to `normal` boluses, where the `subType` is `normal` and the `normal` field contains the value of the delivered insulin dose.

<!-- end editable commentary on subType -->

* * * * *

### extended

[ingestion, storage, client] A floating point value representing units of insulin.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes
	Numerical type: Floating point value rounded to the appropriate significant figures for the device's precision.
	Range:
		min: >= 0.0
		max: 100.0

<!-- start editable commentary on extended -->

The `extended` field encodes the numerical value of the dose of insulin delivered over the `duration` by an insulin pump. As with `normal` boluses, we do not allow the upload of boluses with a total delivered dose of 0 units.

Refer to the documentation for [`normal`](normal.md) boluses for an explanation of the range of this field.

<!-- end editable commentary on extended -->

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

<!-- start editable commentary on expectedExtended -->

When a `square` bolus is interrupted (for example, by an occlusion or pump malfunction) or canceled by the user, the `expectedExtended` field is used to store the original value of the dose of insulin that the user programmed, while `extended` represents the value of the dose that was actually delivered.

Refer to the documentation for [`normal`](normal.md) boluses for an explanation of the range of this field.

<!-- end editable commentary on expectedExtended -->

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

<!-- start editable commentary on duration -->

The `duration` field encodes the actual elapsed duration of time, in milliseconds, spent delivering the dose of insulin encoded in `extended`.

<!-- DRAFT: discuss with Gerrit -->
The user interface for some insulin pumps allows a user to program a `square` bolus with a 0 duration; this is logically equivalent to a `normal` bolus but in order to expose device data with the highest level of fidelity possible, we preserve the record as a sub-type `square` and allow the upload of the event with a value of 0 for `duration`.

To the best of our knowledge, no insulin pump allows the programming of a `square` bolus with a duration longer than twenty-four hours, and so we have chosen this as the maximum value accepted by the new platform APIs.

<!-- end editable commentary on duration -->

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

<!-- start editable commentary on expectedDuration -->

When a `square` bolus is interrupted (for example, by an occlusion or pump malfunction) or canceled by the user, the `expectedDuration` field is used to store the original duration of time that the user programmed for delivery of the dose of insulin encoded in `extended`. The `duration` field, in contrast, encodes the actual elapsed duration of dose delivery.

The minimum value of `expectedDuration` is any value greater than or equal to that encoded under `duration` since any other value (i.e., less than `duration`) cannot obtain from interruption or cancellation of a bolus. Note that the `expectedDuration` can only be *equal* to the `duration` in the very rare and special case that the `duration` is 0. See above under [`duration`](#duration) for discussion of the minimum and maximum values for this field.

<!-- end editable commentary on expectedDuration -->

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

### guid

See [common fields](../../common.md).

<!-- start editable commentary on guid -->
<!-- TODO -->
<!-- end editable commentary on guid -->

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

### id

See [common fields](../../common.md).

<!-- start editable commentary on id -->
<!-- TODO -->
<!-- end editable commentary on id -->

* * * * *

### example (client)

```json
{
	"type": "bolus",
	"subType": "square",
	"extended": 5.5,
	"expectedExtended": 8.25,
	"duration": 59400000,
	"expectedDuration": 89100000,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-06-09T19:58:44",
	"guid": "e0bf13b3-f1ae-4bea-a1e8-276926d6c0f2",
	"id": "0df4a2701b184676b2d19ded8957eaf8",
	"time": "2016-06-10T02:58:44.015Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (ingestion)

```json
{
	"type": "bolus",
	"subType": "square",
	"extended": 6,
	"expectedExtended": 9,
	"duration": 0,
	"expectedDuration": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-06-09T19:58:44",
	"guid": "8c624416-3649-48d6-80ca-d779afd67938",
	"time": "2016-06-10T02:58:44.016Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (storage)

```json
{
	"type": "bolus",
	"subType": "square",
	"extended": 4.5,
	"expectedExtended": 6.75,
	"duration": 28800000,
	"expectedDuration": 43200000,
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2016-06-10T02:58:49.017Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-06-09T19:58:44",
	"guid": "3d08dc6e-0c57-4bfe-a6bb-5f8eeb221ada",
	"id": "ffef9d307b754ebd91ac19cb8e65d59f",
	"time": "2016-06-10T02:58:44.017Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```
