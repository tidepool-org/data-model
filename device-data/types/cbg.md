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
	Range: Must be one of:
		`mg/dL`
		`mmol/L`

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
	"value": 14.542959736539297,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-05-04T01:18:04",
	"guid": "cc094920-e2b6-4a80-9832-a6a1ee14115f",
	"id": "22d499a1053c4c2c9aac2e470c428e61",
	"time": "2016-05-04T08:18:04.889Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (ingestion)

```json
{
	"type": "cbg",
	"units": "mg/dL",
	"value": 525,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-05-04T01:18:04",
	"guid": "5931d0cf-03b7-48b6-89db-b8021454f31f",
	"time": "2016-05-04T08:18:04.889Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (storage)

```json
{
	"type": "cbg",
	"units": "mmol/L",
	"value": 6.050315310239632,
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2016-05-04T08:18:09.889Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-05-04T01:18:04",
	"guid": "81eae598-805c-448f-879d-a909d578ae75",
	"id": "4c150e1578874bf799f966c81f110309",
	"time": "2016-05-04T08:18:04.889Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```
