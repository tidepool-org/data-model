<!-- auto-generated doc! most areas *not* editable -->

## Device event subType: `timeChange`


> Jump to...(notable fields on this type)

>  - [type](#type)
>  - [subType](#subtype)
>  - [change](#change)

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

<!-- start editable commentary on type -->
<!-- Added by Eden: TODO -->
<!-- end editable commentary on type -->

* * * * *

### subType

[ingestion, storage, client] The string `timeChange`.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes

<!-- start editable commentary on subType -->

A `timeChange` event represents an instance when a diabetes device user changed the display date and/or time settings on the device. <!-- Note by Eden: Really hard to follow the following sentence gramatically (just because its so long and has so many branch offs) -->Having an accurate history of `timeChange` events is crucial to Tidepool's "bootstrapping to UTC" (BtUTC) procedure which, to summarize *very* briefly, uses the set of `timeChange` events from a device, in combination with the raw log indices of the device's records and the user's selection (from an interface in the Tidepool uploader) of the timezone that aligns with the most recent data on the device, to translate the *relative* (local time) timestamps of the device records into UTC timestamps, so that all device records from many different diabetes devices can be aligned on the same timeline. For further information, please see [the technical documentation for BtUTC](http://developer.tidepool.io/chrome-uploader/docs/BootstrappingToUTC.html 'Tidepool Docs: BtUTC').

All the relevant data from the `timeChange` event is stored in various fields on an embedded `change` object, documented in the next section.

<!-- end editable commentary on subType -->

* * * * *

### change

[ingestion, storage, client] An object encoding as much information as possible about a diabetes device display time change event.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes
Contains the following properties:

 * from
 * to
 * agent

#### change.from

[ingestion, storage, client] An ISO 8601 formatted timestamp *without* any timezone offset information—e.g., `2018-05-14T08:17:08`.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes
	Range:
		min: 2007-01-01T00:00:00
		max: none

#### change.to

[ingestion, storage, client] An ISO 8601 formatted timestamp *without* any timezone offset information—e.g., `2018-05-14T08:17:08`.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes
	Range:
		min: 2007-01-01T00:00:00
		max: none

#### change.agent

[ingestion, storage, client] A string encoding the agent of the diabetes device display time change event.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes
	Range: Must be one of:
		`manual`
		`automatic`

<!-- start editable commentary on change -->

Within the `change` embedded object on a `timeChange` event, the date & time displayed on the device *before* the user changed it is stored in the `from` field, while the date & time resulting from the change is stored in the `to` field. Both the `from` and `to` properties are formatted as ISO 8601 timestamps without any offset from UTC specified; this is the exact same "relative" timestamp format used for `deviceTime` and documented on [the section for `deviceTime`](../../common.md#devicetime) on the page for common fields.

The `agent` field on the `change` object describes the source of the change as either `manual` (the user) or `automatic` (the device). This field is required. At present, we know of no devices that include a timezone in the device settings and automatically change to and from daylight saving(s) time, but we expect (and hope!) that this may happen in the near future as Bluetooth-communicating devices that are continuously connected to timezone-locatable mobile phones enter the market.

<!-- end editable commentary on change -->

* * * * *

### clockDriftOffset

See [common fields](../../common.md).

<!-- start editable commentary on clockDriftOffset -->
<!-- TODO -->
<!-- end editable commentary on clockDriftOffset -->

* * * * *

### conversionOffset

See [common fields](../../common.md).

<!-- start editable commentary on conversionOffset -->
<!-- TODO -->
<!-- end editable commentary on conversionOffset -->

* * * * *

### deviceId

See [common fields](../../common.md).

<!-- start editable commentary on deviceId -->
<!-- TODO -->
<!-- end editable commentary on deviceId -->

* * * * *

### deviceTime

See [common fields](../../common.md).

<!-- start editable commentary on deviceTime -->
<!-- TODO -->
<!-- end editable commentary on deviceTime -->

* * * * *

### time

See [common fields](../../common.md).

<!-- start editable commentary on time -->
<!-- TODO -->
<!-- end editable commentary on time -->

* * * * *

### timezoneOffset

See [common fields](../../common.md).

<!-- start editable commentary on timezoneOffset -->
<!-- TODO -->
<!-- end editable commentary on timezoneOffset -->

* * * * *

### uploadId

See [common fields](../../common.md).

<!-- start editable commentary on uploadId -->
<!-- TODO -->
<!-- end editable commentary on uploadId -->

* * * * *

### _active

See [common fields](../../common.md).

<!-- start editable commentary on _active -->
<!-- TODO -->
<!-- end editable commentary on _active -->

* * * * *

### _groupId

See [common fields](../../common.md).

<!-- start editable commentary on _groupId -->
<!-- TODO -->
<!-- end editable commentary on _groupId -->

* * * * *

### _schemaVersion

See [common fields](../../common.md).

<!-- start editable commentary on _schemaVersion -->
<!-- TODO -->
<!-- end editable commentary on _schemaVersion -->

* * * * *

### _version

See [common fields](../../common.md).

<!-- start editable commentary on _version -->
<!-- TODO -->
<!-- end editable commentary on _version -->

* * * * *

### createdTime

See [common fields](../../common.md).

<!-- start editable commentary on createdTime -->
<!-- TODO -->
<!-- end editable commentary on createdTime -->

* * * * *

### guid

See [common fields](../../common.md).

<!-- start editable commentary on guid -->
<!-- TODO -->
<!-- end editable commentary on guid -->

* * * * *

### id

See [common fields](../../common.md).

<!-- start editable commentary on id -->
<!-- TODO -->
<!-- end editable commentary on id -->

* * * * *

### example (client)

```json
{
	"type": "deviceEvent",
	"subType": "timeChange",
	"change": {
		"from": "2018-05-14T08:17:08",
		"to": "2018-05-14T07:20:33",
		"agent": "manual"
	},
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2018-05-14T18:17:08",
	"guid": "7a91b3bc-2808-4c92-8769-3526db11ce41",
	"id": "0ccaad06f9104c098595cf6e871edc09",
	"time": "2018-05-14T08:17:08.814Z",
	"timezoneOffset": 600,
	"uploadId": "SampleUploadId"
}
```

### example (ingestion)

```json
{
	"type": "deviceEvent",
	"subType": "timeChange",
	"change": {
		"from": "2018-05-14T08:17:08",
		"to": "2018-05-14T07:20:33",
		"agent": "manual"
	},
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2018-05-14T18:17:08",
	"time": "2018-05-14T08:17:08.815Z",
	"timezoneOffset": 600,
	"uploadId": "SampleUploadId"
}
```

### example (storage)

```json
{
	"type": "deviceEvent",
	"subType": "timeChange",
	"change": {
		"from": "2018-05-14T08:17:08",
		"to": "2018-05-14T07:20:33",
		"agent": "manual"
	},
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2018-05-14T08:17:13.815Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2018-05-14T18:17:08",
	"guid": "2f17e38d-a39a-4116-a11c-5f014ea9ddd4",
	"id": "8f3abbd0fe4f49879f1bd8b2356c1942",
	"time": "2018-05-14T08:17:08.815Z",
	"timezoneOffset": 600,
	"uploadId": "SampleUploadId"
}
```
