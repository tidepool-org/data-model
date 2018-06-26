<!-- auto-generated doc! most areas *not* editable -->

## Blood Ketones (`bloodKetone`)


> Jump to...(notable fields on this type)

>  - [type](#type)
>  - [units](#units)
>  - [value](#value)

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

Blood ketones represent ketone concentration values (specifically beta-ketones, primarily beta-hydroxy butyric acid) obtained from a fingerstick meter capable of reading specialized blood ketone testing strips. <!-- Edit by Eden: Description of ketones?, e.g. 'Ketones are... ' -->Tidepool does not yet provide a data model for urine ketones, which are measured qualitatively, not quantitatively.

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
	"value": 4.2,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2018-05-14T18:17:07",
	"guid": "14e3eca2-3e38-41f9-83ce-76ec01300b85",
	"id": "7f856a61e20045d1a8b6e0c4ada4ce69",
	"time": "2018-05-14T08:17:07.211Z",
	"timezoneOffset": 600,
	"uploadId": "SampleUploadId"
}
```

### example (ingestion)

```json
{
	"type": "bloodKetone",
	"units": "mmol/L",
	"value": 4.6,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2018-05-14T18:17:07",
	"time": "2018-05-14T08:17:07.212Z",
	"timezoneOffset": 600,
	"uploadId": "SampleUploadId"
}
```

### example (storage)

```json
{
	"type": "bloodKetone",
	"units": "mmol/L",
	"value": 0.5,
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2018-05-14T08:17:12.212Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2018-05-14T18:17:07",
	"guid": "602c5ebf-fd85-4972-b874-3d6f13d88166",
	"id": "38f80bd338e54522870c9ff8cf5f375d",
	"time": "2018-05-14T08:17:07.212Z",
	"timezoneOffset": 600,
	"uploadId": "SampleUploadId"
}
```
