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
	"status": "cd254b2b75d049a5898141e4dc9b1240",
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-06-13T19:05:45",
	"guid": "c7793678-1420-4825-9ca7-fb1d8e89e869",
	"id": "763f83bf1eb24baa85b6b6ee96d877f2",
	"time": "2016-06-14T02:05:45.079Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (ingestion)

```json
{
	"type": "deviceEvent",
	"subType": "reservoirChange",
	"status": "3ea3c7d72bcc4811917733d12ff3ebb7",
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-06-13T19:05:45",
	"time": "2016-06-14T02:05:45.080Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (storage)

```json
{
	"type": "deviceEvent",
	"subType": "reservoirChange",
	"status": "06c81b089b8f41dc99c98beb8405e38e",
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2016-06-14T02:05:50.080Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-06-13T19:05:45",
	"guid": "5c245e81-122f-4d2a-83a9-137a187c6c54",
	"id": "d9d6b1f4d699478bbb1f1a748d5994ac",
	"time": "2016-06-14T02:05:45.080Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```
