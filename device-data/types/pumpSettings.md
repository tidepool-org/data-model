<!-- auto-generated doc! most areas *not* editable -->

## Insulin pump settings (pumpSettings)

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
<!-- TODO -->
<!-- end editable commentary on type -->

* * * * *

### activeSchedule

[ingestion, storage, client] A string value encoding the name of the PWD's active basal schedule.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes

<!-- start editable commentary on activeSchedule -->
<!-- TODO -->
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

#### rate

[ingestion, storage, client] A floating point number >= 0 representing the amount of insulin delivered in units per hour.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes
	Numerical type: Floating point value rounded to the appropriate significant figures for the device's precision.
	Range:
		min: 0.0
		max: 20.0

#### start

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
<!-- TODO -->
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

#### low

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



#### high

[ingestion, storage, client] An integer encoding the upper bound of a PWD's blood glucose target.

	Numerical type:
		mg/dL: Integer value representing a `mg/dL` value.
		mmol/L: Floating point value representing a `mmol/L` value.
	Range:
		mg/dL:
			min: > `low` or `target`, whichever present
			max: 1000
		mmol/L:
			min: > `low` or `target`, whichever present
			max: 55.0



#### target

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



#### range

[ingestion, storage, client] An integer encoding the allowed deviation above or below the PWD's target blood glucose.

	Numerical type: An integer value representing an allowed range +/- an associated target.
	Range:
		min: 0
		max: 50

#### start

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
<!-- TODO -->
<!-- end editable commentary on bgTarget -->

* * * * *

### bgTargets

**NB**: Either `bgTargets` *or* `bgTarget` (but not both!) must be present for a `pumpSettings` object to be valid.

[ingestion, storage, client] A set of key-value pairs encoding the PWD's programmed blood glucose target schedules, where each key is a schedule name and each value is an array of blood glucose target segment objects.

See [`bgTarget`](#bgtarget) above for documentation of the fields within each blood glucose segment object.


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

#### amount

> This field is **optional**.

[ingestion, storage, client] An integer encoding the grams of carbohydrate "covered" by one unit of insulin for the PWD.

	QUICK SUMMARY
	Required:
		jellyfish: no (optional)
		platform: no (optional)
	Numerical type: Integer value representing grams of carbohydrate per unit of insulin.
	Range:
		min: 0
		max: 250

#### start

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
<!-- TODO -->
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

#### amount

> This field is **optional**.

[ingestion] A numerical representation of the estimation of blood glucose value drop per unit of insulin delivered in either mg/dL (integer) or mmol/L (float), with appropriately matching `units` field.

[storage, client] A numerical representation of the estimation of blood glucose value drop in mmol/L (float, potentially unrounded), with appropriately matching `units` field.

	QUICK SUMMARY
	Required:
		jellyfish: no (optional)
		platform: no (optional)
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



#### start

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
<!-- TODO -->
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

#### carbs

> This field is **optional** when ingesting data through the jellyfish service but **required** when ingesting data through the new platform APIs.

[ingestion, storage, client] A string value encoding the (universal) units for carbohydrate input as `grams`.

	QUICK SUMMARY
	Required:
		jellyfish: no (optional)
		platform: yes
	Range: The string `grams`.

#### bg

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
<!-- TODO -->
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
				"rate": 1.45
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
			"target": 6.1058227901500866,
			"high": 8.048584587016023
		},
		{
			"start": 3600000,
			"target": 5.550747991045533,
			"high": 6.938434988806917
		},
		{
			"start": 37800000,
			"target": 4.9956731919409805,
			"high": 7.2159723883591935
		},
		{
			"start": 79200000,
			"target": 5.550747991045533,
			"high": 7.771047187463747
		}
	],
	"carbRatio": [
		{
			"amount": 6,
			"start": 0
		}
	],
	"insulinSensitivity": [
		{
			"amount": 21,
			"start": 0
		},
		{
			"amount": 89,
			"start": 16200000
		},
		{
			"amount": 66,
			"start": 36000000
		}
	],
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-06-13T19:05:45",
	"guid": "3931f815-46fe-41cc-a428-2cd8f2cfec7b",
	"id": "024d7f588b0c433390bfbb3d96bce666",
	"time": "2016-06-14T02:05:45.752Z",
	"timezoneOffset": -420,
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
				"rate": 1.725
			},
			{
				"start": 19800000,
				"rate": 0.15
			},
			{
				"start": 68400000,
				"rate": 1.65
			},
			{
				"start": 81000000,
				"rate": 0.45
			}
		],
		"Stress": [
			{
				"start": 0,
				"rate": 1.95
			},
			{
				"start": 28800000,
				"rate": 0.85
			}
		],
		"Very Active": [
			{
				"start": 0,
				"rate": 0.875
			}
		]
	},
	"units": {
		"carbs": "grams",
		"bg": "mg/dL"
	},
	"bgTarget": [
		{
			"start": 0,
			"target": 100,
			"range": 20
		}
	],
	"carbRatio": [
		{
			"amount": 18,
			"start": 0
		}
	],
	"insulinSensitivity": [
		{
			"amount": 43,
			"start": 0
		},
		{
			"amount": 17,
			"start": 7200000
		},
		{
			"amount": 19,
			"start": 10800000
		},
		{
			"amount": 25,
			"start": 18000000
		}
	],
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-06-13T19:05:45",
	"time": "2016-06-14T02:05:45.756Z",
	"timezoneOffset": -420,
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
				"rate": 0.675
			}
		],
		"Stress": [
			{
				"start": 0,
				"rate": 0.85
			}
		],
		"Vacation": [
			{
				"start": 0,
				"rate": 1.475
			},
			{
				"start": 19800000,
				"rate": 1.9
			},
			{
				"start": 84600000,
				"rate": 0.85
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
			"target": 5.550747991045533,
			"high": 7.2159723883591935
		}
	],
	"carbRatio": [
		{
			"amount": 18,
			"start": 0
		}
	],
	"insulinSensitivity": [
		{
			"amount": 49,
			"start": 0
		}
	],
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2016-06-14T02:05:50.757Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-06-13T19:05:45",
	"guid": "72967b4c-0a5a-4325-baa7-7df4205b8c85",
	"id": "aedc87ab47684b2a80cd914c65fdbd70",
	"time": "2016-06-14T02:05:45.757Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```
