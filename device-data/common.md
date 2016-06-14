<!-- auto-generated doc! most areas *not* editable -->

## Common Fields

Jump to...

  - [_active](#_active)
  - [_groupId](#_groupid)
  - [_schemaVersion](#_schemaversion)
  - [_version](#_version)
  - [clockDriftOffset](#clockdriftoffset)
  - [conversionOffset](#conversionoffset)
  - [createdTime](#createdtime)
  - [deviceId](#deviceid)
  - [deviceTime](#devicetime)
  - [guid](#guid)
  - [id](#id)
  - [time](#time)
  - [timezoneOffset](#timezoneoffset)
  - [uploadId](#uploadid)

**NB:** All fields are *required* unless otherwise noted.

### _active

<!-- start editable commentary on _active -->

[storage] A Boolean value. Added to each event by the ingestion API prior to storage.

A flag that enables 'tombstoning' of events. Any data with `_active: false` does *not* get returned from the API(s) that serve data to client applications. Hence, this flag strategy allows for effective deletion of data while maintaining an audit trail.

<!-- end editable commentary on _active -->

### _groupId

<!-- start editable commentary on _groupId -->

[storage] A string ID. Added to each event by the ingestion API prior to storage.

An ID hash linking each datum to a particular Tidepool platform user. `_groupId` is a *private* hash ID, not to be confused with a user's public user ID hash.

<!-- end editable commentary on _groupId -->

### _schemaVersion

<!-- start editable commentary on _schemaVersion -->

[storage] An integer value. Added to each event by the ingestion API prior to storage.

The `_schemaVersion` specifies the version of the Tidepool data model in use when the datum was processed and ingested. The current `_schemaVersion` for all Tidepool data is 1, documented here.

All data prior to the release of 'Bootstrapping to UTC' (see [technical documentation here](https://github.com/tidepool-org/chrome-uploader/blob/master/docs/BootstrappingToUTC.md) for details) either did not have a stored `_schemaVersion` or was marked `_schemaVersion: 0`. As changes are made to the Tidepool data model, we will continue to increment the `_schemaVersion` and provide updates to this documentation.

<!-- end editable commentary on _schemaVersion -->

### _version

<!-- start editable commentary on _version -->

[storage] An integer value. Added to each event by the ingestion API prior to storage.

A 'version' for each datum. The original datum will have a `_version` of 0. If and when the datum is modified, the original datum will be marked `_active: false` while the modified datum will have its `_version` bumped to 1.

<!-- end editable commentary on _version -->

### clockDriftOffset

<!-- start editable commentary on clockDriftOffset -->

[ingestion, storage, client] (OPTIONAL) An integer value representing milliseconds. Optionally added to each event during data processing in the Tidepool uploader Chrome application.

This field is another result of the Tidepool platform's best effort to convert device local (relative) display time (see [`deviceTime`](#devicetime) below) to UTC. While `time` encodes the UTC timestamp resulting from the conversion, the optional `clockDriftOffset` records the offest from UTC in milliseconds resulting from small adjustments a user may make to a device's display time due to "clock drift." See the technical documentation describing '[Bootstrapping to UTC](https://github.com/tidepool-org/chrome-uploader/blob/master/docs/BootstrappingToUTC.md)' for the details of this 'best effort' conversion.

<!-- end editable commentary on clockDriftOffset -->

### conversionOffset

<!-- start editable commentary on conversionOffset -->

[ingestion, storage, client] An integer value representing milliseconds. Added to each event during data processing in the Tidepool uploader Chrome application.

This field is another result of the Tidepool platform's best effort to convert device local (relative) display time (see [`deviceTime`](#devicetime) below) to UTC. While `time` encodes the UTC timestamp resulting from the conversion, `conversionOffset` (which may be - and often is - `0`) records the offset from UTC in milliseconds resulting from very large adjustments a user may make to a device's display time due to realizing that the device was set to the wrong day, month, or even year. See the technical documentation describing '[Bootstrapping to UTC](https://github.com/tidepool-org/chrome-uploader/blob/master/docs/BootstrappingToUTC.md)' for the details of this 'best effort' conversion.

<!-- end editable commentary on conversionOffset -->

### createdTime

<!-- start editable commentary on createdTime -->

[storage] An ISO-8601 string timestamp. Added to each event by the ingestion API prior to storage.

An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601 'Wikipedia: ISO 8601')-formatted UTC timestamp with a final `Z` for 'Zulu' time - e.g., `2015-11-09T03:58:44.584Z`. `createdTime` is the machine-time when the event was first ingested into the Tidepool platform.

<!-- end editable commentary on createdTime -->

### deviceId

<!-- start editable commentary on deviceId -->

[ingestion, storage, client] A string ID. Added to each event during data processing in the Tidepool uploader Chrome application.

A string encoding the device that generated the datum. This should be globally unique to this device and repeatable with each upload. A device make and model with serial number, shortened, is a good value to include here.

Examples:

- `InsOmn-240243671` (taken from an Insulet OmniPod with serial number 240243671)
- `DexG4RecwitSha_SM62228608` (taken from a Dexcom G4 receiver with Share, serial number SM62228608)

<!-- end editable commentary on deviceId -->

### deviceTime

<!-- start editable commentary on deviceTime -->

[ingestion, storage, client]  An ISO-8601 string timestamp *without* timezone offset information. Added to each event during data processing in the Tidepool uploader Chrome application.

No diabetes device presently available stores data in UTC or anchored to UTC via a timezone offset. In other words, all diabetes devices currently store the time at which events on the device occurred in device relative time - that is, the display time on the device at the time the event occurred. The Tidepool platform makes a best effort to convert this device time to UTC (stored in the [`time`](#time) field), but the raw `deviceTime` is also stored for data-auditing purposes. It is stored in the [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601 'Wikipedia: ISO 8601') format, but *without* any timezone offset information - e.g., `2015-11-08T17:06:53`.

<!-- end editable commentary on deviceTime -->

### guid

<!-- start editable commentary on guid -->

[ingestion, storage, client] A string ID. Added to each event during data processing in the Tidepool uploader Chrome application.

An [RFC 4122](https://www.ietf.org/rfc/rfc4122.txt 'RFC 4122') version 4 UUID, generated using the [node-uuid](https://github.com/broofa/node-uuid 'GitHub: node-uuid') library in Tidepool's [uploader Chrome application](https://github.com/tidepool-org/chrome-uploader). See [`lib/core/api.js`](https://github.com/tidepool-org/chrome-uploader/blob/master/lib/core/api.js) for the implementation.

<!-- end editable commentary on guid -->

### id

<!-- start editable commentary on id -->

[storage, client] A string ID. Added to each event by the ingestion API prior to storage.

A deterministic and repeatable ID created by hashing several fields - the fields used vary to some extent by data type, but typically include the `type`, `subType` or similar (where applicable), `deviceId`, and `time`. See [`lib/misc.js`](https://github.com/tidepool-org/jellyfish/blob/master/lib/misc.js) in the Tidepool data ingestion api ([jellyfish](https://github.com/tidepool-org/jellyfish)) for the implementation. The fields used for hashing the `id` for each type are listed in the schema for each type; all schemas can be found in [`lib/schema/`](https://github.com/tidepool-org/jellyfish/tree/master/lib/schema).

This `id` is used for data de-duplication: since the same combination of the fields used in the hashing will produce the same `id` across multiple upload attempts, a simple database search for an existing datum with a particular `id` before storing an event suffices for the de-deduplication, although it should be noted that this method of de-duplication results in only the *first* upload attempt of an event with a particular `id` being stored; it does *not* natively allow for updating or overwriting events through subsequent uploads.

<!-- end editable commentary on id -->

### time

<!-- start editable commentary on time -->

[ingestion, storage, client] An ISO-8601 string timestamp. Added to each event during data processing in the Tidepool uploader Chrome application.

An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601 'Wikipedia: ISO 8601')-formatted timestamp including either a timezone offset from UTC or (most commonly, in Tidepool's current data processing) converted to UTC and formatted with a final `Z` for 'Zulu' time.

This field is the result of the Tidepool platform's best effort to convert device local (relative) display time (see [`deviceTime`](#devicetime) above) to UTC. Also see the technical documentation describing '[Bootstrapping to UTC](https://github.com/tidepool-org/chrome-uploader/blob/master/docs/BootstrappingToUTC.md)' for the details of this 'best effort' conversion.

Examples:

- `2015-11-08T17:06:53-08:00` (with timezone offset from UTC)
- `2015-11-09T01:06:53.555Z` ('Zulu' time formatting)

<!-- end editable commentary on time -->

### timezoneOffset

<!-- start editable commentary on timezoneOffset -->

[ingestion, storage, client] A positive or negative integer value representing minutes from UTC. Added to each event during data processing in the Tidepool uploader Chrome application.

This field is another result of the Tidepool platform's best effort to convert device local (relative) display time (see [`deviceTime`](#devicetime) above) to UTC. While `time` encodes the UTC timestamp resulting from the conversion, `timezoneOffset` encodes the offest in minutes *from* UTC to convert the UTC timestamp back to local display time. See the technical documentation describing '[Bootstrapping to UTC](https://github.com/tidepool-org/chrome-uploader/blob/master/docs/BootstrappingToUTC.md)' for the details of this 'best effort' conversion.

Examples:

- `0` (timezone offset for [Coordinated Universal Time (UTC)](https://en.wikipedia.org/wiki/Coordinated_Universal_Time 'Wikipedia: UTC'))
- `-480` (timezone offset for Pacific Standard Time in the United States)
- `60` (timezone offset for British Summer Time)

<!-- end editable commentary on timezoneOffset -->

### uploadId

<!-- start editable commentary on uploadId -->

[ingestion, storage, client] A string ID. Added to each event during data processing in the Tidepool uploader Chrome application.

An upload identifier; this field should be the `uploadId` of the corresponding [upload](./types/upload.md) record. At present, `uploadId`s are generated in Tidepool's [uploader Chrome application](https://github.com/tidepool-org/chrome-uploader) as a hash of various pieces of upload session metadata. See [`lib/core/api.js`](https://github.com/tidepool-org/chrome-uploader/blob/master/lib/core/api.js) for the implementation.

Note that `uploadId` does not figure in the calculations of an event record's `id`. This is so that multiple attempts to upload the same event record will nevertheless result in the same `id`; this `id` is used to prevent storage of multiple copies of the same event.

<!-- end editable commentary on uploadId -->

### example (all possible fields)

```json
{
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2016-06-14T02:05:49.239Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-06-13T19:05:44",
	"guid": "0f3f13b1-be2c-41b3-87b4-edc7e0a2fd36",
	"id": "272383b5fe274fd3b66eb31b536555c9",
	"time": "2016-06-14T02:05:44.239Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```
