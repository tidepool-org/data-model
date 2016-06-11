<!-- auto-generated doc! most areas *not* editable -->

## Device event subType: `status`

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

[ingestion, storage, client] The string `status`.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes

<!-- start editable commentary on subType -->

This is the Tidepool data type for an insulin pump's insulin delivery status, basically only used to represent suspensions of insulin delivery—intervals of time when neither bolus or basal insulin was delivered by an insulin pump. When a user suspends an insulin pump or, alternatively, when the pump suspends itself for some reason automatically, any bolus currently in progress is terminated, resulting in a partially delivered bolus[^a], and the basal constant drip of background insulin is also stopped.

In the same way that suspensions of insulin delivery can be either manual (programmed by the user) or automatic, the resumption of insulin delivery can be the result of user action or automatic.

<!-- end editable commentary on subType -->

* * * * *

### status

[ingestion] String value encoding insulin pump status as `suspended` or `resumed`.

[storage, client] The string `suspended`.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes
	Range:
		jellyfish: Must be one of:
			`suspended`
			`resumed`
		platform: The string `suspended`.

<!-- start editable commentary on status -->

An insulin pump can only be in one of two insulin delivery states: normal operation or `suspended`.

The legacy jellyfish ingestion service accepted data with two possible values for `status`: `suspended` or `resumed`. The service then looked for tuples of events starting with a `suspended` and concluding with a `resumed`, merging each tuple into a single `suspended` event with a duration calculated from the timestamps of all included events. Events were chained together by embedding the immediately preceding `status` event inside each new `status` event in a `previous` field. See [this document on the `previous` field](./previous.md) on status events for a detailed explanation of this soon-to-be-deprecated system.

In Tidepool's new platform APIs under construction at the time of the drafting of this documentation in June, 2016, the only accepted value for the `status` field is `suspended`.

<!-- end editable commentary on status -->

* * * * *

### duration

> This field is **optional** when ingesting data through the jellyfish service but **required** when ingesting data through the new platform APIs.

[ingestion, storage, client] An integer value representing a duration of time in milliseconds.

	QUICK SUMMARY
	Required:
		jellyfish: no (optional)
		platform: yes
	Numerical type: Integer value representing milliseconds.
	Range:
		min: 0
		max: < ∞

<!-- start editable commentary on duration -->

When ingesting data through the legacy jellyfish data ingestion service, `duration` is optional because jellyfish also uses the *sequence* of pump status events to determine their durations (in particular the duration of suspensions) - see [`previous`](./previous.md) for details.

In Tidepool's new platform APIs (under active development as of June, 2016 at the time of the initial drafting of this document), the `duration` field will be required on all `status` events. In essence, we are moving to a system that places the burden on the client uploading data to determine the duration of suspensions of insulin delivery based on the sequence of suspend and resume events.

There is no upper bound on the value of the `duration` for suspensions of insulin delivery because there is no upper bound on this value in reality: a user may switch between different insulin delivery devices or go on a "pump vacation" and thus leave a particular device in the suspended mode for an arbitrary duration of time counted in days, weeks, or even months.

<!-- end editable commentary on duration -->

* * * * *

### expectedDuration

> This field is **optional**. At present, it is **only** added by the jellyfish data ingestion service.

[storage, client] An integer value representing an original programmed duration of time in milliseconds, copied from the `duration` field on ingestion when a following event has resulted in truncation of the original programmed duration.

	QUICK SUMMARY
	Required:
		jellyfish: no (optional)
		platform: no (optional)
	Numerical type: Integer value representing milliseconds.
	Range:
		min: > `duration`
		max: < ∞

<!-- start editable commentary on expectedDuration -->

The majority of insulin delivery devices do *not* provide an interface for scheduling suspensions of insulin delivery such that the insulin pump will automatically resume at the conclusion of the scheduled time period. However, the Insulet OmniPod insulin delivery system does provide an interface of this kind. It is thus only for an OmniPod system that it is possible - though still optional - for an `expectedDuration` field to appear. When this field is present, the value of `expectedDuration` is the original user-programmed duration for the suspension of insulin delivery, and the `duration` of the event will have a smaller value representing the *actual* elapsed time of the suspension, which must have been canceled by the user prior to its scheduled conclusion.

Note that there is one common workflow that will result in the early cancellation of a scheduled suspension of insulin delivery for OmniPod users: in order to change the device's display date & time on an OmniPod system, it is necessary to suspend the device (by scheduling a suspension of insulin delivery).

<!-- end editable commentary on expectedDuration -->

* * * * *

### reason

[ingestion, storage, client] An object with two key-value pairs encoding the cause of a `suspended` or `resumed` event as `manual` (user-initiated) or `automatic` (pump-initiated).

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes
	Range: Must be one of:
		`manual`
		`automatic`

