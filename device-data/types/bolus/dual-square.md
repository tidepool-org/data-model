<!-- auto-generated doc! most areas *not* editable -->

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

<!-- start editable commentary on type -->

<!-- end editable commentary on type -->

* * * * *

### subType

[ingestion, storage, client] The string `dual/square`.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes

#### Changelog for `subType`

`_schemaVersion` ? (future): We plan to migrate from `dual/square` to `combo` in the future.

<!-- start editable commentary on subType -->

This is the sub-type of `bolus` event that represents a bolus insulin dose programmed to deliver part of the dose using the immediate delivery strategy (a `normal` bolus) and the remainder using the delivery spread evenly over a `duration` strategy (a `square` bolus). The data model is essentially just a combination of the models for [`normal`](normal.md) and [`square`](square.md) boluses.

Most (and perhaps all) insulin pumps ask the user to divide the `normal` and `square` portions of a `dual/square` bolus by *percentage* of the total insulin dose. We do **not** encode this programmed percentage directly, but it is recoverable (for surfacing in a client application's UI) through computation using the appropriate combination of values from the `normal`, `extended`, `expectedNormal`, and `expectedExtended` fields and/or the appropriate sum of these.

We plan to migrate all Tidepool data to use `combo` as the value of this sub-type rather than `dual/square` in order to improve the transparency of the data model and avoid `/` in a `subType` string.

<!-- end editable commentary on subType -->

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

<!-- start editable commentary on normal -->

See the explanation of this field in the documentation for [`normal`](normal.md) boluses.

Note that a 0 for `normal` is allowable in more circumstances for a combo bolus than for a simple `normal` bolus: as long as the `extended` is non-zero for the combo bolus, `normal` may have a value of 0 *without* the requirement that a non-zero `expectedNormal` also be present.

<!-- end editable commentary on normal -->

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

<!-- start editable commentary on expectedNormal -->

See the explanation of this field in the documentation for [`normal`](normal.md) boluses.

Note that if a `dual/square` bolus is interrupted or canceled during the `normal` portion of delivery, by definition the `extended` delivery should _not_ yet have begun, so the value of `extended` and `duration` should be 0 and `expectedExtended` and `expectedDuration` should have values.

<!-- end editable commentary on expectedNormal -->

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

See the explanation of this field in the documentation for [`square`](square.md) boluses.

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

See the explanation of this field in the documentation for [`square`](square.md) boluses.

Note that if a `dual/square` bolus is interrupted or canceled during the `extended` portion of delivery, by definition the `normal` delivery should have completed successfully, so the `expectedNormal` field _should not_ have a value. An example of this type of interruption appears below in the [examples](#example-client).

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

See the explanation of this field in the documentation for [`square`](square.md) boluses.

As with `square` boluses, the `duration` is the elapsed time for the `extended` portion of the bolus. While some insulin pumps that deliver `normal` insulin doses at a slower rate (minutes rather than seconds) for user comfort do include the duration of the `normal` delivery in the data, we do not currently include this information in our bolus data model(s). As with the `square` boluses, it is in theory possible for a user to input 0 `duration` for the `extended` portion of a `combo` bolus, effectively programming a `normal` bolus in a total amount equal to the `normal` and `extended` insulin values added together.

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

See the explanation of this field in the documentation for [`square`](square.md) boluses.

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
	"subType": "dual/square",
	"normal": 4.25,
	"extended": 3,
	"expectedExtended": 4.5,
	"duration": 81000000,
	"expectedDuration": 121500000,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-06-13T19:05:43",
	"guid": "c3648d03-d0a6-40f6-87fe-d928027742b5",
	"id": "f7e7e21815614a389d9760c79ee57e23",
	"time": "2016-06-14T02:05:43.091Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (ingestion)

```json
{
	"type": "bolus",
	"subType": "dual/square",
	"normal": 4.75,
	"extended": 8,
	"expectedExtended": 12,
	"duration": 77400000,
	"expectedDuration": 116100000,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-06-13T19:05:43",
	"time": "2016-06-14T02:05:43.092Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (storage)

```json
{
	"type": "bolus",
	"subType": "dual/square",
	"normal": 9.5,
	"extended": 2.25,
	"expectedExtended": 3.375,
	"duration": 59400000,
	"expectedDuration": 89100000,
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2016-06-14T02:05:48.093Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-06-13T19:05:43",
	"guid": "aa18ba7f-fb4b-49db-a684-6652ff0bcda4",
	"id": "c8365e1aab834b5594f995adb3953c76",
	"time": "2016-06-14T02:05:43.093Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```
