<!-- auto-generated doc! most areas *not* editable -->

## Self-Monitored Blood Glucose (`smbg`)


> Jump to...(notable fields on this type)

>  - [type](#type)
>  - [subType](#subtype)
>  - [units](#units)
>  - [value](#value)

**NB:** All fields are *required* unless otherwise noted.


> Jump to example JSON:

>  - [client example](#example-client)
>  - [ingestion example](#example-ingestion)
>  - [storage example](#example-storage)


### type

[ingestion, storage, client] The string `smbg`.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes

<!-- start editable commentary on type -->

This is the Tidepool data type for traditional fingerstick blood glucose meter data. `smbg` is an abbreviation of 'self-monitored blood glucose' and contrasts with `cbg`, abbreviating 'continuous blood glucose'. [`cbg`](cbg.md) is the Tidepool data type for continuous glucose monitor (CGM) sensor data.

<!-- end editable commentary on type -->

* * * * *

### subType

> This field is **optional**.

[ingestion, storage, client] String value encoding additional information about the source of the blood glucose value.

	QUICK SUMMARY
	Required:
		jellyfish: no (optional)
		platform: no (optional)
	Range: Must be one of:
		`manual`
		`linked`

<!-- start editable commentary on subType -->

`subType` appears on blood glucose values that are *not* being read directly from a traditional fingerstick blood glucose meter, but rather from another data source such as an insulin pump.

The value `manual` indicates that the blood glucose value was manually entered into the data source by a user (and is thus, of course, subject to human error).

The value `linked` indicates that the blood glucose value was transferred from a blood glucose meter to the pump directly via some sort of data transfer or pairing mechanism. If the blood glucose meter in question is also supported by the Tidepool uploader, duplicate records may exist: both read directly from the meter and pulled in as `subType: 'linked'` records from the insulin pump.

<!-- end editable commentary on subType -->

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
	"type": "smbg",
	"subType": "manual",
	"units": "mmol/L",
	"value": 2.331314156239124,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2018-05-14T18:17:09",
	"guid": "2e0f1338-1537-414b-baf7-3827b6185f23",
	"id": "d333e9c6af694b63bb2c2cf3595acc65",
	"time": "2018-05-14T08:17:09.177Z",
	"timezoneOffset": 600,
	"uploadId": "SampleUploadId"
}
```

### example (ingestion)

```json
{
	"type": "smbg",
	"subType": "manual",
	"units": "mg/dL",
	"value": 214,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2018-05-14T18:17:09",
	"time": "2018-05-14T08:17:09.177Z",
	"timezoneOffset": 600,
	"uploadId": "SampleUploadId"
}
```

### example (storage)

```json
{
	"type": "smbg",
	"subType": "linked",
	"units": "mmol/L",
	"value": 14.0433924173452,
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2018-05-14T08:17:14.177Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2018-05-14T18:17:09",
	"guid": "2bb717e7-af53-49b1-94b0-1d93c527d9bf",
	"id": "a4f3f4bce5724070bb1bd9a99ed88d35",
	"time": "2018-05-14T08:17:09.177Z",
	"timezoneOffset": 600,
	"uploadId": "SampleUploadId"
}
```
