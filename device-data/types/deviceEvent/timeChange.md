<!-- auto-generated doc! most areas *not* editable -->

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

<!-- start editable commentary on type -->
<!-- TODO -->
<!-- end editable commentary on type -->

* * * * *

### subType

[ingestion, storage, client] The string `timeChange`.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes

<!-- start editable commentary on subType -->
<!-- TODO -->
<!-- end editable commentary on subType -->

* * * * *

### change

[ingestion, storage, client] An object encoding as much information as possible about a diabetes device display time change event.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes
Contains the following properties:

 * from
 * to
 * agent
 * reasons
 * timezone

#### from

[ingestion, storage, client] An ISO 8601 formatted timestamp *without* any timezone offset information—e.g., `2016-05-04T08:18:06`.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes
	Range:
		min: 2007-01-01T00:00:00
		max: none

#### to

[ingestion, storage, client] An ISO 8601 formatted timestamp *without* any timezone offset information—e.g., `2016-05-04T08:18:06`.

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

<!-- start editable commentary on change -->
<!-- TODO -->
<!-- end editable commentary on change -->

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

### guid

See [common fields](../../common.md).

<!-- start editable commentary on guid -->
<!-- TODO -->
<!-- end editable commentary on guid -->

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

### id

See [common fields](../../common.md).

<!-- start editable commentary on id -->
<!-- TODO -->
<!-- end editable commentary on id -->

* * * * *

### example (client)

```json
{
	"type": "deviceEvent",
	"subType": "timeChange",
	"change": {
		"from": "2016-05-04T08:18:06",
		"to": "2016-05-04T07:21:31",
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
	"deviceTime": "2016-05-04T01:18:06",
	"guid": "e99d9828-d412-4e53-8645-a11cf21caee7",
	"id": "f547c206c2ce4361b28b2a95ff3b6d1b",
	"time": "2016-05-04T08:18:06.023Z",
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
		"from": "2016-05-04T08:18:06",
		"to": "2016-05-04T07:21:31",
		"agent": "manual",
		"reasons": [
			"travel",
			"correction"
		],
		"timezone": "Europe/London"
	},
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-05-04T01:18:06",
	"guid": "d86f4881-9eb5-4638-9f06-afad83caa52b",
	"time": "2016-05-04T08:18:06.024Z",
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
		"from": "2016-05-04T08:18:06",
		"to": "2016-05-04T07:21:31",
		"agent": "manual",
		"reasons": [
			"travel",
			"correction"
		],
		"timezone": "US/Mountain"
	},
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2016-05-04T08:18:11.024Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-05-04T01:18:06",
	"guid": "6b285d97-c5fc-483a-9c08-67713a0e2775",
	"id": "c1288c03e9d4473daef65685178a5cab",
	"time": "2016-05-04T08:18:06.024Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```
