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
	"value": 3,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-04-27T23:00:10",
	"guid": "6a90d165-ff18-4b4e-949b-15a6516af21f",
	"id": "55fa02e5800a434c9d9afae180a11069",
	"time": "2016-04-28T06:00:10.223Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (ingestion)

```json
{
	"type": "bloodKetone",
	"units": "mmol/L",
	"value": 0.5,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-04-27T23:00:10",
	"guid": "c5e6534f-6a2a-4d82-aa3d-fef86af41d9e",
	"time": "2016-04-28T06:00:10.224Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (storage)

```json
{
	"type": "bloodKetone",
	"units": "mmol/L",
	"value": 5,
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2016-04-28T06:00:15.224Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-04-27T23:00:10",
	"guid": "b4e026a6-c120-4fd8-9a6d-d2b1bd700577",
	"id": "d9d19a698a1a438ca69e6fc373d36a11",
	"time": "2016-04-28T06:00:10.224Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```
