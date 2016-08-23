<!-- auto-generated doc! most areas *not* editable -->

## Bolus subType: `normal`


> Jump to...(notable fields on this type)

>  - [type](#type)
>  - [subType](#subtype)
>  - [normal](#normal)
>  - [expectedNormal](#expectednormal)

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

[ingestion, storage, client] The string `normal`.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes

<!-- start editable commentary on subType -->

This is the sub-type of `bolus` event that represents a bolus insulin dose delivered more-or-less immediately (within a matter of seconds or a small number of minutes, depending on the insulin pump and the user's settings). At Tidepool we follow the common convention of representing `normal` boluses as point-in-time events since their durations are short enough to be negligible.

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

The `normal` field encodes the numerical value of the dose of insulin delivered by an insulin pump. To avoid noise in the data (especially as some insulin pumps make it very easy to deliver "doses" of 0 units when no additional dose is recommended given the PWD's current blood glucose and insulin on board), we have chosen in most cases _not_ to allow the upload of boluses with a total delivered dose of 0 units; the value must be greater than 0.

The *only* exception to this is when a user programs a bolus of greater than 0 units of insulin but cancels the delivery of this bolus before *any* of the insulin has been successfully delivered, resulting in a `normal` of 0 units but an [`expectedNormal`](#expectednormal) reflecting the value of the original programmed dose. In other words: a bolus of with a `normal` of 0 units may only be uploaded through the new platform APIs if the `expectedNormal` field is also present with a value greater than 0.

Most, if not all, insulin pumps include a maximum bolus setting that a PWD can customize to his or her typical dosing in order to prevent accidental delivery of very large doses of insulin. However, we could not find any indication that insulin pumps typically set a default maximum dose; hence we have chosen 100 units as an arbitrarily large maximum dose that we can imagine someone with type 1 diabetes programming.

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

When a bolus is interrupted (for example, by an occlusion or pump malfunction) or canceled by the user, the `expectedNormal` field is used to store the original value of the dose of insulin that the user programmed, while `normal` represents the value of the dose that was actually delivered.

The minimum value of `expectedNormal` is any value greater than that encoded under `normal` since any other value (i.e., less than or equal to `normal`) cannot obtain from interruption or cancellation of a bolus. See above in [`normal`](#normal) for discussion of the maximum value for this field.

<!-- end editable commentary on expectedNormal -->

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
	"subType": "normal",
	"normal": 1.5,
	"expectedNormal": 1.8,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-06-13T19:05:42",
	"guid": "6082c713-15b9-4e42-99b8-84d8e7f18077",
	"id": "bc29346b184d4d26aaf6d2c113430214",
	"time": "2016-06-14T02:05:42.696Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (ingestion)

```json
{
	"type": "bolus",
	"subType": "normal",
	"normal": 3,
	"expectedNormal": 3.6,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-06-13T19:05:42",
	"time": "2016-06-14T02:05:42.697Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (storage)

```json
{
	"type": "bolus",
	"subType": "normal",
	"normal": 2.25,
	"expectedNormal": 2.7,
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2016-06-14T02:05:47.697Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-06-13T19:05:42",
	"guid": "3b6caef1-40f9-4e97-b360-d6459d2a35c4",
	"id": "f0c0b6b37f0743da99278a49abcde303",
	"time": "2016-06-14T02:05:42.697Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```
