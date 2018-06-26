<!-- auto-generated doc! most areas *not* editable -->

## Insulin pump settings (`pumpSettings`)


> Jump to...(notable fields on this type)

>  - [type](#type)
>  - [activeSchedule](#activeschedule)
>  - [basalSchedules](#basalschedules)
>  - [bgTarget](#bgtarget)
>  - [bgTargets](#bgtargets)
>  - [carbRatio](#carbratio)
>  - [carbRatios](#carbratios)
>  - [insulinSensitivity](#insulinsensitivity)
>  - [insulinSensitivities](#insulinsensitivities)
>  - [units](#units)

**NB:** All fields are *required* unless otherwise noted.


> Jump to example JSON:

>  - [client example](#example-client)
>  - [ingestion example](#example-ingestion)
>  - [storage example](#example-storage)


### type

[ingestion, storage, client] The string `pumpSettings`.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes

<!-- start editable commentary on type -->

This is the Tidepool data type to represent insulin pump settings at a given point in time, usually the time of an upload of data from the device. Most insulin delivery devices do **not**, unfortunately, keep a historical record of all insulin pump settings when a settings change is made. When ingesting data from Medtronic pumps through the CareLink cloud service, we have been able to build up the full insulin pump settings history from a combination of records of current pump settings (at the time of each upload to CareLink) and records of changes to particular settings. Thus, for data originating from CareLink, the `time` on a `pumpSettings` object should represent the time at which the settings *became* effective. For all other devices, however, the `time` on each `pumpSettings` object simply represents *a (single)* time when the settings were in effect, not the first moment when the settings were put into effect.

In general, the functionality available across the various insulin pumps on the market is remarkably similar, making the task of standardization to a common data model quite simple. The only major difference between pumps is *how many* alternative settings the pump provides an interface to store. In particular, the majority of pumps only allow the storage of one "schedule" for `bgTarget`, `carbRatio`, and `insulinSensitivity`. Historically, Tidepool worked on integrating data from devices of this type first, and, as a result, our data model assumed a single schedule for each of these settings. When we started integrating data from Tandem insulin pumps that allow the storage of several schedules (in parallel fashion to how all insulin pumps allow the storage of several `basalSchedules`), we decided to simply add alternate pluralized fields—`bgTargets`, `carbRatios`, and `insulinSensitivities`—structured as a set of key-value pairs, with the schedule names as the keys and the schedules as the values. Thus, either the singular version of the field (e.g., `bgTarget`) or the plural version (e.g., `bgTargets`) must be present for a `pumpSettings` event to be valid. In practice, all `pumpSettings` objects should have singular versions of all of these fields, or plural versions of all fields. There are no devices currently on the market (at least not that we at Tidepool know of) that would be best modeled with plural `bgTargets` but singular `carbRatio` and `insulinSensitivity`, for example.

<!-- end editable commentary on type -->

* * * * *

### activeSchedule

[ingestion, storage, client] A string value encoding the name of the PWD's active basal schedule.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes

<!-- start editable commentary on activeSchedule -->

Note that for Tandem `pumpSettings`, the `activeSchedule` will allow a client application to identify not only which of the `basalSchedules` is active but also which of the other settings that fall under Tandem's notion of a "personal profile"—i.e., `bgTargets`, `carbRatios`, and `insulinSensitivities`.

<!-- end editable commentary on activeSchedule -->

* * * * *

### basalSchedules

[ingestion, storage, client] A set of key-value pairs encoding the PWD's programmed basal schedules, where each key is a basal schedule name and each value is an array of basal schedule segment objects.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes
Each basal schedule segment object within each array value contains the following properties:

 * rate
 * start

#### basalSchedules.rate

[ingestion, storage, client] A floating point number >= 0 representing the amount of insulin delivered in units per hour.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes
	Numerical type: Floating point value rounded to the appropriate significant figures for the device's precision.
	Range:
		min: 0.0
		max: 20.0

#### basalSchedules.start

[ingestion, storage, client] An integer encoding a start time as milliseconds from the start of a twenty-four hour day.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes
	Numerical type: Integer value representing milliseconds.
	Range:
		min: 0
		max: < 86400000

<!-- start editable commentary on basalSchedules -->

Different insulin pump manufacturers use different terminology for the set of pre-programmed and timed basal rates, one of which is generally active and running in the background (without any user intervention) during normal device operation. Tidepool has adopted the term "schedule" to refer to the rates covering a twenty-four hour day. There must be at least one rate in a schedule; if the schedule has *only* one rate, we often call this a "flat-rate" schedule since the same rate will always be in effect, [temp basals](./basal/temp.md) and [suspensions](./basal/suspend.md) aside.

The `basalSchedules` object encodes all of a PWD's programmed basal schedules, where the keys on the object are the basal schedule names (user-customizable on some pumps; manufacturer-preset on others) and each value is a basal schedule.

A basal schedule, in the Tidepool data model, is an array of objects, where each object has a `start` and a `rate`. (We sometimes refer to each of these objects that compose a schedule as a "segment" of the schedule.) The `rate` is a typical basal rate value, in units of insulin per hour. The `start` is an integer value representing the milliseconds into a twenty-four hour day when the `rate` should go into effect. Thus, the first object in the schedule must *always* have a `start` of 0 representing the start of the day at midnight. If there is more than one rate in the schedule, then subsequent `start` will be positive and non-zero<!-- Note by Eden: Maybe add something explaining that each subsequent start will be greater than the previous. -->; for example, `21600000` would be the `start` for a basal rate scheduled to go into effect at 6 a.m. each day when the schedule is active. Each `start` must be < 86400000, the number of milliseconds in twenty-four hours, as such a value would be equivalent to 0 (midnight).

<!-- end editable commentary on basalSchedules -->

* * * * *

### bgTarget

**NB**: Either `bgTarget` *or* `bgTargets` (but not both!) must be present for a `pumpSettings` object to be valid.

[ingestion, storage, client] An array of objects describing the PWD's target blood glucose at different times of day; the format of this object varies according to the make of the insulin pump.

Each blood glucose target segment object in the array contains a subset of the following properties:

 * low
 * high
 * target
 * range
 * start

#### bgTarget.low

[ingestion, storage, client] An integer encoding the lower bound of a PWD's blood glucose target.

	Numerical type:
		mg/dL: Integer value representing a `mg/dL` value.
		mmol/L: Floating point value representing a `mmol/L` value.
	Range:
		mg/dL:
			min: 0
			max: 1000
		mmol/L:
			min: 0.0
			max: 55.0



#### bgTarget.high

[ingestion, storage, client] An integer encoding the upper bound of a PWD's blood glucose target.

	Numerical type:
		mg/dL: Integer value representing a `mg/dL` value.
		mmol/L: Floating point value representing a `mmol/L` value.
	Range:
		mg/dL:
			min: >= `low` or `target`, whichever present
			max: 1000
		mmol/L:
			min: >= `low` or `target`, whichever present
			max: 55.0



#### bgTarget.target

[ingestion, storage, client] An integer encoding the PWD's target blood glucose as a single value.

	Numerical type:
		mg/dL: Integer value representing a `mg/dL` value.
		mmol/L: Floating point value representing a `mmol/L` value.
	Range:
		mg/dL:
			min: 0
			max: 1000
		mmol/L:
			min: 0.0
			max: 55.0



#### bgTarget.range

[ingestion, storage, client] An integer encoding the allowed deviation above or below the PWD's target blood glucose.

	Numerical type:
		mg/dL: Integer value representing a `mg/dL` value.
		mmol/L: Floating point value representing a `mmol/L` value.
	Range:
		mg/dL:
			min: 0
			max: min(`target`, 1000 - `target`) such that `target`-`range` >= 0 and `target`+`range` <= 1000
		mmol/L:
			min: 0.0
			max: min(`target`, 55.0 - `target`) such that `target`-`range` >= 0.0 and `target`+`range` <= 55.0



#### bgTarget.start

[ingestion, storage, client] An integer encoding a start time as milliseconds from the start of a twenty-four hour day.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes
	Numerical type: Integer value representing milliseconds.
	Range:
		min: 0
		max: < 86400000

#### Changelog for `bgTarget`

`_schemaVersion` 2: The minimal `{target: [val], start: [milliseconds]}` schema was added as valid to handle Tandem's `bgTarget` settings.

`_schemaVersion` 2: The nonexistent (in currently handled devices) `{low: [val], target: [val], high: [val], start: [milliseconds]}` schema was *removed*.

<!-- start editable commentary on bgTarget -->

A blood glucose target value is used in combination with an insulin sensitivity factor in an insulin pump's bolus calculator to calculate a recommended dose of insulin to bring the PWD to the target.

The `bgTarget` array on a `pumpSettings` event represents a single schedule of target blood glucose values. A common use case for scheduling more than one blood glucose target is to schedule a more conservative (higher) target during the night-time hours in order to help prevent nocturnal hypoglycemia.

Each segment in a `bgTarget` schedule is an object with a `start` - an integer value representing the time into a twenty-four hour day in milliseconds (see [above under `basalSchedules` for a fuller explanation](#basalschedules)). The remainder of the keys on each object in a `bgTarget` array vary according to the manufacturer of the insulin pump but will be a subset of `low`, `high`, `target`, and `range`. See [the documentation for the `wizard` type](./wizard.md) for a breakdown of which insulin pump manufacturers use which of these fields to represent a blood glucose target and how each insulin pump uses the target.

<!-- end editable commentary on bgTarget -->

* * * * *

### bgTargets

**NB**: Either `bgTargets` *or* `bgTarget` (but not both!) must be present for a `pumpSettings` object to be valid.

[ingestion, storage, client] A set of key-value pairs encoding the PWD's programmed blood glucose target schedules, where each key is a schedule name and each value is an array of blood glucose target segment objects.

See [`bgTarget`](#bgtarget) above for documentation of the fields within each blood glucose target segment object.


<!-- start editable commentary on bgTargets -->
<!-- TODO -->
<!-- end editable commentary on bgTargets -->

* * * * *

### carbRatio

**NB**: Either `carbRatio` *or* `carbRatios` (but not both!) must be present for a `pumpSettings` object to be valid.

[ingestion, storage, client] An array of objects encoding the PWD's insulin carb ratio starting at a time in milliseconds from the start of a twenty-four hour day.

Each carb ratio segment object in the array contains the following properties:

 * amount
 * start

#### carbRatio.amount

[ingestion, storage, client] An integer encoding the grams of carbohydrate "covered" by one unit of insulin for the PWD.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes
	Numerical type: Integer value representing grams of carbohydrate per unit of insulin.
	Range:
		min: 0
		max: 250

#### carbRatio.start

[ingestion, storage, client] An integer encoding a start time as milliseconds from the start of a twenty-four hour day.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes
	Numerical type: Integer value representing milliseconds.
	Range:
		min: 0
		max: < 86400000

<!-- start editable commentary on carbRatio -->

An insulin-to-carb ratio value is used in an insulin pump's bolus calculator in combination with a carbohydrate value input by the user to calculate a recommended dose of insulin to "cover" the carbohydrates consumed by the PWD.

The `carbRatio` array on a `pumpSettings` event represents a single schedule of insulin-to-carb ratio values. A common use case for scheduling more than one carb ratio is to schedule a more aggressive I:C ratio during the morning hours (for breakfast), as due to the [Dawn Phenomenon](https://en.wikipedia.org/wiki/Dawn_phenomenon 'Wikipedia: Dawn phenomenon') many PWDs need more insulin to "cover" a given number of grams of carbohydrates ingested at this time of day. <!-- Suggestion by Eden: Edit previous paragraph. -->

Each segment in a `carbRatio` schedule is an object with a `start` and an `amount`. The `start` is an integer value representing the time into a twenty-four hour day in milliseconds (see [above under `basalSchedules` for a fuller explanation](#basalschedules)). The `amount` is an I:C ratio in grams of carbohydrate per unit of insulin.

<!-- end editable commentary on carbRatio -->

* * * * *

### carbRatios

**NB**: Either `carbRatios` *or* `carbRatio` (but not both!) must be present for a `pumpSettings` object to be valid.

[ingestion, storage, client] A set of key-value pairs encoding the PWD's programmed carb ratio schedules, where each key is a schedule name and each value is an array of carb ratio segment objects.

See [`carbRatio`](#carbratio) above for documentation of the fields within each carb ratio segment object.


<!-- start editable commentary on carbRatios -->
<!-- TODO -->
<!-- end editable commentary on carbRatios -->

* * * * *

### insulinSensitivity

**NB**: Either `insulinSensitivity` *or* `insulinSensitivities` (but not both!) must be present for a `pumpSettings` object to be valid.

[ingestion, storage, client] An array of objects encoding the PWD's insulin sensitivity starting at a time in milliseconds from the start of a twenty-four hour day.

Each insulin sensitivity segment object in the array contains the following properties:

 * amount
 * start

#### insulinSensitivity.amount

[ingestion] A numerical representation of the estimation of blood glucose value drop per unit of insulin delivered in either mg/dL (integer) or mmol/L (float), with appropriately matching `units` field.

[storage, client] A numerical representation of the estimation of blood glucose value drop in mmol/L (float, potentially unrounded), with appropriately matching `units` field.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes
	Numerical type:
		mg/dL: Integer value representing a `mg/dL` value.
		mmol/L: Floating point value representing a `mmol/L` value.
	Range:
		mg/dL:
			min: 0
			max: 1000
		mmol/L:
			min: 0.0
			max: 55.0



#### insulinSensitivity.start

[ingestion, storage, client] An integer encoding a start time as milliseconds from the start of a twenty-four hour day.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes
	Numerical type: Integer value representing milliseconds.
	Range:
		min: 0
		max: < 86400000

<!-- start editable commentary on insulinSensitivity -->

An insulin sensitivity factor is used in combination with a blood glucose target in an insulin pump's bolus calculator to calculate a recommended dose of insulin to bring the PWD to the target.

The `insulinSensitivity` array on a `pumpSettings` event represents a single schedule of insulin sensitivity factors (ISFs). A common use case for scheduling more than one ISF is to dose more aggressively to bring down hyperglycemia in the morning hours, when the [Dawn Phenomenon](https://en.wikipedia.org/wiki/Dawn_phenomenon 'Wikipedia: Dawn phenomenon') reduces insulin sensitivity for many PWDs.

Each segment in an `insulinSensitivity` schedule is an object with a `start` and an `amount`.  The `start` is an integer value representing the time into a twenty-four hour day in milliseconds that the insulin sensitivity factor starts (see [above under `basalSchedules` for a fuller explanation](#basalschedules)). The `amount` is an integer or floating-point value (depending on whether the blood glucose units are mg/dL or mmol/L) representing the expected drop in blood glucose for each single unit of insulin dosed.

<!-- end editable commentary on insulinSensitivity -->

* * * * *

### insulinSensitivities

**NB**: Either `insulinSensitivities` *or* `insulinSensitivity` (but not both!) must be present for a `pumpSettings` object to be valid.

[ingestion, storage, client] A set of key-value pairs encoding the PWD's programmed insulin sensitivity schedules, where each key is a schedule name and each value is an array of insulin sensitivity segment objects.

See [`insulinSensitivity`](#insulinsensitivity) above for documentation of the fields within each insulin sensitivity segment object.


<!-- start editable commentary on insulinSensitivities -->
<!-- TODO -->
<!-- end editable commentary on insulinSensitivities -->

* * * * *

### units

[ingestion, storage, client] An object encoding the units for carbohydrates and blood glucose on the PWD's insulin pump.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes
Contains the following properties:

 * carbs
 * bg

#### units.carbs

> This field is **optional** when ingesting data through the jellyfish service but **required** when ingesting data through the new platform APIs.

[ingestion, storage, client] A string value encoding the (universal) units for carbohydrate input as `grams`.

	QUICK SUMMARY
	Required:
		jellyfish: no (optional)
		platform: yes
	Range: The string `grams`.

#### units.bg

> This field is **optional** when ingesting data through the jellyfish service but **required** when ingesting data through the new platform APIs.

[ingestion, storage, client] A string value encoding the blood glucose units exposed in the user interface on this insulin pump.

	QUICK SUMMARY
	Required:
		jellyfish: no (optional)
		platform: yes
	Range: Must be one of:
		`mg/dL`
		`mmol/L`

#### Changelog for `units`

`_schemaVersion` ? (future): `exchanges` may be added as an accepted value for `units.carbs` in the future.

<!-- start editable commentary on units -->

The `units` object on a `pumpSettings` event represents all the relevant units for the included settings.

For `carbs`, the only currently allowed value is `grams`, but some insulin pumps allow the use of the now-outdated ["exchange" scheme](https://en.wikipedia.org/wiki/Diabetic_diet#Exchange_scheme 'Wikipedia: exchange scheme') for counting carbohydrates, where one exchange is ~15g of carbohydrate. We may add support for this in the future, although we will likely only allow `exchanges` as the `units.carbs` (and for carb-related values like `carbRatio`) on ingestion, then convert to `grams` based on the 1:15 ratio, in a process similar to how all mg/dL blood glucose(-related) values are converted to mmol/L on ingestion.

For `bg`, the value may be `mg/dL` or `mmol/L` on ingestion, but, in the storage and client data formats, all blood glucose and related values are converted to mmol/L, and the value of `units.bg` is updated to `mmol/L`. See [units](../units.md) for further explanation of blood glucose units.

<!-- end editable commentary on units -->

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
	"type": "pumpSettings",
	"activeSchedule": "Normal",
	"basalSchedules": {
		"Normal": [
			{
				"start": 0,
				"rate": 1.775
			},
			{
				"start": 48600000,
				"rate": 0.475
			}
		],
		"Vacation": [
			{
				"start": 0,
				"rate": 1.575
			}
		],
		"Weekday": [
			{
				"start": 0,
				"rate": 0.875
			},
			{
				"start": 3600000,
				"rate": 0.775
			},
			{
				"start": 63000000,
				"rate": 0.525
			}
		]
	},
	"units": {
		"carbs": "grams",
		"bg": "mmol/L"
	},
	"bgTarget": [
		{
			"start": 0,
			"low": 4.440598392836427,
			"high": 8.3261219865683
		}
	],
	"carbRatio": [
		{
			"amount": 21,
			"start": 0
		},
		{
			"amount": 5,
			"start": 10800000
		},
		{
			"amount": 18,
			"start": 25200000
		},
		{
			"amount": 16,
			"start": 63000000
		},
		{
			"amount": 9,
			"start": 73800000
		}
	],
	"insulinSensitivity": [
		{
			"amount": 4.662628312478248,
			"start": 0
		},
		{
			"amount": 3.2749413147168647,
			"start": 61200000
		}
	],
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2018-05-14T18:17:08",
	"guid": "b9a8484b-a90a-406a-b876-1cd3c36a01ce",
	"id": "c1414f92dc0a4e06bb3cc6bee6a6a491",
	"time": "2018-05-14T08:17:08.996Z",
	"timezoneOffset": 600,
	"uploadId": "SampleUploadId"
}
```

### example (ingestion)

```json
{
	"type": "pumpSettings",
	"activeSchedule": "Normal",
	"basalSchedules": {
		"Normal": [
			{
				"start": 0,
				"rate": 1.05
			},
			{
				"start": 12600000,
				"rate": 1.25
			},
			{
				"start": 72000000,
				"rate": 1.85
			}
		],
		"Sick": [
			{
				"start": 0,
				"rate": 0.15
			}
		]
	},
	"units": {
		"carbs": "grams",
		"bg": "mg/dL"
	},
	"bgTargets": {
		"Normal": [
			{
				"start": 0,
				"target": 90
			},
			{
				"start": 28800000,
				"target": 85
			},
			{
				"start": 72000000,
				"target": 90
			}
		],
		"Sick": [
			{
				"start": 0,
				"target": 90
			}
		]
	},
	"carbRatios": {
		"Normal": [
			{
				"amount": 22,
				"start": 0
			}
		],
		"Sick": [
			{
				"amount": 25,
				"start": 0
			},
			{
				"amount": 21,
				"start": 32400000
			},
			{
				"amount": 12,
				"start": 55800000
			}
		]
	},
	"insulinSensitivities": {
		"Normal": [
			{
				"amount": 94,
				"start": 0
			}
		],
		"Sick": [
			{
				"amount": 44,
				"start": 0
			}
		]
	},
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2018-05-14T18:17:08",
	"time": "2018-05-14T08:17:08.997Z",
	"timezoneOffset": 600,
	"uploadId": "SampleUploadId"
}
```

### example (storage)

```json
{
	"type": "pumpSettings",
	"activeSchedule": "Normal",
	"basalSchedules": {
		"Normal": [
			{
				"start": 0,
				"rate": 0.825
			},
			{
				"start": 14400000,
				"rate": 0.625
			},
			{
				"start": 82800000,
				"rate": 0.525
			}
		],
		"Stress": [
			{
				"start": 0,
				"rate": 1.225
			},
			{
				"start": 37800000,
				"rate": 1.175
			}
		],
		"Vacation": [
			{
				"start": 0,
				"rate": 1.4
			},
			{
				"start": 36000000,
				"rate": 1.525
			},
			{
				"start": 46800000,
				"rate": 0.3
			},
			{
				"start": 68400000,
				"rate": 0.925
			},
			{
				"start": 73800000,
				"rate": 0.675
			}
		]
	},
	"units": {
		"carbs": "grams",
		"bg": "mmol/L"
	},
	"bgTarget": [
		{
			"start": 0,
			"target": 6.383360189702364,
			"high": 8.048584587016023
		}
	],
	"carbRatio": [
		{
			"amount": 7,
			"start": 0
		}
	],
	"insulinSensitivity": [
		{
			"amount": 0.7215972388359193,
			"start": 0
		},
		{
			"amount": 3.5524787142691414,
			"start": 9000000
		},
		{
			"amount": 0.7771047187463747,
			"start": 28800000
		},
		{
			"amount": 0.6660897589254641,
			"start": 39600000
		},
		{
			"amount": 3.830016113821418,
			"start": 61200000
		}
	],
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2018-05-14T08:17:13.999Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2018-05-14T18:17:08",
	"guid": "7d965b73-53f3-44b0-9920-716799fbc6c8",
	"id": "e8b564c185484cd9b28447e6ad97a76d",
	"time": "2018-05-14T08:17:08.999Z",
	"timezoneOffset": 600,
	"uploadId": "SampleUploadId"
}
```
