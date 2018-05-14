<!-- auto-generated doc! most areas *not* editable -->

## Device event subType: `reservoirChange`


> Jump to...(notable fields on this type)

>  - [type](#type)
>  - [subType](#subtype)
>  - [status](#status)

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

[ingestion] The `status` event logically connected with this event, or—for the legacy jellyfish data ingestion service *only*—optionally the `id` of the `status` event instead of the event itself.

[storage, client] The `id` of the `status` event logically connected with this event.

	QUICK SUMMARY
	Required:
		jellyfish: no (optional)
		platform: no (optional)

<!-- start editable commentary on status -->

As mentioned [above](#type), a `reservoirChange` event implies a stoppage of insulin delivery. On some insulin delivery devices, the data includes an explicit indication of this suspended state, but on devices where the event interpreted as a `reservoirChange` (whether that's a rewind of a syringe-style pump or a pod deactivation in the case of a patch-style pump, etc.) is the only event yielding information regarding the pump's insulin delivery status, a `status` event should be *fabricated* using the relevant information from the `reservoirChange` event (timestamp, log index, etc.) and embedded within the `reservoirChange` event in order to provide an audit trail of the user's data and preserve the close connection between the stored events.

See [linking events](../../linking-events.md) for additional details regarding inter-event linking in the Tidepool platform.

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
	"status": "e0c1998c36d643d49d09047833064314",
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2018-05-14T18:17:08",
	"guid": "075b8a5e-4404-4987-8df8-54d2fed20c09",
	"id": "8ce74bae4d294f058bbf96102b6b44f9",
	"time": "2018-05-14T08:17:08.453Z",
	"timezoneOffset": 600,
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
		"duration": 64800000,
		"expectedDuration": 77760000,
		"reason": {
			"suspended": "manual",
			"resumed": "manual"
		},
		"clockDriftOffset": 0,
		"conversionOffset": 0,
		"deviceId": "DevId0987654321",
		"deviceTime": "2018-05-14T18:17:08",
		"time": "2018-05-14T08:17:08.453Z",
		"timezoneOffset": 600,
		"uploadId": "SampleUploadId"
	},
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2018-05-14T18:17:08",
	"time": "2018-05-14T08:17:08.453Z",
	"timezoneOffset": 600,
	"uploadId": "SampleUploadId"
}
```

### example (storage)

```json
{
	"type": "deviceEvent",
	"subType": "reservoirChange",
	"status": "e50c3da3a35e47f2a8ef769406a0805d",
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2018-05-14T08:17:13.453Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2018-05-14T18:17:08",
	"guid": "96013c51-c2f5-4557-ad0b-479151cf0512",
	"id": "6e3ea4734056463f84f6be47621d21d7",
	"time": "2018-05-14T08:17:08.453Z",
	"timezoneOffset": 600,
	"uploadId": "SampleUploadId"
}
```
