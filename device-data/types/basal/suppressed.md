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

### `suppressed` across schedule boundaries

When a `temp` or `suspend` basal crosses a basal schedule boundary, the basal rate that would have been in effect had the `temp` or `suspend` not been programmed *changes* in accordance with the schedule change, necessitating a splitting of the `temp` or `suspend` into multiple segments, each of type `basal`, with the sum of all segments' `duration`s adding up to the total duration of the temp or suspend reported by the insulin pump.

### `suppressed` when a `temp` or `suspend` is edited

### nested `suppressed` in a partially automated insulin-delivery system

[^a]: Or inferable from other data, such as the history of the pump's settings.