<!-- start editable commentary on reason -->

The `reason` is a simplified indication of why the pump delivery status changed, both on suspension of insulin delivery and on resumption. In the legacy jellyfish system (described in detail in [`previous`](./previous.md)), `reason` is an object with one key-value pair, either a key `suspended` with possible values `manual` or `automatic` or `resumed` with the sample possible values. As part of the ingestion process, jellyfish will collect the `reason`s for suspension and resumption into a single `reason` object with both key-value pairs in the final form of the event stored in the database.

On the other hand, when pushing up data through the new platform APIs, the `reason` object should include both the `suspended` and `resumed` keys with possible values of `manual` and `automatic` for each.

We define `manual` suspension or resumption as any user-initiated method of effecting these states, and we define `automatic` as anything *not* user-initiated. One type of `automatic` suspension (and potentially also later resumption) occurs on insulin pumps that include a low-glucose suspend feature whereby the pump, when "listening" to data from a blood glucose sensor (i.e., [`cbg`](../cbg.md) data), suspends insulin delivery if the blood glucose values in the data stream either drop below a certain threshold or are predicted to soon drop below the threshold. The insulin delivery device may also automatically resume from the suspended state in response to rising blood glucose values or after a certain amount of time has elapsed.

By convention, we also include more device-specific information about the cause of suspensions and resumptions, if available, in the optional `payload` embedded object on the event. For example, in the case of the Medtronic 530G insulin pumps with the low-glucose suspend (LGS) feature, there is a distinction between circumstances[^a] in which the pump resumes from an LGS suspension automatically after two hours depending on whether the user interacted with any of the LGS alarms during the duration of the suspension. We represent this distinction on the event in the payload as follows (specifically in the `user_intervention` key under `resumed`):

```json
{
	...
	"reason": {
		"suspended": "automatic",
		"resumed": "automatic"
	},
	"payload": {
		"suspended": {
			"cause": "low_glucose",
			"threshold": 80
		},
		"resumed": {
			"cause": "timed_out",
			"user_intervention": "ignored"
		}
	}
	...
}
```

<!-- end editable commentary on reason -->

* * * * *

### previous

> This field is **optional** when ingesting data through the jellyfish service but will no longer exist when ingesting data through the new platform APIs.

[ingestion] An object representing the `status` event just prior to this event or, equivalently, just the `id` of said object.

[storage, client] This field does not appear, as it is only used in processing during ingestion and not stored.

	QUICK SUMMARY
	Required:
		jellyfish: no (optional)
		platform: nonexistent

<!-- start editable commentary on previous -->

See [`previous`](./previous.md) for detailed documentation on this deprecated field.

<!-- end editable commentary on previous -->

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

### guid

See [common fields](../../common.md).

<!-- start editable commentary on guid -->
<!-- TODO -->
<!-- end editable commentary on guid -->

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
	"subType": "status",
	"status": "suspended",
	"duration": 64800000,
	"expectedDuration": 77760000,
	"reason": {
		"suspended": "manual",
		"resumed": "automatic"
	},
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-05-04T01:18:05",
	"guid": "c6167608-a489-42db-98af-ccf3e9251d9a",
	"id": "961dd4e8b3d54ae19088964141f55f8f",
	"time": "2016-05-04T08:18:05.836Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (ingestion)

```json
{
	"type": "deviceEvent",
	"subType": "status",
	"status": "suspended",
	"duration": 37800000,
	"expectedDuration": 45360000,
	"reason": {
		"suspended": "manual",
		"resumed": "automatic"
	},
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-05-04T01:18:05",
	"guid": "252abbf0-4a11-4dcf-8f55-dd1519d71cda",
	"time": "2016-05-04T08:18:05.837Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (storage)

```json
{
	"type": "deviceEvent",
	"subType": "status",
	"status": "suspended",
	"duration": 19800000,
	"expectedDuration": 23760000,
	"reason": {
		"suspended": "manual",
		"resumed": "manual"
	},
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2016-05-04T08:18:10.837Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-05-04T01:18:05",
	"guid": "468168ab-a4f9-46e2-a6f9-81a38782ce45",
	"id": "d40e0dcf7df543f2be93aa53b35cd9df",
	"time": "2016-05-04T08:18:05.837Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

[^a]: Specifically determining whether or not a temp basal that was in effect before the automatic suspension is resumed or not (assuming it's programmed duration would have it still be in effect). If the user did not interact with any of the alerts during the automatic suspension, the temp basal is *not* resumed. If the user did acknowledge the automatic suspension, however, a temp basal that would still be in effect *is* resumed at the conclusion of two hours of suspension. This is explained on pages 124-125 of [the Medtronic 530G user manual](http://www.accessdata.fda.gov/cdrh_docs/pdf12/p120010c.pdf 'Medtronic 530G user manual').
