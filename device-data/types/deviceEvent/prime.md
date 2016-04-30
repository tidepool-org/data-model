## Device event subType: `prime`

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

[ingestion, storage, client] The string `prime`.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes
<!-- start subType -->
<!-- TODO -->
<!-- end subType -->

* * * * *

### primeTarget

[ingestion, storage, client] String encoding the target of the priming action.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes
	Range: Must be one of: `cannula`, `tubing`.
<!-- start primeTarget -->
<!-- TODO -->
<!-- end primeTarget -->

* * * * *

### volume

> This field is **optional**.

[ingestion, storage, client] A floating point value representing units of insulin.

	QUICK SUMMARY
	Required:
		jellyfish: no (optional)
		platform: no (optional)
	Range:
		cannula:
			min: 0.0
			max: 3.0
		tubing:
			min: 0.0
			max: 100.0


<!-- start volume -->
<!-- TODO -->
<!-- end volume -->

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
	"subType": "prime",
	"primeTarget": "tubing",
	"volume": 11.1,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-04-29T16:11:03",
	"guid": "fca99661-9288-4f78-93ca-20c1e55e29f2",
	"id": "e74f1d25f8864a7680164aeee6a05642",
	"time": "2016-04-29T23:11:03.679Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (ingestion)

```json
{
	"type": "deviceEvent",
	"subType": "prime",
	"primeTarget": "tubing",
	"volume": 18.8,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-04-29T16:11:03",
	"guid": "02b663c9-09db-49e3-b1f9-83c4b795a31c",
	"time": "2016-04-29T23:11:03.679Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (storage)

```json
{
	"type": "deviceEvent",
	"subType": "prime",
	"primeTarget": "cannula",
	"volume": "0.7",
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2016-04-29T23:11:08.679Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-04-29T16:11:03",
	"guid": "81a2dd7d-9ea7-46b4-ad68-b6df8960d5c8",
	"id": "85df714aa73e4af08d82237db135d6c5",
	"time": "2016-04-29T23:11:03.679Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```
