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
		min: >= 0.0
		max: 100.0

<!-- start normal -->

The `normal` field encodes the numerical value of the dose of insulin delivered by an insulin pump. To avoid noise in the data (especially as some insulin pumps make it very easy to deliver "doses" of 0 units when no additional dose is recommended given the PWD's current blood glucose and insulin on board), we have chosen in most cases _not_ to allow the upload of boluses with a total delivered dose of 0 units; the value must be greater than 0.

The *only* exception to this is when a user programs a bolus of greater than 0 units of insulin but cancels the delivery of this bolus before *any* of the insulin has been successfully delivered, resulting in a `normal` of 0 units but an [`expectedNormal`](#expectednormal) reflecting the value of the original programmed dose. In other words: a bolus of with a `normal` of 0 units may only be uploaded through the new platform APIs if the `expectedNormal` field is also present with a value greater than 0.

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
	"normal": 3.5,
	"expectedNormal": 4.2,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-06-09T19:58:43",
	"guid": "b0508432-b54e-432f-9562-560dd18fba7c",
	"id": "ed9d2b7c683942d4b48af93fcb66d127",
	"time": "2016-06-10T02:58:43.798Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (ingestion)

```json
{
	"type": "bolus",
	"subType": "normal",
	"normal": 9.75,
	"expectedNormal": 11.7,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-06-09T19:58:43",
	"guid": "6b1a502e-3d65-4a95-9c8b-0f660099812f",
	"time": "2016-06-10T02:58:43.799Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (storage)

```json
{
	"type": "bolus",
	"subType": "normal",
	"normal": 3.75,
	"expectedNormal": 4.5,
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2016-06-10T02:58:48.799Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-06-09T19:58:43",
	"guid": "ee92e0e3-ccdf-4f13-99cb-3aaa655d45e1",
	"id": "ca6829ac311b46058a64ef39fe7c8788",
	"time": "2016-06-10T02:58:43.799Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```
