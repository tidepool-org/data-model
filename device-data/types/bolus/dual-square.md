## Bolus subType: `dual/square`

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

This is the sub-type of `bolus` event that represents a bolus insulin dose programmed to deliver part of the dose using the immediate delivery strategy (a `normal` bolus) and the remainder using the delivery spread evenly over a `duration` strategy (a `square` bolus). The data model is essentially just a combination of the models for [`normal`](normal.md) and [`square`](square.md) boluses.

Most (and perhaps all) insulin pumps ask the user to divide the `normal` and `square` portions of a `dual/square` bolus by *percentage* of the total insulin dose. We do **not** encode this programmed percentage directly, but it is recoverable (for surfacing in a client application's UI) through computation using the appropriate combination of values from the `normal`, `extended`, `expectedNormal`, and `expectedExtended` fields and/or the appropriate sum of these.

<!-- end type -->

* * * * *

### subType

[ingestion, storage, client] The string `dual/square`.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes

#### Changelog for `subType`

`_schemaVersion` ? (future): We plan to migrate from `dual/square` to `combo` in the future.

<!-- start subType -->

We plan to migrate all Tidepool data to use `combo` as the value of this sub-type rather than `dual/square` in order to improve the transparency of the data model and avoid `/` in a `subType` string.

<!-- end subType -->

* * * * *

### normal

[ingestion, storage, client] A floating point value representing units of insulin.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes
	Numerical type: Floating point value rounded to the appropriate significant figures for the device's precision.
	Range:
		min: >= 0.0
		max: 100.0

<!-- start normal -->

See the explanation of this field in the documentation for [`normal`](normal.md) boluses.

<!-- end normal -->

* * * * *

### expectedNormal

> This field is **optional**.

[ingestion, storage, client] A floating point value representing units of insulin.

	QUICK SUMMARY
	Required:
		jellyfish: no (optional)
		platform: no (optional)
	Numerical type: Floating point value rounded to the appropriate significant figures for the device's precision.
	Range:
		min: > `normal`
		max: 100.0

<!-- start expectedNormal -->

See the explanation of this field in the documentation for [`normal`](normal.md) boluses.

Note that if a `dual/square` bolus is interrupted or canceled during the `normal` portion of delivery, by definition the `extended` delivery should _not_ yet have begun, so the value of `extended` and `duration` should be 0 and `expectedExtended` and `expectedDuration` should have a values.

<!-- end expectedNormal -->

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

<!-- start extended -->

See the explanation of this field in the documentation for [`square`](square.md) boluses.

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

See the explanation of this field in the documentation for [`square`](square.md) boluses.

Note that if a `dual/square` bolus is interrupted or canceled during the `extended` portion of delivery, by definition the `normal` delivery should have completed successfully, so the `expectedNormal` field _should not_ have a value. An example of this type of interruption appears below in the [examples](#example-client).

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

See the explanation of this field in the documentation for [`square`](square.md) boluses.

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

See the explanation of this field in the documentation for [`square`](square.md) boluses.

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
	"subType": "dual/square",
	"normal": 4.25,
	"extended": 8,
	"expectedExtended": 12,
	"duration": 45000000,
	"expectedDuration": 67500000,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-05-04T01:18:04",
	"guid": "fef0fafb-c21d-4af7-81cd-d77a303d359b",
	"id": "ebca8f67626b4892af0c9ce2291b690b",
	"time": "2016-05-04T08:18:04.530Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (ingestion)

```json
{
	"type": "bolus",
	"subType": "dual/square",
	"normal": 7.5,
	"extended": 4.75,
	"expectedExtended": 7.125,
	"duration": 34200000,
	"expectedDuration": 51300000,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-05-04T01:18:04",
	"guid": "67e197ad-8e36-4f08-bd89-3d889f7c6e36",
	"time": "2016-05-04T08:18:04.531Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (storage)

```json
{
	"type": "bolus",
	"subType": "dual/square",
	"normal": 4.75,
	"extended": 4.5,
	"expectedExtended": 6.75,
	"duration": 61200000,
	"expectedDuration": 91800000,
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2016-05-04T08:18:09.531Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-05-04T01:18:04",
	"guid": "c5bcf1f2-e7b1-48f1-b119-d67f7f9663af",
	"id": "fffe9fa93ed440ecb19d31869bfb4a64",
	"time": "2016-05-04T08:18:04.531Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```
