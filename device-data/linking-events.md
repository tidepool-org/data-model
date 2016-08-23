<!-- non-generated document! all areas editable -->

## Linking Events

Not all events from diabetes management devices in the Tidepool data model(s) are independent. Some events are logically related—perhaps even roughly in a cause-and-effect relationship. In cases where there is a logical connection between events, we endeavor to preserve that connection in the standardized form of the data stored in the Tidepool cloud.

At the time of the drafting of this document in June, 2016, new platform APIs are currently under construction at Tidepool. These will replace the ["jellyfish"](https://github.com/tidepool-org/jellyfish 'Tidepool on GitHub: jellyfish') legacy diabetes data ingestion service, among other services. The strategies for linking events differ slightly when ingesting data through the new platform API versus through the legacy jellyfish API, although *the storage and client data models for linked events are identical, no matter which service was used to ingest the data*. This document covers both ingestion strategies, so pay close attention to which section you're reading!

### List of all (potentially) linked events

- `wizard` -> `bolus` ([details](./types/wizard.md#bolus))
- `alarm` -> `status` ([details](./types/deviceEvent/alarm.md#status))
- `reservoirChange` -> `status` ([details](./types/deviceEvent/reservoirChange.md#status))

### Linking events through the legacy jellyfish ingestion API

> DEPRECATED

The legacy jellyfish ingestion service did not use [GUIDs](https://en.wikipedia.org/wiki/Globally_unique_identifier 'Wikipedia: Globally unique identifier') for the `id` field on ingested events. Instead, the `id` field was the *determinstic* result of a hash of several fields, always including `type`, `time`, and `deviceId` plus various other fields depending on the `type` (e.g., including `subType` where relevant). One of the reasons that this deterministic hashing strategy was chosen was because it made interlinking events easy *even when events were not uploaded to the platform in order*.

The best exemplar of diabetes device event linking is the link between bolus calculation events (Tidepool's [`wizard`](./types/wizard.md) type) and the resulting [`bolus`](./types/bolus/README.md)es. When ingesting through the jellyfish service, it is necessary to upload *both* the `wizard` event with the `bolus` embedded *and* the `bolus` itself independently. For example:

```json
[{
  "type": "bolus",
  "subType": "normal",
  "normal": 1,
  "clockDriftOffset": 0,
  "conversionOffset": 0,
  "deviceId": "DevId0987654321",
  "deviceTime": "2016-06-14T10:52:45",
  "guid": "4c2f3acc-8d1d-4df0-bc88-2fad64df8151",
  "time": "2016-06-14T17:52:45.845Z",
  "timezoneOffset": -420,
  "uploadId": "SampleUploadId"
},
{
  "type": "wizard",
  "bgInput": 32,
  "bgTarget": {
    "target": 85,
    "high": 145
  },
  "bolus": {
    "type": "bolus",
    "subType": "normal",
    "normal": 1,
    "clockDriftOffset": 0,
    "conversionOffset": 0,
    "deviceId": "DevId0987654321",
    "deviceTime": "2016-06-14T10:52:45",
    "time": "2016-06-14T17:52:45.845Z",
    "timezoneOffset": -420,
    "uploadId": "SampleUploadId"
  },
  "carbInput": 109,
  "insulinCarbRatio": 6,
  "insulinOnBoard": 20.032,
  "insulinSensitivity": 6,
  "recommended": {
    "carb": 18.25,
    "correction": 5.25,
    "net": 3.5
  },
  "units": "mg/dL",
  "clockDriftOffset": 0,
  "conversionOffset": 0,
  "deviceId": "DevId0987654321",
  "deviceTime": "2016-06-14T10:52:45",
  "guid": "b6a3e6b7-d44f-44bb-810e-189b8f2b03c2",
  "time": "2016-06-14T17:52:45.845Z",
  "timezoneOffset": -420,
  "uploadId": "SampleUploadId"
}]
```

Upon ingestion of the `bolus` event in this array, the jellyfish services runs the hashing algorithm to find the `bolus`'s `id` and stores it on the object with the label `id`. Then, upon ingestion of the `wizard` event in this array, the jellyfish service runs the hashing algorithm on the embedded `bolus` (again), resulting in the same `id`, then the service replaces the `bolus` field on the `wizard` with *just* the `id`, providing efficient linking between the two events. Because of the deterministic nature of the jellyfish hashing algorithm, it doesn't matter if the uploading client uploads the `bolus` first or the `wizard`.

The resulting stored data will look like:

```json
[{
  "type": "bolus",
  "subType": "normal",
  "normal": 1,
  "clockDriftOffset": 0,
  "conversionOffset": 0,
  "deviceId": "DevId0987654321",
  "deviceTime": "2016-06-14T10:52:45",
  "time": "2016-06-14T17:52:45.845Z",
  "timezoneOffset": -420,
  "uploadId": "SampleUploadId",
  "_groupId": "f4c834c27a",
  "guid": "4c2f3acc-8d1d-4df0-bc88-2fad64df8151",
  "id": "hbnktcpbppt98g2a2o61qdc25k6kvo13",
  "createdTime": "2016-06-14T18:03:50.662Z",
  "_version": 0,
  "_active": true,
  "_schemaVersion": 1
}, {
  "type": "wizard",
  "bgInput": 1.7762393571345707,
  "bgTarget": {
    "target": 4.718135792388703,
    "high": 8.048584587016023
  },
  "bolus": "hbnktcpbppt98g2a2o61qdc25k6kvo13",
  "carbInput": 109,
  "insulinCarbRatio": 6,
  "insulinOnBoard": 20.032,
  "insulinSensitivity": 0.33304487946273204,
  "recommended": {
    "carb": 18.25,
    "correction": 5.25,
    "net": 3.5
  },
  "units": "mmol/L",
  "clockDriftOffset": 0,
  "conversionOffset": 0,
  "deviceId": "DevId0987654321",
  "deviceTime": "2016-06-14T10:52:45",
  "time": "2016-06-14T17:52:45.845Z",
  "timezoneOffset": -420,
  "uploadId": "SampleUploadId",
  "_groupId": "f4c834c27a",
  "guid": "b6a3e6b7-d44f-44bb-810e-189b8f2b03c2",
  "id": "aiipljcqrquq96pugkbr2bfj4mb4r2mv",
  "createdTime": "2016-06-14T18:03:50.664Z",
  "_version": 0,
  "_active": true,
  "_schemaVersion": 1
}]
```

### Linking events through the new platform ingestion API

Unlike the legacy jellyfish ingestion service, the new platform ingestion API creates GUIDs for the `id` of each event. This means that linked events such as pairs of `wizard` and `bolus` events **cannot** be uploaded separately. Instead, only the "outer" event–that is, the event that embeds another event that it wishes to link to–is uploaded with the "inner" linked event embedded inside it. Upon ingestion of this compound event, the new platform ingestion service:

- generates the GUID for the inner event and stores it on that event's `id` field
- extracts and stores the inner event (augmented with its newly-generated `id`) as an independent event
- updates the appropriate field on the outer event to contain just the newly-generated GUID for the inner event instead of the entire object

To demonstrate with the same example data as above, the data for ingestion via the new platform ingestion API looks like:

```json
[{
  "type": "wizard",
  "bgInput": 32,
  "bgTarget": {
    "target": 85,
    "high": 145
  },
  "bolus": {
    "type": "bolus",
    "subType": "normal",
    "normal": 1,
    "clockDriftOffset": 0,
    "conversionOffset": 0,
    "deviceId": "DevId0987654321",
    "deviceTime": "2016-06-14T10:52:45",
    "time": "2016-06-14T17:52:45.845Z",
    "timezoneOffset": -420,
    "uploadId": "SampleUploadId"
  },
  "carbInput": 109,
  "insulinCarbRatio": 6,
  "insulinOnBoard": 20.032,
  "insulinSensitivity": 6,
  "recommended": {
    "carb": 18.25,
    "correction": 5.25,
    "net": 3.5
  },
  "units": "mg/dL",
  "clockDriftOffset": 0,
  "conversionOffset": 0,
  "deviceId": "DevId0987654321",
  "deviceTime": "2016-06-14T10:52:45",
  "time": "2016-06-14T17:52:45.845Z",
  "timezoneOffset": -420,
  "uploadId": "SampleUploadId"
}]
```

And the resulting data is nearly exactly the same as the data resulting from ingestion through the legacy jellyfish API, the only difference being that the `id`s on each object are [RFC 4122](https://tools.ietf.org/html/rfc4122 'RFC 4122: A Universally Unique IDentifier (UUID) URN Namespace') version 4 GUIDs with all `-`s stripped:

```json
[{
  "type": "bolus",
  "subType": "normal",
  "normal": 1,
  "clockDriftOffset": 0,
  "conversionOffset": 0,
  "deviceId": "DevId0987654321",
  "deviceTime": "2016-06-14T10:52:45",
  "time": "2016-06-14T17:52:45.845Z",
  "timezoneOffset": -420,
  "uploadId": "SampleUploadId",
  "_groupId": "f4c834c27a",
  "guid": "4c2f3acc-8d1d-4df0-bc88-2fad64df8151",
  "id": "9006526e4d8344a3987eea1a5f327426",
  "createdTime": "2016-06-14T18:03:50.662Z",
  "_version": 0,
  "_active": true,
  "_schemaVersion": 1
}, {
  "type": "wizard",
  "bgInput": 1.7762393571345707,
  "bgTarget": {
    "target": 4.718135792388703,
    "high": 8.048584587016023
  },
  "bolus": "9006526e4d8344a3987eea1a5f327426",
  "carbInput": 109,
  "insulinCarbRatio": 6,
  "insulinOnBoard": 20.032,
  "insulinSensitivity": 0.33304487946273204,
  "recommended": {
    "carb": 18.25,
    "correction": 5.25,
    "net": 3.5
  },
  "units": "mmol/L",
  "clockDriftOffset": 0,
  "conversionOffset": 0,
  "deviceId": "DevId0987654321",
  "deviceTime": "2016-06-14T10:52:45",
  "time": "2016-06-14T17:52:45.845Z",
  "timezoneOffset": -420,
  "uploadId": "SampleUploadId",
  "_groupId": "f4c834c27a",
  "guid": "b6a3e6b7-d44f-44bb-810e-189b8f2b03c2",
  "id": "f2b9eb6c319b422f9b89cfb60bc2e298",
  "createdTime": "2016-06-14T18:03:50.664Z",
  "_version": 0,
  "_active": true,
  "_schemaVersion": 1
}]
```
