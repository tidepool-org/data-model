## Device event subType: `timeChange`

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

[ingestion, storage, client] The string `timeChange`.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes

<!-- start subType -->
<!-- TODO -->
<!-- end subType -->

* * * * *

### change

[ingestion, storage, client] An object encoding as much information as possible about a diabetes device display time change event.

Contains the following properties:

 * from
 * to
 * agent
 * reasons
 * timezone

#### from

[ingestion, storage, client] An ISO 8601 formatted timestamp *without* any timezone offset information—e.g., `2016-05-02T21:55:04`.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes
	Range:
		min: 2007-01-01T00:00:00
		max: none

#### to

[ingestion, storage, client] An ISO 8601 formatted timestamp *without* any timezone offset information—e.g., `2016-05-02T21:55:04`.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes
	Range:
		min: 2007-01-01T00:00:00
		max: none

#### agent

[ingestion, storage, client] A string encoding the agent of the diabetes device display time change event.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes
	Range: Must be one of:
		`manual`
		`automatic`

#### reasons

> This field is **optional**.

[ingestion, storage, client] An array of tags describing the reason(s) for the diabetes device display time change.

	QUICK SUMMARY
	Required:
		jellyfish: no (optional)
		platform: no (optional)
	Range: One or more of:
		`from_daylight_savings`
		`to_daylight_savings`
		`travel`
		`correction`
		`other`

#### timezone

> This field is **optional**.

[ingestion, storage, client] The name of the timezone that applies to the result of this diabetes device display time change.

	QUICK SUMMARY
	Required:
		jellyfish: no (optional)
		platform: no (optional)
	Range: Must be a string timezone name from the IANA Timezone Database.

<!-- start change -->
<!-- TODO -->
<!-- end change -->

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
	"subType": "timeChange",
	"change": {
		"from": "2016-05-02T21:55:04",
		"to": "2016-05-02T20:58:29",
		"agent": "manual",
		"reasons": [
			"travel",
			"correction"
		],
		"timezone": "US/Eastern"
	},
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-05-02T14:55:04",
	"guid": "228f8edf-7b90-4083-bc83-a959e4402bb9",
	"id": "fcadfaa856e64ff3be2edfb27fb9d578",
	"time": "2016-05-02T21:55:04.437Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (ingestion)

```json
{
	"type": "deviceEvent",
	"subType": "timeChange",
	"change": {
		"from": "2016-05-02T21:55:04",
		"to": "2016-05-02T20:58:29",
		"agent": "manual",
		"reasons": [
			"travel",
			"correction"
		],
		"timezone": "US/Central"
	},
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-05-02T14:55:04",
	"guid": "daaee7dd-2c3f-4483-84c9-26fbb97f0e53",
	"time": "2016-05-02T21:55:04.438Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (storage)

```json
{
	"type": "deviceEvent",
	"subType": "timeChange",
	"change": {
		"from": "2016-05-02T21:55:04",
		"to": "2016-05-02T20:58:29",
		"agent": "manual",
		"reasons": [
			"travel",
			"correction"
		],
		"timezone": "Europe/Budapest"
	},
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2016-05-02T21:55:09.438Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-05-02T14:55:04",
	"guid": "24600742-1d64-47cf-ba94-496b8ed238bd",
	"id": "05c7b5ed450c4b5b8da142a100838ada",
	"time": "2016-05-02T21:55:04.438Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```
