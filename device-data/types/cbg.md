<!-- auto-generated doc! most areas *not* editable -->

## Continuous Blood Glucose (`cbg`)

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

<!-- start editable commentary on type -->

This is the Tidepool data type for continuous glucose monitor (CGM) sensor data. `cbg` is an abbreviation of 'continuous blood glucose' and contrasts with `smbg`, abbreviating 'self-monitored blood glucose'. [`smbg`](smbg.md) is the Tidepool data type for traditional fingerstick blood glucose meter data.

Note that [`deviceTime`](#devicetime) is **optional** for this data type alone of all diabetes device data types that Tidepool ingests. This is due to the fact that we are now ingesting Dexcom G5 data via integration with Apple's HealthKit; since this data originates with a cellular- and/or Internet-connected iPhone operating as the receiver for a Dexcom G5 sensor, the only stored timestamp *is* a UTC-anchored timestamp, and there is no notion of a "receiver display time" as there is with earlier generations of Dexcom devices.

<!-- end editable commentary on type -->

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

<!-- start editable commentary on units -->

<!-- end editable commentary on units -->

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



<!-- start editable commentary on value -->

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

> This field is **optional**.


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
	"type": "cbg",
	"units": "mmol/L",
	"value": 24.811843519973536,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-06-13T19:05:43",
	"guid": "cf64b6f6-54af-4e8b-a432-08d53c2484d4",
	"id": "da34f6f278984ae385c91cac6b91eff7",
	"time": "2016-06-14T02:05:43.959Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (ingestion)

```json
{
	"type": "cbg",
	"units": "mg/dL",
	"value": 355,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-06-13T19:05:43",
	"time": "2016-06-14T02:05:43.960Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (storage)

```json
{
	"type": "cbg",
	"units": "mmol/L",
	"value": 26.088515557914008,
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2016-06-14T02:05:48.960Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-06-13T19:05:43",
	"guid": "4f734593-cd73-4d00-9406-e51b71173b3c",
	"id": "058811d6b8b94063b4f177668f6022f8",
	"time": "2016-06-14T02:05:43.960Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```
