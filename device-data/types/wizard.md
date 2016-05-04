## Bolus Calculator Records (wizard)

**NB:** All fields are *required* unless otherwise noted.


> Jump to example JSON:

>  - [client example](#example-client)
>  - [ingestion example](#example-ingestion)
>  - [storage example](#example-storage)


### type

[ingestion, storage, client] The string `wizard`.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes

#### Changelog for `type`

`_schemaVersion` ? (future): We plan to migrate from `wizard` to `calculator` in the future.

<!-- start type -->
<!-- TODO -->
<!-- end type -->

* * * * *

### bgInput

> This field is **optional**.

[ingestion] Blood glucose value in either mg/dL (integer) or mmol/L (float), with appropriately matching `units` field.

[storage, client] Blood glucose value in mmol/L (float, potentially unrounded), with appropriately matching `units` field.

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



<!-- start bgInput -->
<!-- TODO -->
<!-- end bgInput -->

* * * * *

### bgTarget

> This field is **optional**.

[ingestion, storage, client] An object describing the PWD's target blood glucose; the format of this object varies according to the make of the insulin pump.

	QUICK SUMMARY
	Required:
		jellyfish: no (optional)
		platform: no (optional)

	VALID INNER SCHEMAS
		animas: {`target`, `range`}
		insulet: {`target`, `high`}
		medtronic: {`low`, `high`}
		tandem: {`target`}
Contains a subset of the following properties:

 * low
 * high
 * target
 * range

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

<!-- start bgTarget -->
<!-- TODO -->
<!-- end bgTarget -->

* * * * *

### bolus

> This field is **optional** when ingesting data through the jellyfish service but **required** when ingesting data through the new platform APIs.

[ingestion] The `id` of the bolus resulting from this `wizard` event, or—for the legacy jellyfish ingestion service *only*—the object itself.

[storage, client] The `id` of the bolus resulting from this `wizard` event.

	QUICK SUMMARY
	Required:
		jellyfish: no (optional)
		platform: yes

<!-- start bolus -->
<!-- TODO -->
<!-- end bolus -->

* * * * *

### carbInput

> This field is **optional**.

[ingestion, storage, client] An integer encoding the PWD's carbohydrate input into the bolus calculator.

	QUICK SUMMARY
	Required:
		jellyfish: no (optional)
		platform: no (optional)
	Numerical type: Integer value representing grams of carbohydrate.
	Range:
		min: 0
		max: 1000

<!-- start carbInput -->
<!-- TODO -->
<!-- end carbInput -->

* * * * *

### insulinCarbRatio

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

<!-- start insulinCarbRatio -->
<!-- TODO -->
<!-- end insulinCarbRatio -->

* * * * *

### insulinOnBoard

> This field is **optional**.

[ingestion, storage, client] A floating point value representing units of insulin.

	QUICK SUMMARY
	Required:
		jellyfish: no (optional)
		platform: no (optional)
	Numerical type: Floating point value rounded to the appropriate significant figures for the device's precision.
	Range:
		min: 0.0
		max: 250.0

<!-- start insulinOnBoard -->
<!-- TODO -->
<!-- end insulinOnBoard -->

* * * * *

### insulinSensitivity

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



<!-- start insulinSensitivity -->
<!-- TODO -->
<!-- end insulinSensitivity -->

* * * * *

### recommended

> This field is **optional**.

[ingestion, storage, client] An object encoding the amount of insulin calculated as a recommended dose to "cover" the `bgInput` and `carbInput`, possibly taking into account the `insulinOnBoard`.

	QUICK SUMMARY
	Required:
		jellyfish: no (optional)
		platform: no (optional)
May contain the following properties:

 * carb
 * correction
 * net

#### carb

> This field is **optional**.

[ingestion, storage, client] A floating point value representing units of insulin.

	QUICK SUMMARY
	Required:
		jellyfish: no (optional)
		platform: no (optional)
	Numerical type: Floating point value rounded to the appropriate significant figures for the device's precision.
	Range:
		min: > 0.0
		max: 100.0

#### correction

> This field is **optional**.

[ingestion, storage, client] A floating point value representing units of insulin.

	QUICK SUMMARY
	Required:
		jellyfish: no (optional)
		platform: no (optional)
	Numerical type: Floating point value rounded to the appropriate significant figures for the device's precision.
	Range:
		min: -100.0
		max: 100.0

#### net

> This field is **optional**.

[ingestion, storage, client] A floating point value representing units of insulin.

	QUICK SUMMARY
	Required:
		jellyfish: no (optional)
		platform: no (optional)
	Numerical type: Floating point value rounded to the appropriate significant figures for the device's precision.
	Range:
		min: -100.0
		max: 100.0

<!-- start recommended -->
<!-- TODO -->
<!-- end recommended -->

* * * * *

### units

[ingestion] One of two string values: `mg/dL` or `mmol/L`.

[storage, client] The string `mmol/L`.

See [units](../units.md) for further explanation of blood glucose units.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes
	Range: Must be one of:
		`mg/dL`
		`mmol/L`

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
	"type": "wizard",
	"bgInput": 8.048584587016023,
	"bgTarget": {
		"target": 6.1058227901500866,
		"high": 8.048584587016023
	},
	"bolus": "66959fa33e5849c5848948201cb4c378",
	"carbInput": 125,
	"insulinCarbRatio": 20,
	"insulinOnBoard": 8.944,
	"insulinSensitivity": 41,
	"recommended": {
		"carb": 6.25,
		"correction": 0.25,
		"net": 0
	},
	"units": "mmol/L",
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-05-03T11:06:13",
	"guid": "ba502dcb-f49d-4e6f-a7e9-bee502ffc88b",
	"id": "8cc9acc434854e499dc46cb65a2e5fea",
	"time": "2016-05-03T18:06:13.996Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (ingestion)

```json
{
	"type": "wizard",
	"bgInput": 462,
	"bgTarget": {
		"target": 100,
		"high": 135
	},
	"bolus": "512bcf1f3aea4e5380aac382d0b69026",
	"carbInput": 147,
	"insulinCarbRatio": 13,
	"insulinOnBoard": 8.726,
	"insulinSensitivity": 92,
	"recommended": {
		"carb": 11.25,
		"correction": 5,
		"net": 7.5
	},
	"units": "mg/dL",
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-05-03T11:06:13",
	"guid": "5b799146-ed76-41c6-bd19-068ea77f8b00",
	"time": "2016-05-03T18:06:13.997Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (storage)

```json
{
	"type": "wizard",
	"bgInput": 25.866485638272184,
	"bgTarget": {
		"target": 5.550747991045533,
		"range": 1.1101495982091067
	},
	"bolus": "57c5dd917cb74697b1a1a32601534834",
	"carbInput": 121,
	"insulinCarbRatio": 22,
	"insulinOnBoard": 19.824,
	"insulinSensitivity": 53,
	"recommended": {
		"carb": 5.5,
		"correction": 0.25,
		"net": 0
	},
	"units": "mmol/L",
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2016-05-03T18:06:18.998Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-05-03T11:06:13",
	"guid": "f9bac31f-5432-40c8-a5df-448596217abc",
	"id": "c707b478ab1849fb9700e96733798bd4",
	"time": "2016-05-03T18:06:13.998Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```
