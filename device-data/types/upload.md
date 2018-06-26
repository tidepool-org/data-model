<!-- auto-generated doc! most areas *not* editable -->

## Upload Metadata (`upload`)


> Jump to...(notable fields on this type)

>  - [type](#type)
>  - [byUser](#byuser)
>  - [computerTime](#computertime)
>  - [deviceManufacturers](#devicemanufacturers)
>  - [deviceModel](#devicemodel)
>  - [deviceSerialNumber](#deviceserialnumber)
>  - [deviceTags](#devicetags)
>  - [timeProcessing](#timeprocessing)
>  - [timezone](#timezone)
>  - [uploadId](#uploadid)
>  - [version](#version)

**NB:** All fields are *required* unless otherwise noted.


> Jump to example JSON:

>  - [client example](#example-client)
>  - [ingestion example](#example-ingestion)
>  - [storage example](#example-storage)


### type

[ingestion, storage, client] The string `upload`.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes

<!-- start editable commentary on type -->

This is the Tidepool datatype most distinct from all others: instead of encoding diabetes device data, the `upload` type encodes metadata about an upload of diabetes device data to the Tidepool platform.

<!-- end editable commentary on type -->

* * * * *

### byUser

[ingestion, storage, client] A string consisting of the Tidepool `userId` of the uploading user.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes

<!-- start editable commentary on byUser -->

The `byUser` field is provided for data-auditing purposes. Since Tidepool provides functionality to share data and permissions on data between users (for example: between a clinician and a patient, or in a more unusual example between divorced parents of a child with diabetes), the user that logged in and performed the device upload may often **not** be the user who wears the devices being uploaded.

<!-- end editable commentary on byUser -->

* * * * *

### computerTime

[ingestion, storage, client] An ISO 8601 formatted timestamp *without* any timezone offset information—e.g., `2016-06-28T01:09:55`.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes

<!-- start editable commentary on computerTime -->

The `computerTime` field encodes the *local* time at upload. There is no timezone offset information since we are storing `timezone` separately. We store this field in order to be able to audit and/or detect the correspondence between the user's browser time and the timezone they selected at the time of upload. If the user selected the timezone that was actually in effect for their browser at the time of upload, then applying the stored `timezone` to the UTC Zulu `time` field will match `computerTime`. If, on the other hand, the user selected a *different* timezone from that effective in their browser at the time of upload, applying the `timezone` to `time` will *not* match `computerTime`.

There are some use cases when it is perfectly justified to select a timezone that does *not* reflect the browser's current timezone. For example, some insulin pump users do not change the time on their devices when traveling for short periods of time across many timezones, but when uploading a device a user should always choose the timezone that aligns with the most recent data on the device and thus that may *not* match the local browser timezone.

<!-- end editable commentary on computerTime -->

* * * * *

### deviceManufacturers

[ingestion, storage, client] An array of string tags indicating the manufacturer(s) of the device.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes
	Range: Must be one of:
		`Abbott`
		`Animas`
		`Bayer`
		`Dexcom`
		`Insulet`
		`LifeScan`
		`Medtronic`
		`Tandems`

<!-- start editable commentary on deviceManufacturers -->

In order to avoid confusion resulting from referring to a single manufacturer with more than one name—for example, using both 'Minimed' and 'Medtronic' interchangeably—we restrict the set of strings used to refer to manufacturers to the set listed above and enforce *exact* string matches (including casing).

`deviceManufacturers` is an array of one or more string "tags" because there are devices resulting from a collaboration between more than one manufacturer, such as the Tandem G4 insulin pump with CGM integration (a collaboration between `Tandem` and `Dexcom`).

<!-- end editable commentary on deviceManufacturers -->

* * * * *

### deviceModel

[ingestion, storage, client] A string identifying the model of the device.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes

<!-- start editable commentary on deviceModel -->

The `deviceModel` is a non-empty string that encodes the model of device. We endeavor to match each manufacturer's standard for how they represent model name: in terms of casing, whether parts of the name are represented as one word or two, etc.

<!-- end editable commentary on deviceModel -->

* * * * *

### deviceSerialNumber

[ingestion, storage, client] A string encoding the device's serial number.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes
	Range: Must be a string value, and **may** be an empty string.

<!-- start editable commentary on deviceSerialNumber -->

The `deviceSerialNumber` is a string that encodes the serial number of the device. Note that even if a manufacturer only uses digits in its serial numbers, the SN should be stored as a string regardless.

Uniquely of string fields in the Tidepool device data models, `deviceSerialNumber` *may* be an empty string. This is essentially a compromise: having the device serial number is extremely important (especially for e.g., clinical studies) but in 2016 we came across our first case where we *cannot* recover the serial number of the device that generated the data: Dexcom G5 data uploaded to Tidepool through Apple iOS's HealthKit integration.

<!-- end editable commentary on deviceSerialNumber -->

* * * * *

### deviceTags

[ingestion, storage, client] An array of string tags indicating the function(s) of the device.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes
	Range: Must be one of:
		`insulin-pump`
		`cgm`
		`bgm`

<!-- start editable commentary on deviceTags -->

The `deviceTags` array should be fairly self-explanatory as an array of tags indicating the function(s) of a particular device. For example, the Insulet OmniPod insulin delivery system has the tags `bgm` and `insulin-pump` since the PDM is both an insulin pump controller and includes a built-in blood glucose monitor.

<!-- end editable commentary on deviceTags -->

* * * * *

### timeProcessing

[ingestion, storage, client] A string indicating what variety of processing was used to create the `time` and related fields such as `timezoneOffset` on data in this upload.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes
	Range: Must be one of:
		`across-the-board-timezone`
		`utc-bootstrapping`
		`none`

<!-- start editable commentary on timeProcessing -->

For data auditing purposes, we store a string encoding the type of algorithm used to generate the `time`, `timezoneOffset`, and other related fields from the local `deviceTime`. At present, there are only three options for this string:
- `across-the-board-timezone` for devices (all BGMs, for example) that cannot have their `deviceTime` values ["bootstrapped" to a UTC `time` value](http://developer.tidepool.io/chrome-uploader/docs/BootstrappingToUTC.html 'Bootstrapping to UTC'); in such cases, we apply a single user-selected timezone to every `deviceTime` "across the board" to generate the `time` value.
- `utc-bootstrapping` for devices (most insulin pumps and CGMs) where we use a combination of the user-selected timezone at time of upload, the most recent timestamp on device, and the history of display time changes on the device to infer the correct `time` value for each record.
- `none` for data sources that already include a UTC-anchored `time` value. At present, the *only* data source for which this is true is Dexcom G5 data coming through Apple's iOS HealthKit integration.

<!-- end editable commentary on timeProcessing -->

* * * * *

### timezone

[ingestion, storage, client] A string timezone name from the [IANA timezone database](https://www.iana.org/time-zones).

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes

<!-- start editable commentary on timezone -->

The `timezone` is the timezone *selected* by the user manually in the Chrome uploader at the time of upload, or (at present, only in the case of Dexcom G5 data from HealthKit), the timezone reported by the mobile device at the time of upload.

Note that we use the [Moment Timezone](http://momentjs.com/timezone/ 'Moment Timezone') library for the implementation of both [bootstrapping to UTC](http://developer.tidepool.io/chrome-uploader/docs/BootstrappingToUTC.html 'Bootstrapping to UTC') (in the Chrome uploader) and Tidepool's client web application, blip. Moment Timezone in turn includes a copy of the IANA timezone database. Moment Timezone is updated frequently to include updates to the IANA database, but we do not always update *our* dependencies very often, so in reality the possible values of this field are limited to the string timezone names recognized by the IANA timezone database *included in our current version of Moment Timezone*.

<!-- end editable commentary on timezone -->

* * * * *

### uploadId

See [common fields](../common.md).

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: no (generated by platform)

<!-- start editable commentary on uploadId -->

#### For Jellyfish
The `uploadId` is a string ID generated by hashing various pieces of information about the upload and prefixed with `upid_`. It is included on the upload metadata as well as on *every datum* uploaded in one upload "session". In the Chrome uploader, an upload "session" is defined as the batch of data resulting from connecting a single device, reading the data from it, and transforming the response into the Tidepool data model.

Unfortunately, it is becoming increasingly difficult to define what an upload "session" is now that Tidepool is uploading Dexcom G5 through integration with Apple iOS HealthKit nearly continuously. At present, we recommend producing an upload metadata record no more frequently than every 100 <!-- Question by Eden: Is a record the same as a datum? -->records when data is being uploaded continuously.

#### For Platform
The `uploadId` is generated and returned by `platform` when opening an upload session. The `uploadId` should be used as part of the URI when adding new data.  
`uploadId` should not be used in any POST bodies when uploading to `platform`.

<!-- end editable commentary on uploadId -->

* * * * *

### version

[ingestion, storage, client] A string encoding the version of the uploading client.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes

<!-- start editable commentary on version -->

A string identifying the software version of the uploading client. For the Chrome uploader, this will be a [semver](http://semver.org/ 'semver')—for example, `1.25.2`. For other uploading clients such as Tidepool iOS applications, the format includes the namespace and semver of the app: `org.tidepool.blipnotes:1.25:2`.

<!-- end editable commentary on version -->

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
	"type": "upload",
	"byUser": "154bb78230",
	"computerTime": "2016-06-27T18:09:55",
	"deviceManufacturers": "Tandems",
	"deviceModel": "Devicey McDeviceface",
	"deviceSerialNumber": "11359410",
	"deviceTags": [
		"bgm",
		"cgm"
	],
	"timeProcessing": "across-the-board-timezone",
	"timezone": "Europe/London",
	"uploadId": "SampleUploadId",
	"version": "0.100.0",
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-06-27T18:09:55",
	"guid": "e46ceaf2-e6af-4eb2-9583-3b6095f44474",
	"id": "eed794bbf9ec4b118f5e4c158216d45d",
	"time": "2016-06-28T01:09:55.131Z",
	"timezoneOffset": -420
}
```

### example (ingestion)

```json
{
	"type": "upload",
	"byUser": "eda1e15c6a",
	"computerTime": "2016-06-27T18:09:55",
	"deviceManufacturers": "Tandems",
	"deviceModel": "Devicey McDeviceface",
	"deviceSerialNumber": "B97B6D59",
	"deviceTags": [
		"bgm",
		"cgm"
	],
	"timeProcessing": "utc-bootstrapping",
	"timezone": "Europe/London",
	"uploadId": "SampleUploadId",
	"version": "0.100.0",
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-06-27T18:09:55",
	"time": "2016-06-28T01:09:55.132Z",
	"timezoneOffset": -420
}
```

### example (storage)

```json
{
	"type": "upload",
	"byUser": "e9c6044f37",
	"computerTime": "2016-06-27T18:09:55",
	"deviceManufacturers": "Tandems",
	"deviceModel": "Devicey McDeviceface",
	"deviceSerialNumber": "59579660",
	"deviceTags": [
		"bgm",
		"cgm"
	],
	"timeProcessing": "utc-bootstrapping",
	"timezone": "Europe/London",
	"uploadId": "SampleUploadId",
	"version": "0.100.0",
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2016-06-28T01:10:00.132Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-06-27T18:09:55",
	"guid": "42b5f8b1-699a-4c15-ab62-33934791ea7b",
	"id": "451beb9d69b64bc2a60a1696559f94d1",
	"time": "2016-06-28T01:09:55.132Z",
	"timezoneOffset": -420
}
```
