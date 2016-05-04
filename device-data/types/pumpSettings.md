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

<!-- start type -->
<!-- TODO -->
<!-- end type -->

* * * * *

### activeSchedule

[ingestion, storage, client] A string value encoding the name of the PWD's active basal schedule.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes

<!-- start activeSchedule -->
<!-- TODO -->
<!-- end activeSchedule -->

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

<!-- start basalSchedules -->
<!-- TODO -->
<!-- end basalSchedules -->

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

<!-- start bgTarget -->
<!-- TODO -->
<!-- end bgTarget -->

* * * * *

### bgTargets

**NB**: Either `bgTargets` *or* `bgTarget` (but not both!) must be present for a `pumpSettings` object to be valid.

[ingestion, storage, client] A set of key-value pairs encoding the PWD's programmed blood glucose target schedules, where each key is a schedule name and each value is an array of blood glucose target segment objects.

See [`bgTarget`](#bgtarget) above for documentation of the fields within each blood glucose segment object.


<!-- start bgTargets -->
<!-- TODO -->
<!-- end bgTargets -->

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

<!-- start carbRatio -->
<!-- TODO -->
<!-- end carbRatio -->

* * * * *

### carbRatios

**NB**: Either `carbRatios` *or* `carbRatio` (but not both!) must be present for a `pumpSettings` object to be valid.

[ingestion, storage, client] A set of key-value pairs encoding the PWD's programmed carb ratio schedules, where each key is a schedule name and each value is an array of carb ratio segment objects.

See [`carbRatio`](#carbratio) above for documentation of the fields within each carb ratio segment object.


<!-- start carbRatios -->
<!-- TODO -->
<!-- end carbRatios -->

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

<!-- start insulinSensitivity -->
<!-- TODO -->
<!-- end insulinSensitivity -->

* * * * *

### insulinSensitivities

**NB**: Either `insulinSensitivities` *or* `insulinSensitivity` (but not both!) must be present for a `pumpSettings` object to be valid.

[ingestion, storage, client] A set of key-value pairs encoding the PWD's programmed insulin sensitivity schedules, where each key is a schedule name and each value is an array of insulin sensitivity segment objects.

See [`insulinSensitivity`](#insulinsensitivity) above for documentation of the fields within each insulin sensitivity segment object.


<!-- start insulinSensitivities -->
<!-- TODO -->
<!-- end insulinSensitivities -->

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

<!-- start units -->
<!-- TODO -->
<!-- end units -->

* * * * *

### clockDriftOffset

See [common fields](../common.md).

<!-- start clockDriftOffset -->
<!-- TODO -->
<!-- end clockDriftOffset -->

* * * * *

### conversionOffset

See [common fields](../common.md).

<!-- start conversionOffset -->
<!-- TODO -->
<!-- end conversionOffset -->

* * * * *

### deviceId

See [common fields](../common.md).

<!-- start deviceId -->
<!-- TODO -->
<!-- end deviceId -->

* * * * *

### deviceTime

See [common fields](../common.md).

<!-- start deviceTime -->
<!-- TODO -->
<!-- end deviceTime -->

* * * * *

### guid

See [common fields](../common.md).

<!-- start guid -->
<!-- TODO -->
<!-- end guid -->

* * * * *

### time

See [common fields](../common.md).

<!-- start time -->
<!-- TODO -->
<!-- end time -->

* * * * *

### timezoneOffset

See [common fields](../common.md).

<!-- start timezoneOffset -->
<!-- TODO -->
<!-- end timezoneOffset -->

* * * * *

### uploadId

See [common fields](../common.md).

<!-- start uploadId -->
<!-- TODO -->
<!-- end uploadId -->

* * * * *

### _active

See [common fields](../common.md).

<!-- start _active -->
<!-- TODO -->
<!-- end _active -->

* * * * *

### _groupId

See [common fields](../common.md).

<!-- start _groupId -->
<!-- TODO -->
<!-- end _groupId -->

* * * * *

### _schemaVersion

See [common fields](../common.md).

<!-- start _schemaVersion -->
<!-- TODO -->
<!-- end _schemaVersion -->

* * * * *

### _version

See [common fields](../common.md).

<!-- start _version -->
<!-- TODO -->
<!-- end _version -->

* * * * *

### createdTime

See [common fields](../common.md).

<!-- start createdTime -->
<!-- TODO -->
<!-- end createdTime -->

* * * * *

### id

See [common fields](../common.md).

<!-- start id -->
<!-- TODO -->
<!-- end id -->

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
				"rate": 1.075
			}
		],
		"Weekday": [
			{
				"start": 0,
				"rate": 1.65
			}
		],
		"Weekend": [
			{
				"start": 0,
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
			"low": 3.6079861941795968,
			"high": 8.048584587016023
		},
		{
			"start": 72000000,
			"low": 3.33044879462732,
			"high": 6.66089758925464
		},
		{
			"start": 81000000,
			"low": 4.16306099328415,
			"high": 7.49350978791147
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
			"amount": 80,
			"start": 0
		}
	],
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-05-04T00:07:00",
	"guid": "f42dc6ac-0fa5-4576-8204-7c835248830a",
	"id": "4d9889f7d19544a585e384a16477f5e6",
	"time": "2016-05-04T07:07:00.424Z",
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
				"rate": 0.6
			}
		],
		"Vacation": [
			{
				"start": 0,
				"rate": 0.975
			}
		],
		"Stress": [
			{
				"start": 0,
				"rate": 1.525
			},
			{
				"start": 3600000,
				"rate": 0.025
			},
			{
				"start": 34200000,
				"rate": 1.975
			},
			{
				"start": 46800000,
				"rate": 0.3
			},
			{
				"start": 50400000,
				"rate": 0.15
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
			"low": 80,
			"high": 135
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
			"amount": 68,
			"start": 0
		},
		{
			"amount": 41,
			"start": 46800000
		},
		{
			"amount": 86,
			"start": 52200000
		}
	],
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-05-04T00:07:00",
	"guid": "9f93049f-5049-4a59-a04c-43d766611861",
	"time": "2016-05-04T07:07:00.427Z",
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
		]
	},
	"units": {
		"carbs": "grams",
		"bg": "mmol/L"
	},
	"bgTarget": [
		{
			"start": 0,
			"low": 3.8855235937318735,
			"high": 8.048584587016023
		},
		{
			"start": 21600000,
			"low": 4.440598392836427,
			"high": 7.2159723883591935
		},
		{
			"start": 39600000,
			"low": 4.440598392836427,
			"high": 7.49350978791147
		},
		{
			"start": 70200000,
			"low": 4.16306099328415,
			"high": 8.048584587016023
		},
		{
			"start": 73800000,
			"low": 4.16306099328415,
			"high": 8.048584587016023
		}
	],
	"carbRatio": [
		{
			"amount": 14,
			"start": 0
		},
		{
			"amount": 23,
			"start": 37800000
		},
		{
			"amount": 20,
			"start": 45000000
		},
		{
			"amount": 5,
			"start": 63000000
		},
		{
			"amount": 16,
			"start": 77400000
		}
	],
	"insulinSensitivity": [
		{
			"amount": 52,
			"start": 0
		}
	],
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2016-05-04T07:07:05.429Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-05-04T00:07:00",
	"guid": "0c391e28-f98f-4a58-84a0-097992ed4ccf",
	"id": "0701698f25d140f8b1ed1095ba5ac013",
	"time": "2016-05-04T07:07:00.429Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```
