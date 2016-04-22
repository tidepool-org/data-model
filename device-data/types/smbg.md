## Self-Monitored Blood Glucose (smbg)

**NB:** All fields are *required* unless otherwise noted.


> Jump to example JSON:

>  - [client example](#example-client)
>  - [ingestion example](#example-ingestion)
>  - [storage example](#example-storage)


### type

[ingestion, storage, client] The string `smbg`.

This is the Tidepool data type for traditional fingerstick blood glucose meter data. `smbg` is an abbreviation of 'self-monitored blood glucose' and contrasts with `cbg`, abbreviating 'continuous blood glucose'. [`cbg`](cbg.md) is the Tidepool data type for continuous glucose monitor (CGM) sensor data.

<!-- end type -->

### subType

> This field is **optional**.

[ingestion, storage, client] String value encoding additional information about the source of the blood glucose value.

If present, must be one of: `manual`, `linked`.

`subType` appears on blood glucose values that are *not* being read directly from a traditional fingerstick blood glucose meter, but rather from another data source such as an insulin pump.

The value `manual` indicates that the blood glucose value was manually entered by a user (and is thus, of course, subject to human error).

The value `linked` indicates that the blood glucose value was transferred from a blood glucose meter to the pump directly via some sort of data transfer or pairing mechanism. If the blood glucose meter in question is also supported by the Tidepool uploader, duplicate records may exist: both read directly from the meter and pulled in as `subType: 'linked'` records from the insulin pump.

<!-- end subType -->

### units

[ingestion] One of two string values: `mg/dL` or `mmol/L`.

[storage, client] The string `mmol/L`.

See [units](../units.md) for further explanation of blood glucose units.

<!-- TODO -->
<!-- end units -->

### value

[ingestion] Blood glucose value in either mg/dL (integer) or mmol/L (float), with appropriately matching `units` field.

[storage, client] Blood glucose value in mmol/L (float, potentially unrounded), with appropriately matching `units` field.

<!-- TODO -->
<!-- end value -->

### _active

See [common fields](../common.md).

### _groupId

See [common fields](../common.md).

### _schemaVersion

See [common fields](../common.md).

### _version

See [common fields](../common.md).

### clockDriftOffset

See [common fields](../common.md).

### conversionOffset

See [common fields](../common.md).

### createdTime

See [common fields](../common.md).

### deviceId

See [common fields](../common.md).

### deviceTime

See [common fields](../common.md).

### guid

See [common fields](../common.md).

### id

See [common fields](../common.md).

### time

See [common fields](../common.md).

### timezoneOffset

See [common fields](../common.md).

### uploadId

See [common fields](../common.md).

### example (client)

```json
{
	"type": "smbg",
	"subType": "manual",
	"units": "mmol/L",
	"value": 19.927185287853465,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2015-12-03T00:26:47",
	"guid": "b2c1d8f7-e8e3-4fea-ab67-196c731bd225",
	"id": "822cb6b0ce704179993d26026393477c",
	"time": "2015-12-03T08:26:47.894Z",
	"timezoneOffset": -480,
	"uploadId": "SampleUploadId"
}
```

### example (ingestion)

```json
{
	"type": "smbg",
	"subType": "manual",
	"units": "mg/dL",
	"value": 330,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2015-12-03T00:26:47",
	"guid": "5a4680c8-0ece-469b-ad8b-4d8bf1f36f4e",
	"time": "2015-12-03T08:26:47.895Z",
	"timezoneOffset": -480,
	"uploadId": "SampleUploadId"
}
```

### example (storage)

```json
{
	"type": "smbg",
	"subType": "manual",
	"units": "mmol/L",
	"value": 18.42848333027117,
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2015-12-03T08:26:52.896Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2015-12-03T00:26:47",
	"guid": "8f127839-7b54-4627-abe0-8c5b0aa0ff8e",
	"id": "fac22501d1f244d9b595b5cb36c0559f",
	"time": "2015-12-03T08:26:47.896Z",
	"timezoneOffset": -480,
	"uploadId": "SampleUploadId"
}
```
