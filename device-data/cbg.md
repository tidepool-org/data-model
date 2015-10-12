## Continuous Blood Glucose (cbg)

### type

[TODO]

### value

[TODO]

### _active

See [common fields](./common.md).

### _groupId

See [common fields](./common.md).

### _schemaVersion

See [common fields](./common.md).

### _version

See [common fields](./common.md).

### clockDriftOffset

See [common fields](./common.md).

### conversionOffset

See [common fields](./common.md).

### deviceId

See [common fields](./common.md).

### deviceTime

See [common fields](./common.md).

### guid

See [common fields](./common.md).

### id

See [common fields](./common.md).

### time

See [common fields](./common.md).

### timezoneOffset

See [common fields](./common.md).

### units

See [common fields](./common.md).

### uploadId

See [common fields](./common.md).

### example (client)

```json
{
	"type": "cbg",
	"value": 7.1,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2015-10-11T23:47:47",
	"guid": "b6756728-2e06-40f3-85ab-a3e2c9129e58",
	"id": "0e250fa5571d44cc960de95b130346ab",
	"time": "2015-10-12T06:47:47.872Z",
	"timezoneOffset": -420,
	"units": "mmol/L",
	"uploadId": "SampleUploadId"
}
```

### example (ingestion)

```json
{
	"type": "cbg",
	"value": 13.5,
	"_groupId": "abcdef",
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2015-10-11T23:47:47",
	"guid": "75fa2669-b88b-4791-805b-18ee91f09007",
	"time": "2015-10-12T06:47:47.873Z",
	"timezoneOffset": -420,
	"units": "mmol/L",
	"uploadId": "SampleUploadId"
}
```

### example (storage)

```json
{
	"type": "cbg",
	"value": 27.7,
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2015-10-11T23:47:47",
	"guid": "d96cbe34-76c9-4af1-8c3e-7e2951f3f3ed",
	"id": "a57fa499eeb34cf59ff4d292b62a0424",
	"time": "2015-10-12T06:47:47.874Z",
	"timezoneOffset": -420,
	"units": "mmol/L",
	"uploadId": "SampleUploadId"
}
```
