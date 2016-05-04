## Device event subType: `status`

**NB:** All fields are *required* unless otherwise noted.


> Jump to example JSON:

>  - [client example](#example-client)
>  - [ingestion example](#example-ingestion)
>  - [storage example](#example-storage)


### type

[ingestion, storage, client] The string `deviceEvent`.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes

<!-- start type -->
<!-- TODO -->
<!-- end type -->

* * * * *

### subType

[ingestion, storage, client] The string `status`.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes

<!-- start subType -->
<!-- TODO -->
<!-- end subType -->

* * * * *

### status

[ingestion, storage, client] String value encoding insulin pump status as `suspended` or `resumed`.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes
	Range:
		jellyfish: Must be one of:
			`suspended`
			`resumed`
		platform: The string `suspended`.

<!-- start status -->
<!-- TODO -->
<!-- end status -->

* * * * *

### duration

> This field is **optional** when ingesting data through the jellyfish service but **required** when ingesting data through the new platform APIs.

[ingestion, storage, client] An integer value representing a duration of time in milliseconds.

	QUICK SUMMARY
	Required:
		jellyfish: no (optional)
		platform: yes
	Numerical type: Integer value representing milliseconds.
	Range:
		min: 0
		max: < ∞

<!-- start duration -->
<!-- TODO -->
<!-- end duration -->

* * * * *

### expectedDuration

> This field is **optional**. At present, it is **only** added by the jellyfish data ingestion service.

[storage, client] An integer value representing an original programmed duration of time in milliseconds, copied from the `duration` field on ingestion when a following event has resulted in truncation of the original programmed duration.

	QUICK SUMMARY
	Required:
		jellyfish: no (optional)
		platform: no (optional)
	Numerical type: Integer value representing milliseconds.
	Range:
		min: > `duration`
		max: < ∞

<!-- start expectedDuration -->
<!-- TODO -->
<!-- end expectedDuration -->

* * * * *

### reason

[ingestion, storage, client] An object with two key-value pairs encoding the cause of a `suspended` or `resumed` event as `manual` (user-initiated) or `automatic` (pump-initiated).

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes
	Range: Must be one of:
		`manual`
		`automatic`

<!-- start reason -->
<!-- TODO -->
<!-- end reason -->

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
	"type": "deviceEvent",
	"subType": "status",
	"status": "suspended",
	"duration": 64800000,
	"expectedDuration": 77760000,
	"reason": {
		"suspended": "manual",
		"resumed": "automatic"
	},
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-05-04T01:18:05",
	"guid": "c6167608-a489-42db-98af-ccf3e9251d9a",
	"id": "961dd4e8b3d54ae19088964141f55f8f",
	"time": "2016-05-04T08:18:05.836Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (ingestion)

```json
{
	"type": "deviceEvent",
	"subType": "status",
	"status": "suspended",
	"duration": 37800000,
	"expectedDuration": 45360000,
	"reason": {
		"suspended": "manual",
		"resumed": "automatic"
	},
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-05-04T01:18:05",
	"guid": "252abbf0-4a11-4dcf-8f55-dd1519d71cda",
	"time": "2016-05-04T08:18:05.837Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (storage)

```json
{
	"type": "deviceEvent",
	"subType": "status",
	"status": "suspended",
	"duration": 19800000,
	"expectedDuration": 23760000,
	"reason": {
		"suspended": "manual",
		"resumed": "manual"
	},
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2016-05-04T08:18:10.837Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-05-04T01:18:05",
	"guid": "468168ab-a4f9-46e2-a6f9-81a38782ce45",
	"id": "d40e0dcf7df543f2be93aa53b35cd9df",
	"time": "2016-05-04T08:18:05.837Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```
