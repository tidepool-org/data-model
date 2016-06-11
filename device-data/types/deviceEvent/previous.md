<!-- non-generated document! all areas editable -->

## Uploading sequences of `status` events via jellyfish's `previous` field

The legacy jellyfish data ingestion API was designed for *real-time* ingestion of diabetes device data. This posed a problem for ingesting events to represent intervals of time when all insulin delivery on an insulin pump is in a suspended state. There are a couple of solutions to this problem:
1. Whenever a suspension of insulin delivery starts, stop uploading data. Wait until the resume event occurs, then upload an event with a `time` at the time of suspension and a `duration` equal to the time elapsed between suspension and resumption.
1. At the start `time` of a suspension event, upload this `status`; when the next `status` event occurs (like a resumption), upload it with a reference to the *first* status. Keep including a reference to the previous status on each `status` event and use the types and sequences of all such events to determine the actual `duration` of suspensions of insulin delivery.

Partly because insulin pumps tend to report `status` events *without* durations–most pumps simply report "pump suspended" events when the pump switches from normal operation to the suspended state–the second strategy, which does not require the inclusion of a `duration` on each `status` event, was chosen as the strategy implemented in jellyfish. For a deep dive into the details of how the legacy jellyfish ingestion API processed sequenced `status` events with a `previous`, see the following section.

In Tidepool's new platform APIs (under active development as of June, 2016 at the time of the initial drafting of this document), `previous` will no longer be an allowed field on `status` events, and all `status` events are expected to represent periods of time when the insulin pump was in the `suspended` state and to be uploaded with a `duration`. Essentially, we are now placing the burden on the client to process the sequence of raw status change events coming from an insulin pump and determine the `duration` of any periods of suspension of insulin delivery prior to upload. Since the challenge of determining the `duration` for `status` events has proven to be slightly different given each manufacturer's raw data model, we believe that it makes the most sense for determining the `duration` of `status` events to fall within the uploading client's responsibilities.

### Uploading sequences of `status` events

In the jellyfish system, status events come in tuples delivered over time. The first event in the tuple must be a non-`resumed` status. Subsequent statuses may be any other status change until a `resumed` status is received. In other words, the `resumed` event closes the tuple. As each event in the tuple is received, the system updates the `duration` of the initial event in the tuple according to the differences in the timestamps.

An incomplete tuple—that is, a tuple that has not yet been "closed" by a `resumed` status—is annotated as such. When the tuple is complete, the jellyfish server removes the annotation. Said another way, `resumed` events are not stored, but instead are used to adjust the `duration` of the preceding status event that initiated the suspended state.

We start with a `suspended` status event with no `previous`:

```json
{
  "type": "deviceEvent",
  "subType": "status",
  "status": "suspended",
  "reason": {
    "suspended": "automatic"
  },
  "clockDriftOffset": 0,
  "conversionOffset": 0,
  "deviceId": "DevId0987654321",
  "deviceTime": "2016-06-10T12:00:00",
  "guid": "20865e2f-406b-4874-b432-0d8b92aef2d3",
  "time": "2016-06-10T19:00:00.000Z",
  "timezoneOffset": -420,
  "uploadId": "SampleUploadId"
}
```

At this point, the jellyfish APIs will store and allow the retrieval of:
```json
{
  "type": "deviceEvent",
  "subType": "status",
  "status": "suspended",
  "reason": {
    "suspended": "automatic"
  },
  "clockDriftOffset": 0,
  "conversionOffset": 0,
  "deviceId": "DevId0987654321",
  "deviceTime": "2016-06-10T12:00:00",
  "guid": "20865e2f-406b-4874-b432-0d8b92aef2d3",
  "time": "2016-06-10T19:00:00.000Z",
  "timezoneOffset": -420,
  "uploadId": "SampleUploadId",
  "annotations": [{
    "code": "status/incomplete-tuple"
  }]
}
```

We then submit a `resumed` event that includes the first `suspended` as its `previous`:

```json
{
  "type": "deviceEvent",
  "subType": "status",
  "status": "resumed",
  "reason": {
    "resumed": "manual"
  },
  "previous": {
    "type": "deviceEvent",
    "subType": "status",
    "status": "suspended",
    "reason": {
      "suspended": "automatic"
    },
    "clockDriftOffset": 0,
    "conversionOffset": 0,
    "deviceId": "DevId0987654321",
    "deviceTime": "2016-06-10T12:00:00",
    "guid": "20865e2f-406b-4874-b432-0d8b92aef2d3",
    "time": "2016-06-10T19:00:00.000Z",
    "timezoneOffset": -420,
    "uploadId": "SampleUploadId"
    },
  "clockDriftOffset": 0,
  "conversionOffset": 0,
  "deviceId": "DevId0987654321",
  "deviceTime": "2016-06-10T12:05:12",
  "guid": "8f9b4d1d-89bc-4c0c-a03e-bf8fb786f0ad",
  "time": "2016-06-10T19:05:12.000Z",
  "timezoneOffset": -420,
  "uploadId": "SampleUploadId"
}
```

