<!-- non-generated document! all areas editable -->

## Uploading sequences of `basal` events via jellyfish's `previous` field

The legacy jellyfish data ingestion API was designed for *real-time* ingestion of diabetes device data. This posed a problem for ingesting events like `basal` events that are *not* point-in-time but rather represent intervals of time. There are a couple of obvious solutions to this problem:
1. At the start `time` of a `basal` event, upload the `basal` and include the expected `duration` but update it later if it turns out to be incorrect when the next `basal` event is ingested.
1. At the start `time` of a `basal` event, upload the `basal`; when the next `basal` interval starts, upload it with a reference to the *first* basal. Keep including a reference to the previous basal on each `basal` event and use the actual sequence of `basal`s to determine the actual `duration` of each.

Partly because insulin pumps tend to report `basal` events *without* durations—most pumps simply report "basal rate change" events when the pump switches from delivering one rate to another—the second strategy, which does not require the inclusion of a `duration` on each `basal` event, was chosen as the strategy implemented in jellyfish. For a deep dive into the details of how the legacy jellyfish ingestion API processed sequenced `basal` events with a `previous`, see the following section.

In Tidepool's new platform APIs (under active development as of April, 2016 at the time of the initial drafting of this document), `previous` will no longer be an allowed field on `basal` events, and all `basal` events are expected to be uploaded with a `duration`. Essentially, we are now placing the burden on the client to process the sequence of raw basal (rate change) events coming from an insulin pump and determine the `duration` of each interval `basal` event prior to upload. Since the challenge of determining the `duration` for `basal` events has proven to be slightly different given each manufacturer's raw data model, we believe that it makes the most sense for determining the `duration` of `basal` events to fall within the uploading client's responsibilities.

### Uploading sequences of `scheduled` basal (rate change) events

We start with a basal with no previous:

```json
{
  "type": "basal",
  "deliveryType": "scheduled",
  "duration": 3600000,
  "rate": 0.7,
  "scheduleName": "Vacation",
  "clockDriftOffset": 0,
  "conversionOffset": 0,
  "deviceId": "DevId0987654321",
  "deviceTime": "2016-04-25T12:00:00",
  "guid": "4f90a365-647c-49e0-8ff5-365df35019cc",
  "time": "2016-04-25T19:00:00.000Z",
  "timezoneOffset": -420,
  "uploadId": "SampleUploadId"
}
```

Then we submit another basal that includes the first as its `previous`:

```json
{
  "type": "basal",
  "deliveryType": "scheduled",
  "duration": 39600000,
  "rate": 1.2,
  "previous": {
    "type": "basal",
    "deliveryType": "scheduled",
    "duration": 3600000,
    "rate": 0.7,
    "scheduleName": "Vacation",
    "clockDriftOffset": 0,
    "conversionOffset": 0,
    "deviceId": "DevId0987654321",
    "deviceTime": "2016-04-25T12:00:00",
    "guid": "4f90a365-647c-49e0-8ff5-365df35019cc",
    "time": "2016-04-25T19:00:00.000Z",
    "timezoneOffset": -420,
    "uploadId": "SampleUploadId"
  },
  "scheduleName": "Weekend",
  "clockDriftOffset": 0,
  "conversionOffset": 0,
  "deviceId": "DevId0987654321",
  "deviceTime": "2016-04-25T13:00:00",
  "guid": "f41d375f-b92a-4aef-807e-05963370b420",
  "time": "2016-04-25T20:00:00.000Z",
  "timezoneOffset": -420,
  "uploadId": "SampleUploadId"
}
```

This will result in the jellyfish API storing the following to the Tidepool cloud:

```json
[
  {
    "type": "basal",
    "deliveryType": "scheduled",
    "duration": 3600000,
    "rate": 0.7,
    "scheduleName": "Vacation",
    "_active": true,
    "_groupId": "abcdef",
    "_schemaVersion": 0,
    "_version": 0,
    "clockDriftOffset": 0,
    "conversionOffset": 0,
    "createdTime": "2016-04-25T20:00:05.000Z",
    "deviceId": "DevId0987654321",
    "deviceTime": "2016-04-25T12:00:00",
    "guid": "4f90a365-647c-49e0-8ff5-365df35019cc",
    "id": "fcjk8r9m8hrqaiskaa3oa7ol47tkfefe",
    "time": "2016-04-25T19:00:00.000Z",
    "timezoneOffset": -420,
    "uploadId": "SampleUploadId"
  },
  {
    "type": "basal",
    "deliveryType": "scheduled",
    "duration": 39600000,
    "rate": 1.2,
    "scheduleName": "Weekend",
    "_active": true,
    "_groupId": "abcdef",
    "_schemaVersion": 0,
    "_version": 0,
    "clockDriftOffset": 0,
    "conversionOffset": 0,
    "createdTime": "2016-04-25T20:00:05.000Z",
    "deviceId": "DevId0987654321",
    "deviceTime": "2016-04-25T13:00:00",
    "guid": "f41d375f-b92a-4aef-807e-05963370b420",
    "id": "dshhn6ev3uc7gbbe6kq7aqlik8tvhjn7",
    "time": "2016-04-25T20:00:00.000Z",
    "timezoneOffset": -420,
    "uploadId": "SampleUploadId"
  }
]
```

