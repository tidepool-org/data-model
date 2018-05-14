<!-- auto-generated doc! most areas *not* editable -->

## Basal deliveryType: `automated`


> Jump to...(notable fields on this type)

>  - [type](#type)
>  - [deliveryType](#deliverytype)
>  - [duration](#duration)
>  - [expectedDuration](#expectedduration)
>  - [rate](#rate)
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

[ingestion, storage, client] The string `automated`.

	QUICK SUMMARY
	Required:
		jellyfish: nonexistent
		platform: yes

<!-- start editable commentary on deliveryType -->

This is the sub-type of `basal` event that represents intervals of basal insulin delivery that were triggered not by manual user entry but rather by the pump itself according to a closed loop algorithm.

<!-- end editable commentary on deliveryType -->

* * * * *

### duration

> This field is **optional** when ingesting data through the jellyfish service but **required** when ingesting data through the new platform APIs.

[ingestion, storage, client] An integer value representing a duration of time in milliseconds.

	QUICK SUMMARY
	Required:
		jellyfish: nonexistent
		platform: yes
	Numerical type: Integer value representing milliseconds.
	Range:
		min: 0
		max: 432000000

<!-- start editable commentary on duration -->

In Tidepool's new platform APIs, the `duration` field is required on all `basal`s. The burden is on the client uploading data to determine the duration of `basal`s based on the sequence of basal rate change events (or directly reported in the data from the device, in the less common case).

<!-- end editable commentary on duration -->

* * * * *

### expectedDuration

> This field is **optional**.

[storage, client] An integer value representing an original programmed duration of time in milliseconds, copied from the `duration` field on ingestion when a following event has resulted in truncation of the original programmed duration.

	QUICK SUMMARY
	Required:
		jellyfish: nonexistent
		platform: no (optional)
	Numerical type: Integer value representing milliseconds.
	Range:
		min: >= `duration`
		max: 86400000

#### Changelog for `expectedDuration`

`_schemaVersion` ? (future): `expectedDuration` is implemented as described in this documentation. If the `_schemaVersion` listed here is "? (future)," all data up to and including the current `_schemaVersion` has **not** implemented `expectedDuration` as described.

<!-- start editable commentary on expectedDuration -->

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

Many insulin pump manufacturers do not allow a basal rate higher than 10.0 or 15.0 units per hour; our new platform APIs reject any value higher than 20.0 units per hour.

<!-- end editable commentary on rate -->

* * * * *

### scheduleName

> This field is **optional**.

[ingestion, storage, client] A string: the name of the basal schedule.

	QUICK SUMMARY
	Required:
		jellyfish: nonexistent
		platform: no (optional)

<!-- start editable commentary on scheduleName -->

In an ideal world, we at Tidepool would love to be able to surface to any user of `basal` data the name of the schedule that generated a particular `scheduled` basal event. Unfortunately, most of the manufacturers of insulin pumps do *not* provide the name of the basal schedule on each basal rate change event reported when the pump switches from one segment of a basal schedule to the next (or switches from a suspended state or temporary basal rate back to the active schedule).

For some manufacturers, we are able to build a complete history of the pump's settings, and thus we are able to infer the active schedule name by looking up the active pump settings at the time of a particular `basal` event. However, again due to how some manufacturers do (or *do not*) record pump settings changes, we are not always able to build this complete history, and so this lookup strategy is also in many cases not possible.

Since `scheduleName` is an optional field, it should only be added to `basal` data when it is directly available in the raw data from an insulin pump or can be inferred with high confidence via lookup against a complete pump settings history.

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
	"deliveryType": "automated",
	"duration": 55800000,
	"rate": 1.825,
	"scheduleName": "Stress",
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2018-05-14T18:00:00",
	"guid": "de52b7f9-146f-48f1-a78b-069df20b700a",
	"id": "07d77d96e6854cb982027ed53db9594f",
	"time": "2018-05-14T08:00:00.000Z",
	"timezoneOffset": 600,
	"uploadId": "SampleUploadId"
}
```

### example (ingestion)

```json
{
	"type": "basal",
	"deliveryType": "automated",
	"duration": 84600000,
	"rate": 0.525,
	"scheduleName": "Very Active",
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
	"deliveryType": "automated",
	"duration": 46800000,
	"rate": 1.175,
	"scheduleName": "Weekday",
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2018-05-14T08:00:05.000Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2018-05-14T18:00:00",
	"guid": "b0b9c24b-00b1-4f0a-863a-5b4f09aa6720",
	"id": "6f513a7bb30445a69a8c30d134f2f0ce",
	"time": "2018-05-14T08:00:00.000Z",
	"timezoneOffset": 600,
	"uploadId": "SampleUploadId"
}
```
