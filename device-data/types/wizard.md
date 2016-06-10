<!-- auto-generated doc! most areas *not* editable -->

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

<!-- start editable commentary on type -->
<!-- TODO -->
<!-- end editable commentary on type -->

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



<!-- start editable commentary on bgInput -->
<!-- TODO -->
<!-- end editable commentary on bgInput -->

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

#### Changelog for `bgTarget`

`_schemaVersion` 2: The minimal `{target: [val]}` schema was added as valid to handle Tandem's `bgTarget` data.

`_schemaVersion` 2: The nonexistent (in currently handled devices) `{low: [val], target: [val], high: [val]}` schema was *removed*.

<!-- start editable commentary on bgTarget -->
<!-- TODO -->
<!-- end editable commentary on bgTarget -->

* * * * *

### bolus

> This field is **optional** when ingesting data through the jellyfish service but **required** when ingesting data through the new platform APIs.

[ingestion] The `id` of the bolus resulting from this `wizard` event, or—for the legacy jellyfish ingestion service *only*—the object itself.

[storage, client] The `id` of the bolus resulting from this `wizard` event.

	QUICK SUMMARY
	Required:
		jellyfish: no (optional)
		platform: yes

<!-- start editable commentary on bolus -->
<!-- TODO -->
<!-- end editable commentary on bolus -->

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

<!-- start editable commentary on carbInput -->
<!-- TODO -->
<!-- end editable commentary on carbInput -->

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

<!-- start editable commentary on insulinCarbRatio -->
<!-- TODO -->
<!-- end editable commentary on insulinCarbRatio -->

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

<!-- start editable commentary on insulinOnBoard -->
<!-- TODO -->
<!-- end editable commentary on insulinOnBoard -->

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



<!-- start editable commentary on insulinSensitivity -->
<!-- TODO -->
<!-- end editable commentary on insulinSensitivity -->

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
		min: >= 0.0
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

<!-- start editable commentary on recommended -->
<!-- TODO -->
<!-- end editable commentary on recommended -->

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

### guid

See [common fields](../common.md).

<!-- start editable commentary on guid -->
<!-- TODO -->
<!-- end editable commentary on guid -->

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

### id

See [common fields](../common.md).

<!-- start editable commentary on id -->
<!-- TODO -->
<!-- end editable commentary on id -->

* * * * *

### example (client)

```json
{
	"type": "wizard",
	"bgInput": 31.195203709675898,
	"bgTarget": {
		"low": 4.440598392836427,
		"high": 6.938434988806917
	},
	"bolus": "d3317638a11e4ee58c3c01ea5274074e",
	"carbInput": 27,
	"insulinCarbRatio": 18,
	"insulinOnBoard": 12.051,
	"insulinSensitivity": 30,
	"recommended": {
		"carb": 1.5,
		"correction": 0.75,
		"net": 0
	},
	"units": "mmol/L",
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-06-09T19:58:46",
	"guid": "b48777f0-7a64-4db9-994f-b89b673842d9",
	"id": "3383f4d87a024d278cc4285ab4d7a625",
	"time": "2016-06-10T02:58:46.722Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (ingestion)

```json
{
	"type": "wizard",
	"bgInput": 33,
	"bgTarget": {
		"target": 100,
		"high": 130
	},
	"bolus": "57b2aeb4d1d64ea398dbcaed849a756f",
	"carbInput": 112,
	"insulinCarbRatio": 16,
	"insulinOnBoard": 2.27,
	"insulinSensitivity": 48,
	"recommended": {
		"carb": 7,
		"correction": 0.75,
		"net": 5.5
	},
	"units": "mg/dL",
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-06-09T19:58:46",
	"guid": "3ba948a3-ea0b-4708-aeee-ce18e125a4c0",
	"time": "2016-06-10T02:58:46.724Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (storage)

```json
{
	"type": "wizard",
	"bgInput": 3.7190011540005075,
	"bgTarget": {
		"target": 5.550747991045533
	},
	"bolus": "feed7099482a4e58b15a5b196b14d9fc",
	"carbInput": 138,
	"insulinCarbRatio": 8,
	"insulinOnBoard": 16.632,
	"insulinSensitivity": 91,
	"recommended": {
		"carb": 17.25,
		"correction": 0,
		"net": 0.5
	},
	"units": "mmol/L",
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2016-06-10T02:58:51.724Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-06-09T19:58:46",
	"guid": "ae227f03-d70d-444d-b14e-131c2da84ea1",
	"id": "ff9e6201e5b547dfb3b3d3f8129dfda8",
	"time": "2016-06-10T02:58:46.724Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```
