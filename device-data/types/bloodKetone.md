<!-- auto-generated doc! most areas *not* editable -->

## Blood Ketones (`bloodKetone`)

**NB:** All fields are *required* unless otherwise noted.


> Jump to example JSON:

>  - [client example](#example-client)
>  - [ingestion example](#example-ingestion)
>  - [storage example](#example-storage)


### type

[ingestion, storage, client] The string `bloodKetone`.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes

<!-- start editable commentary on type -->

Blood ketones represent ketone concentration values (specifically beta-ketones, primarily beta-hydroxy butyric acid) obtained from a fingerstick meter capable of reading specialized blood ketone testing strips. Tidepool does not yet provide a data model for urine ketones, which are measured qualitatively, not quantitatively.

<!-- end editable commentary on type -->

* * * * *

### units

[ingestion, storage, client] The string `mmol/L`.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes

<!-- start editable commentary on units -->

<!-- end editable commentary on units -->

* * * * *

### value

[ingestion, storage, client] Blood ketone value in mmol/L (float), with appropriately matching `units` field.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes
	Numerical type: Floating point value representing a `mmol/L` value.
	Range:
		min: 0.0
		max: 10.0

<!-- start editable commentary on value -->

The most widely used blood ketone meter on the American market - the [Abbott Precision Xtra](https://www.abbottdiabetescare.com/precision-xtra 'Abbott Precision Xtra') yields `HI` for blood ketone values higher than 8.0 mmol/L. Using this as a ballpark value for the range of all current and future blood ketone meters, we have chosen 10.0 mmol/L as the maximum value that will be accepted by the new platform APIs.

<!-- end editable commentary on value -->

* * * * *

### clockDriftOffset

See [common fields](../common.md).

<!-- start editable commentary on clockDriftOffset -->
<!-- TODO -->
<!-- end editable commentary on clockDriftOffset -->

* * * * *

### conversionOffset

See [common fields](../common.md).

<!-- start editable commentary on conversionOffset -->
<!-- TODO -->
<!-- end editable commentary on conversionOffset -->

* * * * *

### deviceId

See [common fields](../common.md).

<!-- start editable commentary on deviceId -->
<!-- TODO -->
<!-- end editable commentary on deviceId -->

* * * * *

### deviceTime

See [common fields](../common.md).

<!-- start editable commentary on deviceTime -->
<!-- TODO -->
<!-- end editable commentary on deviceTime -->

* * * * *

### time

See [common fields](../common.md).

<!-- start editable commentary on time -->
<!-- TODO -->
<!-- end editable commentary on time -->

* * * * *

### timezoneOffset

See [common fields](../common.md).

<!-- start editable commentary on timezoneOffset -->
<!-- TODO -->
<!-- end editable commentary on timezoneOffset -->

* * * * *

### uploadId

See [common fields](../common.md).

<!-- start editable commentary on uploadId -->
<!-- TODO -->
<!-- end editable commentary on uploadId -->

* * * * *

### _active

See [common fields](../common.md).

<!-- start editable commentary on _active -->
<!-- TODO -->
<!-- end editable commentary on _active -->

* * * * *

### _groupId

See [common fields](../common.md).

<!-- start editable commentary on _groupId -->
<!-- TODO -->
<!-- end editable commentary on _groupId -->

* * * * *

### _schemaVersion

See [common fields](../common.md).

<!-- start editable commentary on _schemaVersion -->
<!-- TODO -->
<!-- end editable commentary on _schemaVersion -->

* * * * *

### _version

See [common fields](../common.md).

<!-- start editable commentary on _version -->
<!-- TODO -->
<!-- end editable commentary on _version -->

* * * * *

### createdTime

See [common fields](../common.md).

<!-- start editable commentary on createdTime -->
<!-- TODO -->
<!-- end editable commentary on createdTime -->

* * * * *

### guid

See [common fields](../common.md).

<!-- start editable commentary on guid -->
<!-- TODO -->
<!-- end editable commentary on guid -->

* * * * *

### id

See [common fields](../common.md).

<!-- start editable commentary on id -->
<!-- TODO -->
<!-- end editable commentary on id -->

* * * * *

### example (client)

```json
{
	"type": "bloodKetone",
	"units": "mmol/L",
	"value": 0.8,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-06-13T19:05:43",
	"guid": "ae40651d-b8e7-428e-840f-bbb3e1132569",
	"id": "55346384504b4b76b24c60a236448012",
	"time": "2016-06-14T02:05:43.500Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (ingestion)

```json
{
	"type": "bloodKetone",
	"units": "mmol/L",
	"value": 0.3,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-06-13T19:05:43",
	"time": "2016-06-14T02:05:43.501Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (storage)

```json
{
	"type": "bloodKetone",
	"units": "mmol/L",
	"value": 3.2,
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2016-06-14T02:05:48.502Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-06-13T19:05:43",
	"guid": "6d1ab0af-b3c5-4d3c-a491-b85fcd70b101",
	"id": "4642d3bb62cc46ad825564f28d2f2c26",
	"time": "2016-06-14T02:05:43.502Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```
