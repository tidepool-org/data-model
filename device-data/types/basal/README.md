## Basal Insulin (`basal`)

This is the Tidepool data type for background insulin dosing—the "constant drip" of background insulin programmable in all insulin pumps and providing a replacement for a daily injection of long-acting insulin such as Lantus or Levemir. Different insulin pump manufacturers use different terminology for this insulin dosing, although all provide a similar interface for programming the set(s) of rates (in units of insulin per hour) to be delivered at different times of each day. We have standardized on calling one set of such rates covering a twenty-four hour period a basal "schedule."

The data model for the basal schedule(s) is part of the Tidepool [`pumpSettings`](../pumpSettings.md) type. In contrast, the `basal` data type described in the following four documents represents each actual interval of basal insulin delivery, whether that matches the active programmed basal schedule or not. In brief summary—and ignoring for the moment some differences that are explained in detail in the linked four documents for the `scheduled`, `automated`, `temp`, and `suspend` delivery sub-types—each `basal` event contains a `time` field representing the start of the delivery of the `rate` (in units of insulin per hour). The `duration` encodes the length of time (in milliseconds) that this `rate` was delivered in actuality (and it may or may not match the duration encoded in the basal schedule, depending on other pump events like global suspensions of insulin delivery or temporary basal rates). In order to calculate the total insulin delivery resulting from a particular `basal` event, all that is needed is conversion of the `duration` from milliseconds to hours and multiplication of the result by the `rate`.

Each of the four `deliveryType`s that fall under the larger `basal` type are documented in the following pages:
<!-- end intro -->

- [scheduled](./scheduled.md)
- [automated](./automated.md)
- [temp](./temp.md)
- [suspend](./suspend.md)
