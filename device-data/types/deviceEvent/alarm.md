## Device event subType: `alarm`

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

[ingestion, storage, client] The string `alarm`.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes

<!-- start subType -->
<!-- TODO -->
<!-- end subType -->

* * * * *

### alarmType

[ingestion, storage, client] String value encoding the type of alarm, with `other` as the catch-all/default category.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes
	Range: Must be one of:
		`low_insulin`
		`no_insulin`
		`low_power`
		`no_power`
		`occlusion`
		`no_delivery`
		`auto_off`
		`over_limit`
		`other`

<!-- start alarmType -->
<!-- TODO -->
<!-- end alarmType -->

* * * * *

### status

> This field is **optional**.

[ingestion, storage, client] String `id` (or, equivalently, but just for the legacy jellyfish ingestion service, the object itself) of a type `deviceEvent`, subType `status` object that is logically connected to this alarm.

	QUICK SUMMARY
	Required:
		jellyfish: no (optional)
		platform: no (optional)

<!-- start status -->
<!-- TODO -->
<!-- end status -->

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
	"subType": "alarm",
	"alarmType": "low_power",
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-05-04T01:18:05",
	"guid": "5ce288e6-5de2-44fe-acac-ca570f40e7d5",
	"id": "407e221141964090ab0bc3d78d9c0fc5",
	"time": "2016-05-04T08:18:05.084Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (ingestion)

```json
{
	"type": "deviceEvent",
	"subType": "alarm",
	"alarmType": "low_power",
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-05-04T01:18:05",
	"guid": "36d8502d-4854-4abe-ab90-494ca968b19c",
	"time": "2016-05-04T08:18:05.085Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (storage)

```json
{
	"type": "deviceEvent",
	"subType": "alarm",
	"alarmType": "low_power",
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2016-05-04T08:18:10.085Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-05-04T01:18:05",
	"guid": "bbf05cee-9fc3-484a-a67e-7dbc21ef3d22",
	"id": "2683fef8b841496984a5e9acb8338b31",
	"time": "2016-05-04T08:18:05.085Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```
