## Bolus subType: `normal`

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

[ingestion, storage, client] The string `normal`.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes

<!-- start subType -->

This is the sub-type of `bolus` event that represents a bolus insulin dose delivered more-or-less immediately (within a matter of seconds or a small number of minutes, depending on the insulin pump and the user's settings). At Tidepool we follow the common convention of representing `normal` boluses as point-in-time events since their durations are short enough to be negligible.

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
		min: > 0.0
		max: 100.0

<!-- start normal -->

The `normal` field encodes the numerical value of the dose of insulin delivered by an insulin pump. To avoid noise in the data (especially as some insulin pumps make it very easy to deliver "doses" of 0 units when no additional dose is recommended given the PWD's current blood glucose and insulin on board), we have chosen _not_ to allow the upload of boluses with a total delivered dose of 0 units; the value must be greater than 0. Note that it is still possible for a [`dual/square`](dual-square.md) bolus that has been cancelled to have a total delivered dose of 0 units.

Most, if not all, insulin pumps include a maximum bolus setting that a PWD can customize to his or her typical dosing in order to prevent accidental delivery of very large doses of insulin. However, we could not find any indication that insulin pumps typically set a default maximum dose; hence we have chosen 100 units as an arbitrarily large maximum dose that we can imagine someone with type 1 diabetes programming.

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

When a bolus is interrupted (for example, by an occlusion or pump malfunction) or canceled by the user, the `expectedNormal` field is used to store the original value of the dose of insulin that the user programmed, while `normal` represents the value of the dose that was actually delivered.

The minimum value of `expectedNormal` is any value greater than that encoded under `normal` since any other value (i.e., less than or equal to `normal`) cannot obtain from interruption or cancellation of a bolus. See above in [`normal`](#normal) for discussion of the maximum value for this field.

<!-- end expectedNormal -->

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
	"subType": "normal",
	"normal": 2.75,
	"expectedNormal": 3.3,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-05-04T01:18:04",
	"guid": "ef51a1d2-cb4a-485c-9e63-3410c89b7cb2",
	"id": "d0f85d7a9bc0417e81f6afdbc6b17bc5",
	"time": "2016-05-04T08:18:04.184Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (ingestion)

```json
{
	"type": "bolus",
	"subType": "normal",
	"normal": 3.25,
	"expectedNormal": 3.9,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-05-04T01:18:04",
	"guid": "5d19f724-2e75-4a69-8311-3276c6758c4b",
	"time": "2016-05-04T08:18:04.184Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (storage)

```json
{
	"type": "bolus",
	"subType": "normal",
	"normal": 7.5,
	"expectedNormal": 9,
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2016-05-04T08:18:09.184Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-05-04T01:18:04",
	"guid": "64e3ccd6-b167-407a-b29f-6c8560a64713",
	"id": "45e3619f03e04d58b2c0515a822b7146",
	"time": "2016-05-04T08:18:04.184Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```
