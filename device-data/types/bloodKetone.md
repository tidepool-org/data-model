## Blood Ketones (bloodKetone)

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

<!-- start type -->

Blood ketones represent ketone concentration values (specifically beta-ketones, primarily beta-hydroxy butyric acid) obtained from a fingerstick meter capable of reading specialized blood ketone testing strips. Tidepool does not yet provide a data model for urine ketones, which are measured qualitatively, not quantitatively.

<!-- end type -->

* * * * *

### units

[ingestion, storage, client] The string `mmol/L`.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes

<!-- start units -->

<!-- end units -->

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

<!-- start value -->

The most widely used blood ketone meter on the American market - the [Abbott Precision Xtra](https://www.abbottdiabetescare.com/precision-xtra 'Abbott Precision Xtra') yields `HI` for blood ketone values higher than 8.0 mmol/L. Using this as a ballpark value for the range of all current and future blood ketone meters, we have chosen 10.0 mmol/L as the maximum value that will be accepted by the new platform APIs.

<!-- end value -->

* * * * *

### clockDriftOffset

See [common fields](../common.md).

<!-- start clockDriftOffset -->
<!-- TODO -->
<!-- end clockDriftOffset -->

* * * * *

### conversionOffset

See [common fields](../common.md).

<!-- start conversionOffset -->
<!-- TODO -->
<!-- end conversionOffset -->

* * * * *

### deviceId

See [common fields](../common.md).

<!-- start deviceId -->
<!-- TODO -->
<!-- end deviceId -->

* * * * *

### deviceTime

See [common fields](../common.md).

<!-- start deviceTime -->
<!-- TODO -->
<!-- end deviceTime -->

* * * * *

### guid

See [common fields](../common.md).

<!-- start guid -->
<!-- TODO -->
<!-- end guid -->

* * * * *

### time

See [common fields](../common.md).

<!-- start time -->
<!-- TODO -->
<!-- end time -->

* * * * *

### timezoneOffset

See [common fields](../common.md).

<!-- start timezoneOffset -->
<!-- TODO -->
<!-- end timezoneOffset -->

* * * * *

### uploadId

See [common fields](../common.md).

<!-- start uploadId -->
<!-- TODO -->
<!-- end uploadId -->

* * * * *

### _active

See [common fields](../common.md).

<!-- start _active -->
<!-- TODO -->
<!-- end _active -->

* * * * *

### _groupId

See [common fields](../common.md).

<!-- start _groupId -->
<!-- TODO -->
<!-- end _groupId -->

* * * * *

### _schemaVersion

See [common fields](../common.md).

<!-- start _schemaVersion -->
<!-- TODO -->
<!-- end _schemaVersion -->

* * * * *

### _version

See [common fields](../common.md).

<!-- start _version -->
<!-- TODO -->
<!-- end _version -->

* * * * *

### createdTime

See [common fields](../common.md).

<!-- start createdTime -->
<!-- TODO -->
<!-- end createdTime -->

* * * * *

### id

See [common fields](../common.md).

<!-- start id -->
<!-- TODO -->
<!-- end id -->

* * * * *

### example (client)

```json
{
	"type": "bloodKetone",
	"units": "mmol/L",
	"value": 5,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-05-04T01:18:04",
	"guid": "2fb03c7f-4040-4e2f-a3a0-43474d4e20d9",
	"id": "d46136b10e964d308d3853b5fa7db708",
	"time": "2016-05-04T08:18:04.704Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (ingestion)

```json
{
	"type": "bloodKetone",
	"units": "mmol/L",
	"value": 4.3,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-05-04T01:18:04",
	"guid": "a46d3df5-48d6-49ad-b9b9-4a7c6c816b5d",
	"time": "2016-05-04T08:18:04.704Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (storage)

```json
{
	"type": "bloodKetone",
	"units": "mmol/L",
	"value": 0.9,
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2016-05-04T08:18:09.705Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-05-04T01:18:04",
	"guid": "8fb6f783-0a32-4b42-b0cf-444f2477d30d",
	"id": "bb579528b60f4ee9b9c76fa696340eaa",
	"time": "2016-05-04T08:18:04.705Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```