The above case represents the normal and best-case scenario, but the jellyfish API was also designed to handle various cases in which not all of the data expectations are met.

**Case 1**: A sequence of `scheduled` basals with a skipped event.

As before, we start with a basal with no previous:

```json
{
  "type": "basal",
  "deliveryType": "scheduled",
  "duration": 3600000,
  "rate": 0.7,
  "scheduleName": "Vacation",
  "clockDriftOffset": 0,
  "conversionOffset": 0,
  "deviceId": "DevId0987654321",
  "deviceTime": "2016-04-25T12:00:00",
  "guid": "4f90a365-647c-49e0-8ff5-365df35019cc",
  "time": "2016-04-25T19:00:00.000Z",
  "timezoneOffset": -420,
  "uploadId": "SampleUploadId"
}
```

Then we submit another basal with a `previous` that is *not* the first `basal` we started with but rather an event that has *not* been uploaded between the first `basal` submitted and the current one:

```json
{
  "type": "basal",
  "deliveryType": "scheduled",
  "duration": 73800000,
  "rate": 0.325,
  "previous": {
    "type": "basal",
    "deliveryType": "scheduled",
    "duration": 3600000,
    "rate": 0.4,
    "scheduleName": "Stress",
    "clockDriftOffset": 0,
    "conversionOffset": 0,
    "deviceId": "DevId0987654321",
    "deviceTime": "2016-04-25T15:00:00",
    "guid": "247c5c1c-d392-48c4-8df2-b55748e873cf",
    "time": "2016-04-25T22:00:00.000Z",
    "timezoneOffset": -420,
    "uploadId": "SampleUploadId"
  },
  "scheduleName": "Stress",
  "clockDriftOffset": 0,
  "conversionOffset": 0,
  "deviceId": "DevId0987654321",
  "deviceTime": "2016-04-25T16:00:00",
  "guid": "41f708b3-34fb-4dc8-820c-e780c411a129",
  "time": "2016-04-25T23:00:00.000Z",
  "timezoneOffset": -420,
  "uploadId": "SampleUploadId"
}
```

This will result in the jellyfish API storing the following to the Tidepool cloud:

```json
[
  {
    "type": "basal",
    "deliveryType": "scheduled",
    "duration": 3600000,
    "rate": 0.7,
    "scheduleName": "Vacation",
    "_active": true,
    "_groupId": "abcdef",
    "_schemaVersion": 0,
    "_version": 1,
    "clockDriftOffset": 0,
    "conversionOffset": 0,
    "createdTime": "2016-04-25T23:09:05.140Z",
    "deviceId": "DevId0987654321",
    "deviceTime": "2016-04-25T12:00:00",
    "guid": "4f90a365-647c-49e0-8ff5-365df35019cc",
    "id": "fcjk8r9m8hrqaiskaa3oa7ol47tkfefe",
    "time": "2016-04-25T19:00:00.000Z",
    "timezoneOffset": -420,
    "uploadId": "SampleUploadId",
    "annotations": [
      {
        "code": "basal/mismatched-series",
        "nextId": "vppkt7da2u8tdokkt0jbrbvepllthrv2"
      }
    ]
  },
  {
    "type": "basal",
    "deliveryType": "scheduled",
    "duration": 73800000,
    "rate": 0.325,
    "scheduleName": "Stress",
    "_active": true,
    "_groupId": "abcdef",
    "_schemaVersion": 0,
    "_version": 0,
    "clockDriftOffset": 0,
    "conversionOffset": 0,
    "createdTime": "2016-04-25T23:09:05.172Z",
    "deviceId": "DevId0987654321",
    "deviceTime": "2016-04-25T16:00:00",
    "guid": "41f708b3-34fb-4dc8-820c-e780c411a129",
    "id": "vppkt7da2u8tdokkt0jbrbvepllthrv2",
    "time": "2016-04-25T23:00:00.000Z",
    "timezoneOffset": -420,
    "uploadId": "SampleUploadId"
  }
]
```

