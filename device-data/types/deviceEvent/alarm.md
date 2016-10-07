<!-- auto-generated doc! most areas *not* editable -->

## Device event subType: `alarm`


> Jump to...(notable fields on this type)

>  - [type](#type)
>  - [subType](#subtype)
>  - [alarmType](#alarmtype)
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

[ingestion, storage, client] The string `alarm`.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes

<!-- start editable commentary on subType -->

The `alarm` sub-type of `deviceEvent` describes alerts and alarms that are surfaced to the user by insulin pumps and continuous glucose monitors.

<!-- end editable commentary on subType -->

* * * * *

### alarmType

[ingestion, storage, client] String value encoding the type of alarm, with `other` as the catch-all/default category.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes
	Range: Must be one of:
		`low_insulin`
		`no_insulin`
		`low_power`
		`no_power`
		`occlusion`
		`no_delivery`
		`auto_off`
		`over_limit`
		`other`

<!-- start editable commentary on alarmType -->

The `alarmType`s built into the data model are all and only those alarms that are common to most, perhaps all, insulin pumps or continuous glucose monitors. At present, we have only modeled the set of alarms for insulin pumps, and this list is:

- `low_insulin` for low insulin reservoir alerts and alarms
- `no_insulin` for empty insulin reservoir alarms
- `low_power` for low battery or alerts and alarms
- `no_power` for dead battery alarms
- `occlusion` for alarms regarding the blockage of insulin infusion lines or sites
- `no_delivery` for alarms signaling any other stoppage of insulin delivery when a more precise cause (such as an occlusion or empty reservoir) is not indicated by the pump
- `auto_off` for when an insulin pump stops all insulin delivery due to inactivity for a duration over the user's programmed threshold, if any
- `over_limit` for when insulin delivery has surpassed any of a user's programmed maximum bolus, basal, or hourly delivery thresholds

Many if not all `alarm` events will include `payload` object with more information about the alarm that is device-specific. For example, a `low_insulin` alarm may have a `units_left` field in its `payload` to record the number of units of insulin that were remaining in the insulin pump's reservoir at the time of the alarm.

In addition, a `payload` object is *required* when `alarmType` is `other`, which is the `alarmType` value used to capture all alarms that are device-specific. For example, a pod expiration alarm is specific to the Insulet OmniPod insulin delivery system. The `payload` object should include all information that could be relevant to anyone wishing to audit the history and performance of the insulin pump in question.

On some pumps `no_delivery` may include all stoppages of delivery. That is, it may not always be possible to distinguish between empty reservoirs and occlusions.

For some devices, an alarm event (e.g., an occlusion alarm) is the **only** indication of a suspension of insulin delivery. In such a case, a [`status`](./status.md) event should also be uploaded to the platform and should be included (in its entirety) in the `status` field of the `alarm` event.

<!-- end editable commentary on alarmType -->

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

Some `alarmType`s are correlated with a stoppage of insulin delivery. Specifically, we assume that all of the following alarms correspond to a period of no insulin delivery on the insulin pump—that is, a period of time when the pump's delivery status is "suspended":

- `no_insulin`
- `no_power`
- `occlusion`
- `no_delivery`
- `auto_off`

Some insulin pumps do include in their data protocols a separate indication of this stoppage of insulin delivery elsewhere than just the `alarm` event. Some insulin pumps, however, do not separately indicate the change in the pump's insulin delivery status. For such devices, a `status` event should be *fabricated* using the relevant information from the `alarm` event (timestamp, log index, etc.). In order to provide an audit trail of the user's processed and standardized data, we then embed this `status` event in the originating `alarm` to preserve the close connection between the events.

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
	"subType": "alarm",
	"alarmType": "no_insulin",
	"status": "72a1d78fcfaf42e2bd9acf6b7f6a9d5e",
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-06-13T19:22:53",
	"guid": "8de2f14e-3c7e-4383-b340-1b03611176aa",
	"id": "b99f679a41b446cb96f42ba464f38fa1",
	"time": "2016-06-14T02:22:53.389Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (ingestion)

```json
{
	"type": "deviceEvent",
	"subType": "alarm",
	"alarmType": "no_power",
	"status": {
		"type": "deviceEvent",
		"subType": "status",
		"status": "suspended",
		"duration": 36000000,
		"expectedDuration": 43200000,
		"reason": {
			"suspended": "automatic",
			"resumed": "automatic"
		},
		"clockDriftOffset": 0,
		"conversionOffset": 0,
		"deviceId": "DevId0987654321",
		"deviceTime": "2016-06-13T19:22:53",
		"time": "2016-06-14T02:22:53.390Z",
		"timezoneOffset": -420,
		"uploadId": "SampleUploadId"
	},
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-06-13T19:22:53",
	"time": "2016-06-14T02:22:53.390Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (storage)

```json
{
	"type": "deviceEvent",
	"subType": "alarm",
	"alarmType": "low_insulin",
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2016-06-14T02:22:58.390Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-06-13T19:22:53",
	"guid": "1d38f044-d55d-4eee-ba75-1a205e0b0b1b",
	"id": "5f8976330df5477cafabfce0a397992b",
	"time": "2016-06-14T02:22:53.390Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```
