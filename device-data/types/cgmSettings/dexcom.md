<!-- auto-generated doc! most areas *not* editable -->

## Manufacturer: `dexcom`


> Jump to...(notable fields on this type)

>  - [type](#type)
>  - [highAlerts](#highalerts)
>  - [lowAlerts](#lowalerts)
>  - [outOfRangeAlerts](#outofrangealerts)
>  - [rateOfChangeAlerts](#rateofchangealerts)
>  - [transmitterId](#transmitterid)
>  - [units](#units)

**NB:** All fields are *required* unless otherwise noted.


> Jump to example JSON:

>  - [client example](#example-client)
>  - [ingestion example](#example-ingestion)
>  - [storage example](#example-storage)


### type

[ingestion, storage, client] The string `cgmSettings`.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes

<!-- start editable commentary on type -->

This is the Tidepool data type to represent CGM settings at a given point in time, usually the time of an upload of data from the device. Most CGM-receiving devices do **not**, unfortunately, keep a historical record of all CGM settings when a change in settings is made, with the exception of Dexcom dedicated hardware receivers. The safest assumption is that the `time` on each `cgmSettings` object simply represents *a (single)* time when the settings were in effect, not the first moment when the settings were put into effect.

<!-- end editable commentary on type -->

* * * * *

### highAlerts

[ingestion] An object representing a high glucose alert setting, with `level` in mg/dL (integer) or mmol/L (float) and the appropriately matching `units` value.

[storage, client] An object representing a high glucose alert setting, with `level` in mmol/L (float, potentially unrounded) and the appropriately matching `units` value.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes
Contains the following properties:

 * enabled
 * level
 * snooze

#### enabled

[ingestion, storage, client] A Boolean value: `true` or `false`.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes
	Range: `true`, `false`

#### level

[ingestion] Blood glucose value in either mg/dL (integer) or mmol/L (float), with appropriately matching `units` field.

[storage, client] Blood glucose value in mmol/L (float, potentially unrounded), with appropriately matching `units` field.

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



#### snooze

[ingestion, storage, client] An integer value representing minimum time between alerts in milliseconds.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes
	Numerical type: Integer value representing milliseconds.
	Range:
		min: 0
		max: 86400000

<!-- start editable commentary on highAlerts -->

The `highAlerts` object on a `cgmSettings` event encodes the user's preferences for receiving alerts about high blood glucose events (hyperglycemia). <!-- Suggestion by Eden: This alert can be enabled at the user's descretion. -->The `level` gives the threshold for high BG alerts in the appropriate blood glucose units (either mg/dL or mmol/L on ingestion but converted to mmol/L upon ingestion, like all other blood glucose-related values in the Tidepool data model(s)). The `snooze` value allows the user to configure how often the alert should repeat (after an initial user-acknowledgment) if the PWD's blood glucose remains above the threshold value. This is useful because high blood glucose <!-- Suggestion by Eden: 'does not lower immediately' instead of 'cannot be corrected immediately' -->cannot be corrected immediately; a typical value for a `snooze` on a high blood glucose alert might be two hours, for example, since it takes about 90 minutes for an insulin dose, taken to correct the high blood glucose, to reach its peak in terms of metabolic activity.

<!-- end editable commentary on highAlerts -->

* * * * *

### lowAlerts

[ingestion] An object representing a low glucose alert setting, with `level` in mg/dL (integer) or mmol/L (float) and the appropriately matching `units` value.

[storage, client] An object representing a low glucose alert setting, with `level` in mmol/L (float, potentially unrounded) and the appropriately matching `units` value.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes
Contains the following properties:

 * enabled
 * level
 * snooze

#### enabled

[ingestion, storage, client] A Boolean value: `true` or `false`.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes
	Range: `true`, `false`

#### level

[ingestion] Blood glucose value in either mg/dL (integer) or mmol/L (float), with appropriately matching `units` field.

[storage, client] Blood glucose value in mmol/L (float, potentially unrounded), with appropriately matching `units` field.

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



#### snooze

[ingestion, storage, client] An integer value representing minimum time between alerts in milliseconds.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes
	Range:
		min: 0
		max: 86400000

<!-- start editable commentary on lowAlerts -->

The `lowAlerts` object on a `cgmSettings` event encodes the user's preferences for receiving alerts about low blood glucose events, also known as hypoglycemia. <!-- Suggestion by Eden: This alert can be enabled at the user's descretion. -->The `level` gives the threshold for low BG alerts in the appropriate blood glucose units (either mg/dL or mmol/L on ingestion but converted to mmol/L upon ingestion, like all other blood glucose-related values in the Tidepool data model(s)). The `snooze` value allows the user to configure how often the alert should repeat (after an initial user-acknowledgment) if the PWD's blood glucose remains below the threshold value. This is useful since low blood glucose <!-- Suggestion by Eden: 'does not rise immediately' instead of 'cannot be corrected immediately' -->cannot be corrected immediately; a typical value for a `snooze` on a low blood glucose alert might be fifteen minutes, for example, since that is the typical time recommended by diabetes health care providers to wait after treating hypoglycemia (by ingesting some form of glucose, whether soda, juice, glucose tablets, etc.) before retesting a PWD's blood glucose.

<!-- end editable commentary on lowAlerts -->

* * * * *

### outOfRangeAlerts

[ingestion, storage, client] An object representing an out-of-range alert setting.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes
Contains the following properties:

 * enabled
 * snooze

#### enabled

[ingestion, storage, client] A Boolean value: `true` or `false`.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes
	Range: `true`, `false`

#### snooze

[ingestion, storage, client] An integer value representing a minimum threshold of time (in milliseconds) the user's transmitter must be out-of-range of the receiving device before alerting.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes
	Numerical type: Integer value representing milliseconds.
	Range:
		min: 0
		max: 86400000

#### Changelog for `outOfRangeAlerts`

`_schemaVersion` ? (future): We plan to migrate from `outOfRangeAlerts.snooze` to `outOfRangeAlerts.threshold` in the future.

<!-- start editable commentary on outOfRangeAlerts -->

The `outOfRangeAlerts` object on a `cgmSettings` event encodes the user's settings for receiving alerts from the receiver if the connection between the transmitter and the receiver becomes disrupted (typically due to the transmitter being physically out of range of the receiver). We have erroneously labeled the time value on this object `snooze`: this value is **not** like the `snooze` on `highAlerts` and `lowAlerts`. <!-- Suggestion by Eden: Take a look at the following sentence -->More specifically, the time value in an `outOfRangeAlerts` object is *not* a setting for time between alerts but rather a setting for elapsed time before the *initial* alert—that is, the amount of time, as counted by the receiver, that the receiver's data connection with the transmitter has been broken. We plan to rename the field for this value to `threshold` in an upcoming `_schemaVersion`.

<!-- end editable commentary on outOfRangeAlerts -->

* * * * *

### rateOfChangeAlerts

[ingestion] An object representing a rate of change alert setting, with `rate` in mg/dL (integer) or mmol/L (float) and the appropriately matching `units` value.

[storage, client] An object representing a rate of change alert setting, with `rate` in mmol/L (float, potentially unrounded) and the appropriately matching `units` value.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes
Each of two embedded objects—`fallRate` and `riseRate`—contains the following properties:

 * enabled
 * rate

#### enabled

[ingestion, storage, client] A Boolean value: `true` or `false`.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes
	Range: `true`, `false`

#### rate

[ingestion] A rate of blood glucose value change in either mg/dL/min (integer) or mmol/L/min (float), with appropriately matching `units` field.

[storage, client] A rate of blood glucose value change in mmol/L (float, potentially unrounded), with appropriately matching `units` field.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes
	Numerical type:
		mg/dL: Integer value representing a `mg/dL` value.
		mmol/L: Floating point value representing a `mmol/L` value.
	Range:
		mg/dL:
			min: -10 if `fallRate`, > 0 if `riseRate`
			max: < 0 if `fallRate`, 10 if `riseRate`
		mmol/L:
			min: -0.55 if `fallRate`, > 0 if `riseRate`
			max: < 0 if `fallRate`, 0.55 if `riseRate`



<!-- start editable commentary on rateOfChangeAlerts -->

The `rateOfChangeAlerts` object on a `cgmSettings` event encodes the user's preferences for receiving alerts when the PWD's blood glucose is changing rapidly—either rising or falling. Each of `fallRate` and `riseRate` is an object inside of the `rateOfChangeAlerts` object with two key-value pairs: whether the alert is `enabled`, and the `rate` of change to trigger the alert. For the `fallRate`, note that the `rate` of change must be specified as a *negative* value. Like all blood glucose-related values in the Tidepool data model(s), both `fallRate.rate` and `riseRate.rate` may be specified in either mg/dL or mmol/L for ingestion, but will be stored and returned to client applications in mmol/L.

<!-- end editable commentary on rateOfChangeAlerts -->

* * * * *

### transmitterId

[ingestion, storage, client] A string transmitter ID.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes

<!-- start editable commentary on transmitterId -->
<!-- Added by Eden: TODO -->
<!-- end editable commentary on transmitterId -->

* * * * *

### units

[ingestion] One of two string values: `mg/dL` or `mmol/L`.

[storage, client] The string `mmol/L`.

See [units](../../units.md) for further explanation of blood glucose units.

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
	"type": "cgmSettings",
	"highAlerts": {
		"enabled": false,
		"level": 12.489182979852451,
		"snooze": 4500000
	},
	"lowAlerts": {
		"enabled": true,
		"level": 4.440598392836427,
		"snooze": 3600000
	},
	"outOfRangeAlerts": {
		"enabled": false,
		"snooze": 1800000
	},
	"rateOfChangeAlerts": {
		"fallRate": {
			"enabled": false,
			"rate": -0.055507479910455335
		},
		"riseRate": {
			"enabled": false,
			"rate": 0.11101495982091067
		}
	},
	"transmitterId": "6C8A7",
	"units": "mmol/L",
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-06-16T11:53:19",
	"guid": "6590a33c-7fbe-4341-8b65-15742409a4bd",
	"id": "ffb4e03b854b432aa7464822efd2ec84",
	"time": "2016-06-16T18:53:19.226Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (ingestion)

```json
{
	"type": "cgmSettings",
	"highAlerts": {
		"enabled": true,
		"level": 235,
		"snooze": 3600000
	},
	"lowAlerts": {
		"enabled": true,
		"level": 75,
		"snooze": 1800000
	},
	"outOfRangeAlerts": {
		"enabled": true,
		"snooze": 1800000
	},
	"rateOfChangeAlerts": {
		"fallRate": {
			"enabled": true,
			"rate": -1
		},
		"riseRate": {
			"enabled": true,
			"rate": 1
		}
	},
	"transmitterId": "1596D",
	"units": "mg/dL",
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-06-16T11:53:19",
	"time": "2016-06-16T18:53:19.227Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (storage)

```json
{
	"type": "cgmSettings",
	"highAlerts": {
		"enabled": false,
		"level": 10.82395858253879,
		"snooze": 5400000
	},
	"lowAlerts": {
		"enabled": false,
		"level": 4.440598392836427,
		"snooze": 1800000
	},
	"outOfRangeAlerts": {
		"enabled": false,
		"snooze": 3600000
	},
	"rateOfChangeAlerts": {
		"fallRate": {
			"enabled": true,
			"rate": -0.055507479910455335
		},
		"riseRate": {
			"enabled": false,
			"rate": 0.055507479910455335
		}
	},
	"transmitterId": "8A46E",
	"units": "mmol/L",
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2016-06-16T18:53:24.228Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-06-16T11:53:19",
	"guid": "473c3768-3b3a-40dc-acea-84bcede94bba",
	"id": "854ba9ffbcfc4c759c32b40f01dec3f4",
	"time": "2016-06-16T18:53:19.228Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```
