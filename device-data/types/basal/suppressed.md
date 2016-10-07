<!-- non-generated document! all areas editable -->

## the `suppressed` field on `temp` and `suspend` basal intervals

Some insulin pump data protocols provide enough information for us to track various aspects (e.g., `rate`, `scheduleName`) of the basal that *would have been in effect* had the currently active `temp` or `suspend` basal **not** been programmed (or triggered). Where this information is available, we provide it in as much detail as possible as an embedded object in the `suppressed` field on a `temp` or `suspend` basal interval.

In general, this `suppressed` object need and **must** only contain the bare minimum of information:
- the `type` (= `basal`)
- the `deliveryType` (only `scheduled` if the currently active basal is a `temp`; otherwise (i.e., if the currently active basal is a `suspend`), may be `scheduled` *or* `temp`)
- the `rate` of insulin delivery
- (optionally) the `scheduleName` if the suppressed interval is a `scheduled` basal and the name of the basal schedule is available through the insulin pump's data protocol[^a]

If the currently active basal is a `suspend` and the `suppressed` is a `temp`, then the following `temp` fields may also be present on the `suppressed` object:
- the `percent` of the scheduled basal rate
- another(!) nested `suppressed` object representing the originally `scheduled` basal interval

(More details of the precise allowed shape of a nested `suppressed` are available in the [`temp` basal documentation](./temp.md#suppressed)) and the [`suspend` basal documentation](./suspend.md#suppressed).)

### `suppressed` across schedule boundaries

When a `temp` or `suspend` basal crosses a basal schedule boundary, the basal rate that would have been in effect had the `temp` or `suspend` not been programmed *changes* in accordance with the schedule change, necessitating a splitting of the `temp` or `suspend` into multiple segments, each of type `basal`, with the sum of all segments' `duration`s adding up to the total duration of the temp or suspend reported by the insulin pump.

#### example

Assume this basal schedule is active:

```json
[{
  "start": 0, // midnight
  "rate": 0.25
},
{
  "start": 3600000, // 1 a.m.
  "rate": 0.2
},
{
  "start": 10800000, // 3 a.m.
  "rate": 0.25
},
{
  "start": 21600000, // 6 a.m.
  "rate": 0.6
},
{
  "start": 43200000, // 12 p.m.
  "rate": 0.35
}]
```

A `scheduled` basal event on a particular day at midnight according to this schedule would look like:

```json
{
  "type": "basal",
  "deliveryType": "scheduled",
  "duration": 3600000,
  "rate": 0.25,
  "scheduleName": "Standard",
  "clockDriftOffset": 0,
  "conversionOffset": 0,
  "deviceId": "DevId0987654321",
  "deviceTime": "2016-10-07T00:00:00",
  "time": "2016-10-07T07:00:00.000Z",
  "timezoneOffset": -420,
  "uploadId": "SampleUploadId"
}
```

Now let's say a user programs a `temp` basal at 12:25 a.m. to run for three hours, until 3:25 a.m. Then the `scheduled` basal will look almost the same, except the `duration` will be different since the scheduled segment will have only run for the twenty-five minutes from midnight to 12:25 a.m.:

```json
{
  "type": "basal",
  "deliveryType": "scheduled",
  "duration": 1500000, // 25 minutes from 12:00 a.m. to 12:25 a.m.
  "rate": 0.25,
  "scheduleName": "Standard",
  "clockDriftOffset": 0,
  "conversionOffset": 0,
  "deviceId": "DevId0987654321",
  "deviceTime": "2016-10-07T00:00:00",
  "time": "2016-10-07T07:00:00.000Z",
  "timezoneOffset": -420,
  "uploadId": "SampleUploadId"
}
```

The three-hour `temp` basal will cross schedule boundaries at 1 a.m. and 3 a.m., and so it will end up being divided into three segment intervals with a `suppressed` to match the segment of the schedule that would have been in effect at that time if the `temp` had not been programmed.

First `temp` interval:

```json
{
  "type": "basal",
  "deliveryType": "temp",
  "duration": 2100000, // 35 minutes from 12:25 a.m. to 1:00 a.m.
  "percent": 0.5,
  "rate": 0.125, // == percent * suppressed.rate
  "suppressed": {
    "type": "basal",
    "deliveryType": "scheduled",
    "rate": "0.25",
    "scheduleName": "Standard"
  },
  "clockDriftOffset": 0,
  "conversionOffset": 0,
  "deviceId": "DevId0987654321",
  "deviceTime": "2016-10-07T00:25:00",
  "time": "2016-10-07T07:25:00.000Z",
  "timezoneOffset": -420,
  "uploadId": "SampleUploadId"
}
```

Second `temp` interval:

```json
{
  "type": "basal",
  "deliveryType": "temp",
  "duration": 7200000, // 2 hours from 1:00 a.m. to 3:00 a.m.
  "percent": 0.5,
  "rate": 0.1, // == percent * suppressed.rate
  "suppressed": {
    "type": "basal",
    "deliveryType": "scheduled",
    "rate": "0.2",
    "scheduleName": "Standard"
  },
  "clockDriftOffset": 0,
  "conversionOffset": 0,
  "deviceId": "DevId0987654321",
  "deviceTime": "2016-10-07T01:00:00",
  "time": "2016-10-07T08:00:00.000Z",
  "timezoneOffset": -420,
  "uploadId": "SampleUploadId"
}
```

Third `temp` interval:

```json
{
  "type": "basal",
  "deliveryType": "temp",
  "duration": 1500000, // 25 minutes from 3:00 a.m. to 3:25 a.m.
  "percent": 0.5,
  "rate": 0.125, // == percent * suppressed.rate
  "suppressed": {
    "type": "basal",
    "deliveryType": "scheduled",
    "rate": "0.25",
    "scheduleName": "Standard"
  },
  "clockDriftOffset": 0,
  "conversionOffset": 0,
  "deviceId": "DevId0987654321",
  "deviceTime": "2016-10-07T03:00:00",
  "time": "2016-10-07T10:00:00.000Z",
  "timezoneOffset": -420,
  "uploadId": "SampleUploadId"
}
```

The `duration`s of all three `temp` intervals here adds up to the programmed `temp` duration: `2100000 + 7200000 + 1500000 = 10800000` (three hours).

For a `suspend` that crosses `scheduled` boundaries, the examples would be very similar, except with no `rate` on the "parent" `suspend` basal.

<!-- TODO: DISCUSS WITH GERRIT AND DARIN!!! -->
**NB:** A *known* issue with this data model is that when a `temp` or `suspend` basal is programmed for a certain `duration` and crosses more than one schedule boundary but then is *canceled* early within one of the "middle" (not edge) segments, we have no good way to represent the original `expectedDuration` of the *entire* programmed `temp` or `suspend`. Rather, the `expectedDuration` on a middle segment of a three-or-more segment `temp` or `suspend` basal should be the expected `duration` of *that* segment from the basal schedule.

### `suppressed` when a `temp` or `suspend` is edited

To date, we know of one insulin pump manufacturer (Medtronic) that allows for *editing* a `temp` basal while it is in effect, and in principle the same could apply to a `suspend` programmed with a `duration` (as allowed in the interface for OmniPods, for example). For the purposes of our `temp` basal model, we treat the editing of a `temp` basal as a cancellation followed by the immediate scheduling of a second `temp`. In other words, we do **not** consider the first `temp` basal to be `suppressed` by the edited `temp`. For example, consider a user running a "flat rate" basal schedule:

```json
[{
  "start": 0,
  "rate": 1.95
}]
```

At 8:00 a.m., this user schedule an 85% `temp` basal to run for four hours, but edits it after three hours and thirty-six minutes to change the percentage to 90%. The first `temp` basal event will look like this:

```json
{
  "type": "basal",
  "deliveryType": "temp",
  "duration": 12960000,
  "expectedDuration": 14400000,
  "percent": 0.85,
  "rate": 1.6575,
  "suppressed": {
    "type": "basal",
    "deliveryType": "scheduled",
    "scheduleName": "Weekend",
    "rate": 1.95
  },
  "clockDriftOffset": 0,
  "conversionOffset": 0,
  "deviceId": "DevId0987654321",
  "deviceTime": "2016-10-07T08:00:00",
  "guid": "634b43c7-9d0d-47ed-afec-3aac2db99a6a",
  "id": "9759417fa35c45839d0400240a13523c",
  "time": "2016-10-07T15:00:00.000Z",
  "timezoneOffset": -420,
  "uploadId": "SampleUploadId"
}
```

And the second will follow immediately in time but carries no indication that it is a "edited" `temp` (other than perhaps additional information in the `payload`); rather, it is indistinguishable from a "fresh" `temp` basal scheduled for the given time. Note in particular that its `suppressed` is the `scheduled` flat-rate basal, **not** the prior `temp` basal.

```json
{
  "type": "basal",
  "deliveryType": "temp",
  "duration": 1440000,
  "percent": 0.90,
  "rate": 1.755,
  "suppressed": {
    "type": "basal",
    "deliveryType": "scheduled",
    "scheduleName": "Weekend",
    "rate": 1.95
  },
  "clockDriftOffset": 0,
  "conversionOffset": 0,
  "deviceId": "DevId0987654321",
  "deviceTime": "2016-10-07T11:36:00",
  "guid": "634b43c7-9d0d-47ed-afec-3aac2db99a6a",
  "id": "9759417fa35c45839d0400240a13523c",
  "time": "2016-10-07T18:36:00.000Z",
  "timezoneOffset": -420,
  "uploadId": "SampleUploadId"
}
```

### nested `suppressed` in a partially automated insulin-delivery system

[^a]: Or inferable from other data, such as the history of the pump's settings.