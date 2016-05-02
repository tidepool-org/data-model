## Continuous Blood Glucose (cbg)

**NB:** All fields are *required* unless otherwise noted.


> Jump to example JSON:

>  - [client example](#example-client)
>  - [ingestion example](#example-ingestion)
>  - [storage example](#example-storage)


### type

[ingestion, storage, client] The string `cbg`.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes

<!-- start type -->

This is the Tidepool data type for continuous glucose monitor (CGM) sensor data. `cbg` is an abbreviation of 'continuous blood glucose' and contrasts with `smbg`, abbreviating 'self-monitored blood glucose'. [`smbg`](smbg.md) is the Tidepool data type for traditional fingerstick blood glucose meter data.

Note that [`deviceTime`](#devicetime) is **optional** for this data type alone of all diabetes device data types that Tidepool ingests. This is due to the fact that we are now ingesting Dexcom G5 data via integration with Apple's HealthKit; since this data originates with a cellular- and/or Internet-connected iPhone operating as the receiver for a Dexcom G5 sensor, the only stored timestamp *is* a UTC-anchored timestamp, and there is no notion of a "receiver display time" as there is with earlier generations of Dexcom devices.

<!-- end type -->

* * * * *

### units

[ingestion] One of two string values: `mg/dL` or `mmol/L`.

[storage, client] The string `mmol/L`.

See [units](../units.md) for further explanation of blood glucose units.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes
	Range: Must be one of: `mg/dL`, `mmol/L`.

<!-- start units -->

<!-- end units -->

* * * * *

### value

[ingestion] Blood glucose value in either mg/dL (integer) or mmol/L (float), with appropriately matching `units` field.

[storage, client] Blood glucose value in mmol/L (float, potentially unrounded), with appropriately matching `units` field.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes
	Numerical type:
		mg/dL: Integer value representing a `mg/dL` value.
		mmol/L: Floating point value representing a `mmol/L` value.
	Range:
		mg/dL:
			min: 0
			max: 1000
		mmol/L:
			min: 0.0
			max: 55.0



<!-- start value -->

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

> This field is **optional**.


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
	"type": "cbg",
	"units": "mmol/L",
	"value": 33.026950546720926,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-04-28T11:18:05",
	"guid": "81064d4f-0047-4171-9f47-58d0c840921f",
	"id": "b8464da295e940eb94f09eafb0e32e18",
	"time": "2016-04-28T18:18:05.692Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (ingestion)

```json
{
	"type": "cbg",
	"units": "mg/dL",
	"value": 463,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-04-28T11:18:05",
	"guid": "0c8b932f-01bc-4fa1-8243-f5289e353387",
	"time": "2016-04-28T18:18:05.693Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (storage)

```json
{
	"type": "cbg",
	"units": "mmol/L",
	"value": 28.586352153884498,
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2016-04-28T18:18:10.693Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-04-28T11:18:05",
	"guid": "4b33f238-1052-4eb7-a553-24bc8d5cf50f",
	"id": "f50f97800f7e44a791ca0f17f223ab7b",
	"time": "2016-04-28T18:18:05.693Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```
