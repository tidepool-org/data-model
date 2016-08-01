## Device Events (`deviceEvent`)

This is the Tidepool data type for a variety of events that can occur on diabetes devices, including both insulin pumps and continuous glucose monitors. As a type it is essentially a "grab bag" of miscellaneous sub-types, where each sub-type has its own data model that often differs widely from sub-type to sub-type.

Note that prior to Tidepool's release of ["bootstrapping to UTC" (BtUTC)](http://developer.tidepool.io/chrome-uploader/docs/BootstrappingToUTC.html 'Bootstrapping to UTC'), this data type had `deviceMeta` as the value of its `type` field. With the release of BtUTC, we changed this value to `deviceEvent` to more accurately reflect the fact that this group of sub-types models various miscellaneous events that are either user-initiated or surfaced to the user, and not device metadata that may be more-or-less user-invisible (or at least irrelevant to the user most of the time) - such as device model and serial numbers, etc.

Each of the `subType`s is documented on one of the following pages:
<!-- end intro -->

- [alarm](./alarm.md)
- [calibration](./calibration.md)
- [prime](./prime.md)
- [reservoirChange](./reservoirChange.md)
- [status](./status.md)
- [timeChange](./timeChange.md)
