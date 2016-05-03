## Basal deliveryType: `temp`

**NB:** All fields are *required* unless otherwise noted.


> Jump to example JSON:

>  - [client example](#example-client)
>  - [ingestion example](#example-ingestion)
>  - [storage example](#example-storage)


### type

[ingestion, storage, client] The string `basal`.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes

<!-- start type -->

This is the sub-type of `basal` event that represents temporary intervals of basal insulin delivery requested by the user. Insulin pumps allow the request of a temporary basal insulin rate for a period of time up to twenty-four hours as a percentage of the current active rate or as a rate specified by the user. Some insulin pumps allow the user to set temporary basal rates *both* by percentage and by manual specification at the user's choice; other insulin pumps only expose one of these interfaces.

**Field co-occurrence requirements**: Note that when ingesting through the legacy jellyfish ingestion API, at least one of `percent` or `rate` must be provided on a `temp` basal. While each of these fields is marked as *optional*, one or the other **must** be present.

In contrast, under the new platform APIs, `rate` is always *required*.

<!-- end type -->

* * * * *

### deliveryType

[ingestion, storage, client] The string `temp`.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes

<!-- start deliveryType -->

<!-- end deliveryType -->

* * * * *

### duration

[ingestion, storage, client] An integer value representing a duration of time in milliseconds.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes
	Numerical type: Integer value representing milliseconds.
	Range:
		min: 0
		max: 86400000

<!-- start duration -->

Unlike on [`scheduled`](./scheduled.md) basals, both the legacy jellyfish ingestion API and the new platform APIs *require* a `duration` on every `temp` basal since an insulin pump user is always required to program a duration for a temporary basal rate interval along with the desired temporary rate (or percentage of active rate) itself.

The new platform APIs expect this value to be >= 0 and <= 86400000 (the number of milliseconds in twenty-four hours), as no pump manufacturer that we know of currently allows the programming of a temporary basal rate for longer than twenty-four hours.

<!-- end duration -->

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
		max: 86400000

#### Changelog for `expectedDuration`

`_schemaVersion` ? (future): `expectedDuration` is implemented as described in this documentation. If the `_schemaVersion` listed here is "? (future)," all data up to and including the current `_schemaVersion` has **not** implemented `expectedDuration` as described.

<!-- start expectedDuration -->

On a basal ingested through the legacy jellyfish ingestion service, `expectedDuration` should *never* be included on a `temp` basal event, but it may be added by jellyfish under circumstances where a new basal event results in truncation of the duration of the original `temp` basal; most commonly this new event is a `scheduled` (user chose to cancel the temporary rate) or a `suspend`. See the examples in [`previous`](./previous.md).

In Tidepool's new platform APIs (under active development as of April, 2016 at the time of the initial drafting of this document), the burden will be on the client to provide the `expectedDuration` where available and relevant, but it will never be a required field. Many insulin pumps provide information on the original programmed duration of a `temp` basal in the raw data and/or provide the programmed "time left" when a `temp` basal is canceled. Where this is true, the uploading client is expected to provide the `expectedDuration` in addition to the actual `duration` (if these two values differ) for a `temp` basal event.

<!-- end expectedDuration -->

* * * * *

### percent

> This field is **optional**.

[ingestion, storage, client] A floating point number >= 0 representing a percentage multiplier of the current basal rate to obtain the temp rate in units per hour.

	QUICK SUMMARY
	Required:
		jellyfish: no (optional)
		platform: no (optional)
	Numerical type: Floating point value representing a percentage, where 1.0 represents 100%.
	Range:
		min: 0.0
		max: 10.0

<!-- start percent -->

Different insulin pump manufacturers expose different interfaces for setting temporary basal rates by percentage—some express the change in terms of a positive or negative percentage *from* the current active rate, and some express the change in terms of an absolute percentage *of* the current active rate. For example, if the current active scheduled basal rate is 0.5 units per hour, a pump that represents the change as positive or negative from the current rate would implement a rate of 0.25 when the user programs a -50% temp basal and a rate of 0.75 when the user programs a +50% temp basal. On the other hand, a pump that represent the change as an absolute percentage of the current rate would require the user to input 50% to yield the 0.25 units per hour temporary rate and 150% to yield the 0.75 temporary rate.

For the Tidepool data model, we have standardized on a floating point representation of the second strategy. For us, the value 0.0 represents a temp basal at 0% of the current active rate, 0.5 at 50% of the current active rate (0.25 units per hour, in the example), 1.0 at a trivial 100% of current active rate (0.5 units per hour), 1.5 at 150% of the current active rate (0.75 units per hour), and so on. The upper limit of 10.0 (representing 1000% percent of the current active rate) was chosen arbitrarily as a common-sense upper bound; at least some pumps set their upper bound for temp basal rate increases much lower than this, for example at < 200% of the current active rate.

<!-- end percent -->

* * * * *

### previous

> This field is **optional** when ingesting data through the jellyfish service but will no longer exist when ingesting data through the new platform APIs.

[ingestion] An object representing the `basal` event just prior to this event or, equivalently, just the `id` of said object.

[storage, client] This field does not appear, as it is only used in processing during ingestion and not stored.

	QUICK SUMMARY
	Required:
		jellyfish: no (optional)
		platform: nonexistent

<!-- start previous -->

See [`previous`](./previous.md) for detailed documentation on this deprecated field.

<!-- end previous -->

* * * * *

### rate

> This field is **optional** when ingesting data through the jellyfish service but **required** when ingesting data through the new platform APIs.

[ingestion, storage, client] A floating point number >= 0 representing the amount of insulin delivered in units per hour.

	QUICK SUMMARY
	Required:
		jellyfish: no (optional)
		platform: yes
	Numerical type: Floating point value rounded to the appropriate significant figures for the device's precision.
	Range:
		min: 0.0
		max: 20.0

<!-- start rate -->

See [`rate`](./scheduled.md#rate) on the `scheduled` basals documentation for discussion of significant digits and rounding on basal rate values.

Also note that when ingesting data through the legacy jellyfish ingestion API, providing a `rate` is optional *as long as a `percent` and [`suppressed`](#suppressed) with its own `rate` are also provided*. In the new platform APIs, we are shifting the burden of calculating the `rate` of a percentage-programmed temp basal to the uploading client. (Most, if not all, insulin pump manufacturers provide the `rate` directly in their raw data models anyway.)

<!-- end rate -->

* * * * *

### suppressed

> This field is **optional**.

[ingestion, storage, client] An object representing another `basal` event - namely, the event that is currently suppressed (inactive) because this temp basal is in effect.

	QUICK SUMMARY
	Required:
		jellyfish: no (optional)
		platform: no (optional)

<!-- start suppressed -->

Depending on the data protocol, it is not always possible to keep track of what basal rate would have been in effect had a `temp` basal not been programmed by the user, but where this information is available, it should be provided in as much detail as possible as an embedded `basal` object as the value for the `suppressed` key on a `temp` basal.

This object need only contain the bare minimum of information:
- a `type` of `basal`
- a `deliveryType`, usually `scheduled`
- the `scheduleName` if relevant and available (see [`scheduleName`](./scheduled.md#schedulename) for more details)
- the suppressed [`rate`](./scheduled.md#rate) if relevant and available

In particular, note that *no time-related fields such as `time`, `deviceTime`, or `duration` are expected to appear on a `suppressed` embedded basal rate event*. By definition, any values for time-related fields are identical to the parent `temp` basal object, and so it is redundant to include them.

<!-- end suppressed -->

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
	"type": "basal",
	"deliveryType": "temp",
	"duration": 52200000,
	"expectedDuration": 62640000,
	"percent": 0.95,
	"rate": 0.95,
	"suppressed": {
		"type": "basal",
		"deliveryType": "scheduled",
		"scheduleName": "Very Active",
		"rate": 1
	},
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-04-26T11:00:00",
	"guid": "295a6b6f-dcdd-405f-8de4-c23037f895d4",
	"id": "ee6e431aaeed4c5cab7965ef0b3e3240",
	"time": "2016-04-26T18:00:00.000Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (ingestion)

```json
{
	"type": "basal",
	"deliveryType": "temp",
	"duration": 21600000,
	"expectedDuration": 25920000,
	"percent": 0.8,
	"previous": {
		"type": "basal",
		"deliveryType": "scheduled",
		"duration": 3600000,
		"rate": 0.375,
		"scheduleName": "Stress",
		"clockDriftOffset": 0,
		"conversionOffset": 0,
		"deviceId": "DevId0987654321",
		"deviceTime": "2016-04-26T10:00:00",
		"guid": "4368b23a-07da-4fbf-87a6-fe48b26520f6",
		"time": "2016-04-26T17:00:00.000Z",
		"timezoneOffset": -420,
		"uploadId": "SampleUploadId"
	},
	"rate": 0.45999999999999996,
	"suppressed": {
		"type": "basal",
		"deliveryType": "scheduled",
		"scheduleName": "Stress",
		"rate": 0.575
	},
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-04-26T11:00:00",
	"guid": "d63814d5-31d0-4593-b5a3-fd897223baf4",
	"time": "2016-04-26T18:00:00.000Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (storage)

```json
{
	"type": "basal",
	"deliveryType": "temp",
	"duration": 3600000,
	"expectedDuration": 4320000,
	"percent": 1,
	"rate": 0.175,
	"suppressed": {
		"type": "basal",
		"deliveryType": "scheduled",
		"scheduleName": "Vacation",
		"rate": 0.175
	},
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2016-04-26T18:00:05.000Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-04-26T11:00:00",
	"guid": "9059717d-3cab-4667-a11a-87d7d8e88e10",
	"id": "730fdceccef3480482d0505e87ffc77e",
	"time": "2016-04-26T18:00:00.000Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```
