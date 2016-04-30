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

This is the sub-type of `bolus` event that represents a bolus insulin dose delivered more-or-less immediately (within a matter of seconds or a small number of minutes, depending on the insulin pump and the user's settings). At Tidepool we follow the common convention of representing `normal` boluses as point-in-time events since their durations are short enough to be negligible.

<!-- end type -->

* * * * *

### subType

[ingestion, storage, client] The string `normal`.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes
<!-- start subType -->
<!-- TODO -->
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

The `normal` field encodes the numerical value of the dose of insulin delivered by an insulin pump. To avoid noise in the data (especially as some insulin pumps make it very easy to deliver "doses" of 0 units when no additional dose is recommended given the PWD's current blood glucose and insulin on board), we have chosen _not_ to allow the upload of boluses with a total delivered dose of 0 units; the value must be greater than 0.

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
	"normal": 1.64,
	"expectedNormal": 2.05,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-04-28T15:54:16",
	"guid": "1cd3f8ac-2387-4241-bcd0-9c080d1f0d01",
	"id": "2fdaf157a2fd428992c847c71173e5d8",
	"time": "2016-04-28T22:54:16.820Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (ingestion)

```json
{
	"type": "bolus",
	"subType": "normal",
	"normal": 9.78,
	"expectedNormal": 12.225,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-04-28T15:54:16",
	"guid": "bb4e92db-3f44-4e3a-a90e-4f7ca6e8ec89",
	"time": "2016-04-28T22:54:16.821Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (storage)

```json
{
	"type": "bolus",
	"subType": "normal",
	"normal": 1.48,
	"expectedNormal": 1.85,
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2016-04-28T22:54:21.821Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-04-28T15:54:16",
	"guid": "650331f0-acf9-4f6d-a616-6628557d9a5d",
	"id": "ebb4a9ee368b495da226c37972eb3f2a",
	"time": "2016-04-28T22:54:16.821Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```
