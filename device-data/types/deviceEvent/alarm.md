## Device event subType: `alarm`

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

<!-- start type -->

<!-- end type -->

* * * * *

### subType

[ingestion, storage, client] The string `alarm`.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes

<!-- start subType -->

The `alarm` sub-type of `deviceEvent` describes alerts and alarms that are surfaced to the user by insulin pumps and continuous glucose monitors.

<!-- end subType -->

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

<!-- start alarmType -->

The `alarmType`s built into the data model are all and only those alarms that are common to most, perhaps all, insulin pumps or continuous glucose monitors. At present, we have only modeled the set of alarms for insulin pumps, and this list is:

- `low_insulin` for low insulin reservoir alerts and alarms
- `no_insulin` for empty insulin reservoir alarms
- `low_power` for low battery or alerts and alarms
- `no_power` for dead battery alarms
- `occlusion` for alarms regarding the blockage of insulin infusion lines or sites
- `no_delivery` for alarms signaling any other stoppage of insulin delivery not due to empty reservoir, dead battery, or occlusion
- `auto_off` for when an insulin pump stops all insulin delivery due to inactivity for a duration over the user's programmed threshold, if any
- `over_limit` for when insulin delivery has surpassed any of a user's programmed maximum bolus, basal, or hourly delivery thresholds

Many if not all `alarm` events will include `payload` object with more information about the alarm that is device-specific. For example, a `low_insulin` alarm may have a `units_left` field in its `payload` to record the number of units of insulin that were remaining in the insulin pump's reservoir at the time of the alarm.

In addition, a `payload` object is *required* when `alarmType` is `other`, which is the `alarmType` value used to capture all alarms that are device-specific. For example, a pod expiration alarm is specific to the Insulet OmniPod insulin delivery system. The `payload` object should include all information that could be relevant to anyone wishing to audit the history and performance of the insulin pump in question.

For some devices, an alarm event (e.g., an occlusion alarm) is the **only** indication of a suspension of insulin delivery. In such a case, a [`status`](./status.md) event should also be uploaded to the platform and should be included (in its entirety) in the `status` field of the `alarm` event.

<!-- end alarmType -->

* * * * *

### status

> This field is **optional**.

[ingestion, storage, client] String `id` (or, equivalently, but just for the legacy jellyfish ingestion service, the object itself) of a type `deviceEvent`, subType `status` object that is logically connected to this alarm.

	QUICK SUMMARY
	Required:
		jellyfish: no (optional)
		platform: no (optional)

<!-- start status -->
<!-- TODO (discuss w/@gniezen first!) -->
<!-- end status -->

* * * * *

### clockDriftOffset

See [common fields](../../common.md).

<!-- start clockDriftOffset -->
<!-- TODO -->
<!-- end clockDriftOffset -->

* * * * *

### conversionOffset

See [common fields](../../common.md).

<!-- start conversionOffset -->
<!-- TODO -->
<!-- end conversionOffset -->

* * * * *

### deviceId

See [common fields](../../common.md).

<!-- start deviceId -->
<!-- TODO -->
<!-- end deviceId -->

* * * * *

### deviceTime

See [common fields](../../common.md).

<!-- start deviceTime -->
<!-- TODO -->
<!-- end deviceTime -->

* * * * *

### guid

See [common fields](../../common.md).

<!-- start guid -->
<!-- TODO -->
<!-- end guid -->

* * * * *

### time

See [common fields](../../common.md).

<!-- start time -->
<!-- TODO -->
<!-- end time -->

* * * * *

### timezoneOffset

See [common fields](../../common.md).

<!-- start timezoneOffset -->
<!-- TODO -->
<!-- end timezoneOffset -->

* * * * *

### uploadId

See [common fields](../../common.md).

<!-- start uploadId -->
<!-- TODO -->
<!-- end uploadId -->

* * * * *

### _active

See [common fields](../../common.md).

<!-- start _active -->
<!-- TODO -->
<!-- end _active -->

* * * * *

### _groupId

See [common fields](../../common.md).

<!-- start _groupId -->
<!-- TODO -->
<!-- end _groupId -->

* * * * *

### _schemaVersion

See [common fields](../../common.md).

<!-- start _schemaVersion -->
<!-- TODO -->
<!-- end _schemaVersion -->

* * * * *

### _version

See [common fields](../../common.md).

<!-- start _version -->
<!-- TODO -->
<!-- end _version -->

* * * * *

### createdTime

See [common fields](../../common.md).

<!-- start createdTime -->
<!-- TODO -->
<!-- end createdTime -->

* * * * *

### id

See [common fields](../../common.md).

<!-- start id -->
<!-- TODO -->
<!-- end id -->

* * * * *

### example (client)

```json
{
	"type": "deviceEvent",
	"subType": "alarm",
	"alarmType": "low_power",
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-05-04T01:18:05",
	"guid": "5ce288e6-5de2-44fe-acac-ca570f40e7d5",
	"id": "407e221141964090ab0bc3d78d9c0fc5",
	"time": "2016-05-04T08:18:05.084Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (ingestion)

```json
{
	"type": "deviceEvent",
	"subType": "alarm",
	"alarmType": "low_power",
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-05-04T01:18:05",
	"guid": "36d8502d-4854-4abe-ab90-494ca968b19c",
	"time": "2016-05-04T08:18:05.085Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (storage)

```json
{
	"type": "deviceEvent",
	"subType": "alarm",
	"alarmType": "low_power",
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2016-05-04T08:18:10.085Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-05-04T01:18:05",
	"guid": "bbf05cee-9fc3-484a-a67e-7dbc21ef3d22",
	"id": "2683fef8b841496984a5e9acb8338b31",
	"time": "2016-05-04T08:18:05.085Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```
