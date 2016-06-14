<!-- auto-generated doc! most areas *not* editable -->

## Device event subType: `reservoirChange`

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

<!-- end editable commentary on type -->

* * * * *

### subType

[ingestion, storage, client] The string `reservoirChange`.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes

<!-- start editable commentary on subType -->

A `reservoirChange` event represents any event in an insulin delivery system that implies a return to a device state not yet ready to deliver insulin. This varies depending on the type of insulin delivery device. For conventional insulin pumps with syringe-like reservoirs, this will be a rewind event. For an Insulet OmniPod system, it is a pod deactivation event.

This event often implies a suspension of insulin delivery; in the case that the device data includes an event that fits into this `reservoirChange` data model but *does not* include a separate indication of insulin delivery suspension, a [`status`](./status.md) event should also be uploaded to the platform to record the suspension of insulin delivery and should be included (in its entirety) in the `status` field.

The optional `payload` embedded object may be included in order to expose the specifics of the event type that is being interpreted more generally as a `reservoirChange`, along with any other device-specific information that may be desirable for auditing user and device behavior and performance.

<!-- end editable commentary on subType -->

* * * * *

### status

> This field is **optional**.

[ingestion, storage, client] String `id` (or, equivalently, but just for the legacy jellyfish ingestion service, the object itself) of a type `deviceEvent`, subType `status` object that is logically connected to this reservoirChange.

	QUICK SUMMARY
	Required:
		jellyfish: no (optional)
		platform: no (optional)

<!-- start editable commentary on status -->
<!-- TODO -->
<!-- end editable commentary on status -->

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
	"subType": "reservoirChange",
	"status": "921bab64eb1a492ca8af11ab4f24a832",
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-06-13T19:22:56",
	"guid": "14ac812f-96f2-45e6-9a20-aa5d6d8acd26",
	"id": "d14ed2262335498193154dbebf3ed0a7",
	"time": "2016-06-14T02:22:56.459Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (ingestion)

```json
{
	"type": "deviceEvent",
	"subType": "reservoirChange",
	"status": {
		"type": "deviceEvent",
		"subType": "status",
		"status": "suspended",
		"duration": 30600000,
		"expectedDuration": 36720000,
		"reason": {
			"suspended": "automatic",
			"resumed": "automatic"
		},
		"clockDriftOffset": 0,
		"conversionOffset": 0,
		"deviceId": "DevId0987654321",
		"deviceTime": "2016-06-13T19:22:56",
		"time": "2016-06-14T02:22:56.461Z",
		"timezoneOffset": -420,
		"uploadId": "SampleUploadId"
	},
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-06-13T19:22:56",
	"time": "2016-06-14T02:22:56.460Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (storage)

```json
{
	"type": "deviceEvent",
	"subType": "reservoirChange",
	"status": "fe26e772de0b4472919349c12820fda4",
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2016-06-14T02:23:01.461Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-06-13T19:22:56",
	"guid": "fa849fa5-6ece-43a0-a7b1-2aadbfab469a",
	"id": "4b8be50c2d5d441399c7495128231f97",
	"time": "2016-06-14T02:22:56.461Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```
