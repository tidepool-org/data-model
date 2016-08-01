<!-- auto-generated doc! most areas *not* editable -->

## Bolus subType: `square`


> Jump to...(notable fields on this type)

>  - [type](#type)
>  - [subType](#subtype)
>  - [extended](#extended)
>  - [expectedExtended](#expectedextended)
>  - [duration](#duration)
>  - [expectedDuration](#expectedduration)

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
<!-- Edit by Eden: TODO? -->
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

We plan to migrate all Tidepool data to use `extended` as the value of this sub-type rather than `square` in order to improve the consistency of the data model. With `subType` containing `extended` and the `extended` field containing the value of the delivered insulin dose, this sub-type of `bolus` event <!-- Edit by Eden -->is parallel to `normal` boluses, where the `subType` is `normal` and the `normal` field contains the value of the delivered insulin dose.

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
The user interface for some insulin pumps allows a user to program a `square` bolus with a 0 duration; this is logically equivalent to a `normal` bolus, but in order to expose device data with the highest level of fidelity possible, we preserve the record as a sub-type `square` and allow the upload of the event with a value of 0 for `duration`.

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
	"type": "bolus",
	"subType": "square",
	"extended": 1.75,
	"expectedExtended": 2.625,
	"duration": 36000000,
	"expectedDuration": 54000000,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-06-13T19:05:42",
	"guid": "3240c064-4020-4af7-97db-c854b9834467",
	"id": "4e3a8286bcd84932a11430f7c412c012",
	"time": "2016-06-14T02:05:42.891Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (ingestion)

```json
{
	"type": "bolus",
	"subType": "square",
	"extended": 3.25,
	"expectedExtended": 4.875,
	"duration": 37800000,
	"expectedDuration": 56700000,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-06-13T19:05:42",
	"time": "2016-06-14T02:05:42.892Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (storage)

```json
{
	"type": "bolus",
	"subType": "square",
	"extended": 4,
	"expectedExtended": 6,
	"duration": 34200000,
	"expectedDuration": 51300000,
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2016-06-14T02:05:47.893Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-06-13T19:05:42",
	"guid": "11657131-4625-411f-8746-74afae911738",
	"id": "96c5a6ea476d41589bac1c0bb87e2deb",
	"time": "2016-06-14T02:05:42.893Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```
