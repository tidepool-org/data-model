<!-- non-generated document! all areas editable -->

 ## Out of Range Value
 Blood glucose meters, ketone meters and Continuous Glucose Monitors have a range within which they
 can measure levels. When a reading falls outside of this range, we need a mechanism to show that we
 have received a reading, but that it is out of range.

 This is done by creating a `cbg`, `smbg` or `bloodKetone` reading with a `value` that is 1 unit
 over (for a high reading) or 1 unit below (for a low reading) the range threshold, and then annotating
 the reading.

For example, for a low CGM reading for a device that displays in mg/dL with a low threshold of 40 mg/dL:
```json
{
  "type": "cbg",
  "units": "mg/dL",
  "value": 39,
  "clockDriftOffset": 0,
  "conversionOffset": 0,
  "deviceId": "DevId0987654321",
  "deviceTime": "2016-06-13T19:05:43",
  "guid": "cf64b6f6-54af-4e8b-a432-08d53c2484d4",
  "id": "da34f6f278984ae385c91cac6b91eff7",
  "time": "2016-06-14T02:05:43.959Z",
  "timezoneOffset": -420,
  "uploadId": "SampleUploadId",
  "annotations": [{
    "code": "bg/out-of-range",
    "value": "low",
    "threshold": 40,
  }]
}
```

Unlike all of the other data model types, the `out-of-range` annotation does not currently include a field for `units`.
Because of this, when annotating `cbg` or `smbg` readings, the `threshold` should **always** be in `mg/dL`,
even when the device displays readings in `mmol/L`.
Although this an unfortunate oversight, the reason for this is that many devices store readings in mg/dL, even
if they display readings in mmol/L. Even the example below is contrived, as we have not actually come across
a device that does this.

For `bloodKetone` readings, the `threshold` should be a value measured in `mmol/L`.  
We acknowledge that this is inconvenient and inconsistent with the rest of our data model,
and we hope to address it at some stage in the future.
We intend to address this by adding a `units` field, similar to the field used in the `cbg`, `smbg` and `bloodKetone` data types.

For example, for a high CGM reading for a device that displays in mmol/L with a high threshold of 23.0 mmol/L:
```json
{
  "type": "cbg",
  "units": "mmol/L",
  "value": 23.035604162838963,
  "clockDriftOffset": 0,
  "conversionOffset": 0,
  "deviceId": "DevId0987654321",
  "deviceTime": "2016-06-13T19:05:43",
  "guid": "cf64b6f6-54af-4e8b-a432-08d53c2484d4",
  "id": "da34f6f278984ae385c91cac6b91eff7",
  "time": "2016-06-14T02:05:43.959Z",
  "timezoneOffset": -420,
  "uploadId": "SampleUploadId",
  "annotations": [{
    "code": "bg/out-of-range",
    "value": "high",
    "threshold": 414,
  }]
}
```

If the device (or the manufacturer) does not provide the exact threshold levels, then the `threshold`
field should not be provided at all, and an additional `[datatype]/unknown-value` annotation should be
provided.
This is the case in our current Abbott Precision Xtra driver for ketone readings:
```json
{
  "type": "bloodKetone",
  "units": "mmol/L",
  "value": 10.0,
  "clockDriftOffset": 0,
  "conversionOffset": 0,
  "deviceId": "DevId0987654321",
  "deviceTime": "2016-06-13T19:05:43",
  "guid": "ae40651d-b8e7-428e-840f-bbb3e1132569",
  "id": "55346384504b4b76b24c60a236448012",
  "time": "2016-06-14T02:05:43.500Z",
  "timezoneOffset": -420,
  "uploadId": "SampleUploadId",
  "annotations": [{
      "code": "ketone/out-of-range",
      "value": "high"
    },
    {
      "code": "ketone/unknown-value"
    }
  ]
}
```

In this instance, because the threshold was not known, we used a `value` that we knew was out of the meter's range.
