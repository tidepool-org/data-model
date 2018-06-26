<!-- auto-generated doc! most areas *not* editable -->

## Bolus Calculator Records (`wizard`)


> Jump to...(notable fields on this type)

>  - [type](#type)
>  - [bgInput](#bginput)
>  - [bgTarget](#bgtarget)
>  - [bolus](#bolus)
>  - [carbInput](#carbinput)
>  - [insulinCarbRatio](#insulincarbratio)
>  - [insulinOnBoard](#insulinonboard)
>  - [insulinSensitivity](#insulinsensitivity)
>  - [recommended](#recommended)
>  - [units](#units)

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

The Tidepool `wizard` event - to be renamed `calculator` in the future - models user interactions with a bolus calculator (on some pumps called the bolus "wizard"). The `wizard` event is intended to contain the values that were input into the wizard, as well as any recommendations that the calculator may have made. This event on its own does not record explicitly whether the recommendations made were followed; it is the responsibility of client software to determine this by comparison with the resulting `bolus` event.

Some insulin pumps record *every* user interaction with the bolus calculator, regardless of whether a bolus resulted from the interaction or not. To avoid noise in the data from user interactions that do not have any direct clinical relevance, only user interactions with the bolus calculator that actually result in a [`bolus`](./bolus/README.md) event should be uploaded to the Tidepool platform. <!-- Suggestion by Eden: For those not familiar with Type 1, maybe provide an explanation of why this is useful? -->The resulting `bolus` should also be included *on* the `wizard` event: see [linking events](../linking-events.md) for details.

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

<!-- Suggestion by Eden: Explain what bgInput is used for within the bolus wizard. -->Like all blood glucose-related fields, the `bgInput` should be uploaded in either `mg/dL` or `mmol/L` as appropriate to how the data is retrieved from the device, but all values will be converted to `mmol/L` on ingestion.

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



#### Changelog for `bgTarget`

`_schemaVersion` 2: The minimal `{target: [val]}` schema was added as valid to handle Tandem's `bgTarget` data.

`_schemaVersion` 2: The nonexistent (in currently handled devices) `{low: [val], target: [val], high: [val]}` schema was *removed*.

<!-- start editable commentary on bgTarget -->

The embedded `bgTarget` object models the target blood glucose that was in operation for the given bolus calculation. Like all blood glucose-related fields, the `bgTarget` should be uploaded in either `mg/dL` or `mmol/L` as appropriate to how the data is retrieved from the device, but all values will be converted to `mmol/L` on ingestion.

The representation of `bgTarget` varies across insulin pump manufacturers as follows:

- Animas represents the PWD's blood glucose target as a `target` blood glucose and a `range` encoded as a single value such that any blood glucose value +`range` or -`range` from the `target` is considered "in range" for Animas' bolus recommendation calculations.
- Insulet represents the PWD's blood glucose target as a `target` blood glucose and a `high` threshold. Insulet's correction bolus calculations aim for the `target` but do not calculate a correction bolus at all if the [`bgInput`](#bginput) is *not* higher than the `high` threshold.
- Medtronic represents the PWD's blood glucose target as a range defined by a `low` and a `high` value.
- Tandem represents the PWD's blood glucose target simply as a single `target` blood glucose value.

<!-- Comment by Eden: Take a look at the following paragraph - I'm not quite sure what is meant. -->We have decided to use a common range for all blood glucose-related fields. As a result of this, the range of values that will be accepted for `low`, `high`, and `target` values within the `bgTarget` object is much larger than the range that is *logically* acceptable since the range of *target* values for blood glucose must necessarily be much narrower than the range of *possible* values, but we place the burden on uploading clients to ensure that the uploaded values are correct.

<!-- end editable commentary on bgTarget -->

* * * * *

### bolus

> This field is **optional** when ingesting data through the jellyfish service but **required** when ingesting data through the new platform APIs.

[ingestion] The `bolus` event resulting from this `wizard` event, or—for the legacy jellyfish data ingestion service *only*—optionally the `id` of the `bolus` event instead of the event itself.

[storage, client] The `id` of the bolus resulting from this `wizard` event.

	QUICK SUMMARY
	Required:
		jellyfish: no (optional)
		platform: yes

<!-- start editable commentary on bolus -->

As mentioned [above](#type), only bolus calculator events that result in a bolus should be uploaded to the Tidepool platform.

When uploading through the legacy jellyfish ingestion API, a `bolus` resulting from a bolus calculation should be uploaded as part of the array of all `bolus` events (including also those programmed without the use of the bolus calculator) as well as embedded within the `wizard` event that programmed it.

On the other hand, when uploading through the new platform APIs (under construction at the time of the drafting of this documentation in June, 2016), the `bolus` should *only* be submitted as embedded within the appropriate `wizard` event.

See [linking events](../linking-events.md) for more details on how events of different `type`s are linked in the Tidepool platform.

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

Not every use of an insulin pump's bolus calculator involves the input of carbohydrates; a user may be using the calculator to program a correction bolus only. Accordingly, the `carbInput` field is optional. Some devices split their bolus calculator functionality into more than one menu depending on whether the user intends to enter a carbohydrate value. On such devices, Tidepool omits the `carbInput` field altogether if the data shows that the user did not choose to enter a carbohydrate value. On other devices, where the carbohydrate option is always part of the calculator, there is no difference between a value of 0 and the user declining to input a value; in these cases, we upload a `carbInput` of 0.

Note also that `carbInput` does not *necessarily* map directly to carbohydrates consumed by the PWD. A PWD may consume carbohydrates that are not recorded through the bolus calculator either if the PWD chooses to program a manual or quick bolus (i.e., without using the calculator) to "cover" carbohydrates ingested or if the PWD consumes carbohydrates for which no bolus is judged necessary <!-- Suggestion by Eden: add 'by him or her' -->(e.g., a snack in preparation for exercise or carbohydrates consumed to treat hypoglycemia).

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

The insulin-to-carb (I:C) ratio is part of a PWD's insulin pump settings. A user may program one I:C ratio to be used no matter the time of day, or the user may program particular ratios on a schedule per each twenty-four hour day. For Tidepool's data model of these persistent I:C ratios, see [`pumpSettings`](./pumpSettings.md).

On bolus calculation events, the `insulinCarbRatio` records the I:C ratio employed in the calculation. Note that on some (perhaps all) insulin pumps, it is possible to change the insulin-to-carb (I:C) ratio for the bolus currently being calculated *without* persisting this change to the insulin pump's settings, so the `insulinCarbRatio` value on a bolus calculation may not always match the expected ratio given the user's insulin pump settings at the time of the calculation.

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

The `insulinOnBoard` (IOB) field in a bolus calculation event encodes the insulin pump's estimate of how much insulin is currently still metabolically active in the PWD's system from boluses prior to the one being programmed. Some insulin pumps use a simple linear function for estimating the metabolic uptake and consumption of insulin while others use more complex functions. It is commonly held that one of the key benefits of using an insulin pump is the ability to track IOB in order to avoid "stacking" boluses—that is, taking more insulin on top of a dose that is still active, which can possibly result in hypoglycemia. In order to audit bolusing behavior, therefore, it is important to include `insulinOnBoard` in the data. On many insulin pumps, `insulinOnBoard` is also taken into account for the calculation of the [`net` bolus recommendation](#recommended).

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

The insulin sensitivity factor (ISF, sometimes simply "sensitivity factor") is part of a PWD's insulin pump settings. A user may program one ISF to be used no matter the time of day, or the user may program particular ISFs on a schedule per each twenty-four hour day. For Tidepool's data model of these persistent ISFs, see [`pumpSettings`](./pumpSettings.md).

On bolus calculation events, the `insulinSensitivity` records the ISF employed in the calculation. Note that on some insulin pumps, it is possible to change the ISF for the bolus currently being calculated *without* persisting this change to the insulin pump's settings, so the `insulinSensitivity` value on a bolus calculation may not always match the expected ISF given the user's insulin pump settings at the time of the calculation.

Like all blood glucose-related fields, the `insulinSensitivity` should be uploaded in either `mg/dL` or `mmol/L`[^a] as appropriate to how the data is retrieved from the device, but all values will be converted to `mmol/L` on ingestion.

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

#### recommended.carb

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

#### recommended.correction

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

#### recommended.net

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

The embedded object `recommended` encodes an insulin delivery device's recommendations for insulin dosing across three fields: `carb`, `correction`, and `net`.

- `carb` encodes the units of insulin recommended by the device to "cover" the total grams of carbohydrate input ([`carbInput`](#carbinput)) by the user (if any) into the bolus calculator. The value for `carb` may be >= 0, as not all boluses involve the ingestion of carbohydrates and thus not all include a recommended insulin dose to cover carbohydrates about to be ingested.
- `correction` encodes the units of insulin recommended by the device to bring the PWD to their target blood glucose or into their target blood glucose range given the input blood glucose ([`bgInput`](#bginput)). On some pumps, or depending on user preference on some pumps, this value may be *negative*. A negative recommendation for `correction` indicates that given the user's current blood glucose and [`insulinOnBoard`](#insulinonboard), low blood glucose is predicted and a reduction in insulin dosing (e.g., via a temporary basal rate <!-- Suggestion by Eden: 'or a reduction of the total bolus amount' -->) may be required in order to main blood glucose at or within the target.
- `net` is the net number of units of insulin that the bolus calculator recommended given the user's inputs. Generally, this `net` recommendation takes at least two and perhaps all three of `recommended.carb`, `recommended.correction`, and `insulinOnBoard` into account, but all insulin pumps currently on the market perform this calculation slightly differently and so we have chosen to store the *result* of the calculation rather than leave this calculation as the responsibility of client applications.

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
	"type": "wizard",
	"bgInput": 2.109284236597303,
	"bgTarget": {
		"target": 5.82828539059781,
		"range": 1.3876869977613833
	},
	"bolus": "2eda6697f3ed430bb2d8b7c7a124fb13",
	"carbInput": 17,
	"insulinCarbRatio": 19,
	"insulinOnBoard": 21.949,
	"insulinSensitivity": 1.831746837045026,
	"recommended": {
		"carb": 1,
		"correction": -2.75,
		"net": 0
	},
	"units": "mmol/L",
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2018-05-14T18:17:09",
	"guid": "757cdf1d-516d-47a3-87d3-3d4e8b71504f",
	"id": "09eb73043377472f82b2baf7adfdbc50",
	"time": "2018-05-14T08:17:09.353Z",
	"timezoneOffset": 600,
	"uploadId": "SampleUploadId"
}
```

### example (ingestion)

```json
{
	"type": "wizard",
	"bgInput": 392,
	"bgTarget": {
		"target": 95,
		"range": 15
	},
	"bolus": {
		"type": "bolus",
		"subType": "normal",
		"normal": 8,
		"expectedNormal": 9.6,
		"clockDriftOffset": 0,
		"conversionOffset": 0,
		"deviceId": "DevId0987654321",
		"deviceTime": "2018-05-14T18:17:09",
		"time": "2018-05-14T08:17:09.353Z",
		"timezoneOffset": 600,
		"uploadId": "SampleUploadId"
	},
	"carbInput": 137,
	"insulinCarbRatio": 13,
	"insulinOnBoard": 24.254,
	"insulinSensitivity": 52,
	"recommended": {
		"carb": 10.5,
		"correction": 5.5,
		"net": 0
	},
	"units": "mg/dL",
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2018-05-14T18:17:09",
	"time": "2018-05-14T08:17:09.353Z",
	"timezoneOffset": 600,
	"uploadId": "SampleUploadId"
}
```

### example (storage)

```json
{
	"type": "wizard",
	"bgInput": 16.152676653942503,
	"bgTarget": {
		"low": 3.6079861941795968,
		"high": 6.938434988806917
	},
	"bolus": "22239d4d592b48ae920b28971cceb48b",
	"carbInput": 57,
	"insulinCarbRatio": 24,
	"insulinOnBoard": 24.265,
	"insulinSensitivity": 4.329583433015516,
	"recommended": {
		"carb": 2.5,
		"correction": 2.25,
		"net": 0
	},
	"units": "mmol/L",
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2018-05-14T08:17:14.353Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2018-05-14T18:17:09",
	"guid": "18d90ea0-5915-4e95-a8b2-cb22819ce696",
	"id": "087c94ccdae84eb5a76b8205a244ec6b",
	"time": "2018-05-14T08:17:09.353Z",
	"timezoneOffset": 600,
	"uploadId": "SampleUploadId"
}
```

* * * * *

### footnotes

<!-- start editable commentary on footnotes -->
[^a]: If one wishes to be pedantic, the units for `insulinSensitivity` are technically `md/dL/u` or `mmol/L/u` since ISF is a ratio of "points" of blood glucose *per unit* of insulin.
<!-- end editable commentary on footnotes -->