This will result in the jellyfish API modifying the previously stored and annotated `suspended` event as follows:
```
{
  "type": "deviceEvent",
  "subType": "status",
  "status": "suspended",
  "duration": 312000,
  "reason": {
    "suspended": "automatic",
    "resumed": "manual"
  },
  "clockDriftOffset": 0,
  "conversionOffset": 0,
  "deviceId": "DevId0987654321",
  "deviceTime": "2016-06-10T12:00:00",
  "guid": "20865e2f-406b-4874-b432-0d8b92aef2d3",
  "time": "2016-06-10T19:00:00.000Z",
  "timezoneOffset": -420,
  "uploadId": "SampleUploadId"
}
```

The above case represents the normal and best-case scenario, but the jellyfish API was also designed to handle various cases in which not all of the data expectations are met.

In the unlikely event that the event specified by the `previous` field does not exist in the Tidepool cloud, the submitted event is stored but annotated to indicate this state.

As before, we start with a `suspended` with no `previous`:

```json
{
  "type": "deviceEvent",
  "subType": "status",
  "status": "suspended",
  "reason": {
    "suspended": "automatic"
  },
  "clockDriftOffset": 0,
  "conversionOffset": 0,
  "deviceId": "DevId0987654321",
  "deviceTime": "2016-06-10T12:00:00",
  "guid": "20865e2f-406b-4874-b432-0d8b92aef2d3",
  "time": "2016-06-10T19:00:00.000Z",
  "timezoneOffset": -420,
  "uploadId": "SampleUploadId"
}
```

Then we submit a `resumed` with a `previous` that is *not* the first `suspended` we started with but rather an event that has *not* been uploaded between the first `suspended` submitted and the current one:

```json
{
  "type": "deviceEvent",
  "subType": "status",
  "status": "resumed",
  "reason": {
    "resumed": "manual"
  },
  "previous": {
    "type": "deviceEvent",
    "subType": "status",
    "status": "suspended",
    "reason": {
      "suspended": "manual",
    },
    "clockDriftOffset": 0,
    "conversionOffset": 0,
    "deviceId": "DevId0987654321",
    "deviceTime": "2016-06-10T12:02:25",
    "guid": "42ea2c93-cda8-4793-ba6d-3ff0b2916049",
    "time": "2016-06-10T19:02:25.000Z",
    "timezoneOffset": -420,
    "uploadId": "SampleUploadId"
  },
  "clockDriftOffset": 0,
  "conversionOffset": 0,
  "deviceId": "DevId0987654321",
  "deviceTime": "2016-06-10T12:05:12",
  "guid": "8f9b4d1d-89bc-4c0c-a03e-bf8fb786f0ad",
  "time": "2016-06-10T19:05:12.000Z",
  "timezoneOffset": -420,
  "uploadId": "SampleUploadId"
}
```

This will result in the jellyfish API storing the following to the Tidepool cloud:

```
[{
  "type": "deviceEvent",
  "subType": "status",
  "status": "suspended",
  "reason": {
    "suspended": "automatic"
  },
  "clockDriftOffset": 0,
  "conversionOffset": 0,
  "deviceId": "DevId0987654321",
  "deviceTime": "2016-06-10T12:00:00",
  "guid": "20865e2f-406b-4874-b432-0d8b92aef2d3",
  "time": "2016-06-10T19:00:00.000Z",
  "timezoneOffset": -420,
  "uploadId": "SampleUploadId",
  "annotations": [{
    "code": "status/incomplete-tuple"
  }]
},{
  "type": "deviceEvent",
  "subType": "status",
  "status": "resumed",
  "reason": {
    "resumed": "manual"
  },
  "clockDriftOffset": 0,
  "conversionOffset": 0,
  "deviceId": "DevId0987654321",
  "deviceTime": "2016-06-10T12:05:12",
  "guid": "8f9b4d1d-89bc-4c0c-a03e-bf8fb786f0ad",
  "time": "2016-06-10T19:05:12.000Z",
  "timezoneOffset": -420,
  "uploadId": "SampleUploadId",
  "annotations": [{
    "code": "status/unknown-previous",
    "id": "0a5aa4b1b16e4bdc9b51e6ba6a5dfe5c"
  }]
}]
```

If there is *no* `previous` field specified on a `resumed` event, the same annotation (`status/unknown-previous`) is added.
