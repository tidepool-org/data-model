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
	Range: Must be one of:
		`cannula`
		`tubing`

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
	"primeTarget": "cannula",
	"volume": "0.3",
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-05-04T01:18:05",
	"guid": "1b2a6adf-a594-45ec-9e5b-f3f339c2ae18",
	"id": "192a73f9b6a647a98c194331dff0c259",
	"time": "2016-05-04T08:18:05.459Z",
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
	"volume": 14.2,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-05-04T01:18:05",
	"guid": "1f69f32c-535d-44b2-b53b-e6d90c36ebe6",
	"time": "2016-05-04T08:18:05.459Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (storage)

```json
{
	"type": "deviceEvent",
	"subType": "prime",
	"primeTarget": "tubing",
	"volume": 13.5,
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2016-05-04T08:18:10.460Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-05-04T01:18:05",
	"guid": "0b56d26b-dfdb-4248-b1ce-b5ad5a225d21",
	"id": "eab3b8e0ac4f49059ba66705d1e8eb4c",
	"time": "2016-05-04T08:18:05.460Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```