Note that the jellyfish ingestion API does **not** store the `previous` with a `time` of `2016-04-25T22:00:00.000Z` since this reference did *not* match a `basal` event that had already been submitted and stored to the Tidepool cloud. In addition, the first `basal` submitted (i.e., the `basal` just prior to the gap in the sequence) is marked with an annotation with the code `basal/mismatched-series`.

**Case 2**: A `scheduled` that overlaps with a prior event in the basal stream.

Once again we start by submitting a basal with no previous:

```json
{
  "type": "basal",
  "deliveryType": "scheduled",
  "duration": 4000000,
  "rate": 1.9,
  "scheduleName": "Weekend",
  "clockDriftOffset": 0,
  "conversionOffset": 0,
  "deviceId": "DevId0987654321",
  "deviceTime": "2016-04-25T15:00:00",
  "guid": "f9122f02-3690-439e-8130-4cbda9a5a618",
  "time": "2016-04-25T22:00:00.000Z",
  "timezoneOffset": -420,
  "uploadId": "SampleUploadId"
}
```

Then we submit another basal that includes the first as its `previous`, except that the `time` of the new `basal` occurs *before* the `time` that would be expected had the `duration` of the first basal event been fulfilled:

```json
{
  "type": "basal",
  "deliveryType": "scheduled",
  "duration": 77400000,
  "rate": 0.875,
  "previous": {
    "type": "basal",
    "deliveryType": "scheduled",
    "duration": 4000000,
    "rate": 1.9,
    "scheduleName": "Weekend",
    "clockDriftOffset": 0,
    "conversionOffset": 0,
    "deviceId": "DevId0987654321",
    "deviceTime": "2016-04-25T15:00:00",
    "guid": "f9122f02-3690-439e-8130-4cbda9a5a618",
    "time": "2016-04-25T22:00:00.000Z",
    "timezoneOffset": -420,
    "uploadId": "SampleUploadId"
  },
  "scheduleName": "Weekend",
  "clockDriftOffset": 0,
  "conversionOffset": 0,
  "deviceId": "DevId0987654321",
  "deviceTime": "2016-04-25T16:00:00",
  "guid": "38d9e8c6-943d-4e76-aede-25c4a6a7b4ba",
  "time": "2016-04-25T23:00:00.000Z",
  "timezoneOffset": -420,
  "uploadId": "SampleUploadId"
}
```

This will result in the jellyfish API storing the following to the Tidepool cloud:

```json
[
  {
    "type": "basal",
    "deliveryType": "scheduled",
    "duration": 3600000,
    "expectedDuration": 4000000,
    "rate": 1.9,
    "scheduleName": "Weekend",
    "_active": true,
    "_groupId": "abcdef",
    "_schemaVersion": 0,
    "_version": 1,
    "clockDriftOffset": 0,
    "conversionOffset": 0,
    "createdTime": "2016-04-25T23:29:52.209Z",
    "deviceId": "DevId0987654321",
    "deviceTime": "2016-04-25T15:00:00",
    "guid": "f9122f02-3690-439e-8130-4cbda9a5a618",
    "id": "up6uvs31k0qte789jd24r7rf27fduuv8",
    "time": "2016-04-25T22:00:00.000Z",
    "timezoneOffset": -420,
    "uploadId": "SampleUploadId"
  },
  {
    "type": "basal",
    "deliveryType": "scheduled",
    "duration": 77400000,
    "rate": 0.875,
    "scheduleName": "Weekend",
    "_active": true,
    "_groupId": "abcdef",
    "_schemaVersion": 0,
    "_version": 0,
    "clockDriftOffset": 0,
    "conversionOffset": 0,
    "createdTime": "2016-04-25T23:33:07.008Z",
    "deviceId": "DevId0987654321",
    "deviceTime": "2016-04-25T16:00:00",
    "guid": "38d9e8c6-943d-4e76-aede-25c4a6a7b4ba",
    "id": "vppkt7da2u8tdokkt0jbrbvepllthrv2",
    "time": "2016-04-25T23:00:00.000Z",
    "timezoneOffset": -420,
    "uploadId": "SampleUploadId"
  }
]
```

Note that the `duration` on the initial basal event was updated to reflect the actual length of the interval during which that segment of the basal schedule ran. An [`expectedDuration`](./scheduled.md#expectedduration) was also added by the jellyfish ingestion service to retain a record of the original `duration` that was stored before the first basal event was truncated by the second.
