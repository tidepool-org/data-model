<!-- auto-generated doc! most areas *not* editable -->

## Device event subType: `prime`


> Jump to...(notable fields on this type)

>  - [type](#type)
>  - [subType](#subtype)
>  - [primeTarget](#primetarget)
>  - [volume](#volume)

**NB:** All fields are *required* unless otherwise noted.


> Jump to example JSON:

>  - [client example](#example-client)
>  - [ingestion example](#example-ingestion)
>  - [storage example](#example-storage)


### type

[ingestion, storage, client] The string `deviceEvent`.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes

<!-- start editable commentary on type -->
<!-- Added by Eden: TODO -->
<!-- end editable commentary on type -->

* * * * *

### subType

[ingestion, storage, client] The string `prime`.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes

<!-- start editable commentary on subType -->

The `prime` sub-type of `deviceEvent` represents a user's priming of either an insulin infusion line/tubing, used with a traditional insulin pump, or the priming of an insulin delivery cannula, used in all insulin delivery devices (i.e., both traditional insulin pumps and tubeless patch pumps like the Insulet OmniPod insulin delivery system). To "prime" an infusion line or cannula is to fill it with insulin <!-- Edit by Eden -->in order to ready the device to deliver programmed doses of insulin, either while disconnected from the user or in preparation for insertion.

<!-- end editable commentary on subType -->

* * * * *

### primeTarget

[ingestion, storage, client] String encoding the target of the priming action.

	QUICK SUMMARY
	Required:
		jellyfish: yes
		platform: yes
	Range: Must be one of:
		`cannula`
		`tubing`

<!-- start editable commentary on primeTarget -->

The `primeTarget` field identifies the object of the priming action - either `tubing` for an infusion line prime or `cannula` for a cannula prime.

Most commonly, `tubing` and `cannula` prime events will occur as a pair separated only be seconds or minutes. Note, however, that many combinations of `prime` events may occur in a real user's data "in the wild." For example, no priming events will appear in the data of an Insulet OmniPod user, as the device's automatic cannula prime prior to pod activation is not logged. And among traditional insulin pump users, priming behavior varies considerably. Those who use steel cannulas must prime the cannula along with the tubing, as the steel cannula is not separable from the infusion line, and so only `tubing` primes will appear in the data. Other insulin pump users may change the infusion site without changing out the insulin reservoir and infusion line at the same time, in which case a `cannula` prime may appear independently of a `tubing` prime.

<!-- end editable commentary on primeTarget -->

* * * * *

### volume

> This field is **optional**.

[ingestion, storage, client] A floating point value representing units of insulin.

	QUICK SUMMARY
	Required:
		jellyfish: no (optional)
		platform: no (optional)
	Range:
		cannula:
			min: 0.0
			max: 3.0
		tubing:
			min: 0.0
			max: 100.0



<!-- start editable commentary on volume -->

Where available in the data, the `volume` of a priming event should be included as a <!--Edit by Eden -->value of insulin expended in the course of the priming action.

<!-- end editable commentary on volume -->

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
	"type": "deviceEvent",
	"subType": "prime",
	"primeTarget": "tubing",
	"volume": 12.7,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-06-13T19:05:44",
	"guid": "dfd8e822-d260-4501-962f-8d8bc229e344",
	"id": "17ca727ea43c4e38be63b618a93fe50c",
	"time": "2016-06-14T02:05:44.869Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (ingestion)

```json
{
	"type": "deviceEvent",
	"subType": "prime",
	"primeTarget": "tubing",
	"volume": 13.7,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-06-13T19:05:44",
	"time": "2016-06-14T02:05:44.871Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```

### example (storage)

```json
{
	"type": "deviceEvent",
	"subType": "prime",
	"primeTarget": "tubing",
	"volume": 11.6,
	"_active": true,
	"_groupId": "abcdef",
	"_schemaVersion": 0,
	"_version": 0,
	"clockDriftOffset": 0,
	"conversionOffset": 0,
	"createdTime": "2016-06-14T02:05:49.871Z",
	"deviceId": "DevId0987654321",
	"deviceTime": "2016-06-13T19:05:44",
	"guid": "f1c7dec0-3394-461b-95d7-4def7fb9a556",
	"id": "70ab05d2bb1f4e00860188816b7d61c4",
	"time": "2016-06-14T02:05:44.871Z",
	"timezoneOffset": -420,
	"uploadId": "SampleUploadId"
}
```
