<!-- non-generated document! all areas editable -->

## Units

In general, the Tidepool platform does not mutate data. Rather, data is read from diabetes devices (or other sources of diabetes device data) and stored in a form as close as possible to the original form while still achieving the translation into the standardized Tidepool data model(s).

An exception is made, however, for blood glucose data. Tidepool has chosen to store blood glucose data in `mmol/L` units *only*. Tidepool chose `mmol/L` because it is the standard for international research and because, as a floating point number, it can be converted accurately to `mg/dL`, which is typically an integer. The reverse would not be true.

Event types that include a blood glucose value or blood glucose-related value (such as an insulin sensitivity factor (ISF) expressed in units of blood glucose per unit of insulin) must also have a `units` field specified - either `mg/dL` or `mmol/L`. When that field is `mg/dL`, upon ingestion of the event through [the Tidepool data ingestion API](https://github.com/tidepool-org/jellyfish) the value is converted to `mmol/L`, the `units` field updated accordingly, and then the event is stored.

> While it may seem that information is being *lost* through Tidepool's not storing the original (input) units of any blood glucose(-related) value, this is in fact not the case. Many diabetes devices store blood glucose(-related) values in `mg/dL` even when they are set to *display* these values in `mmol/L`. In other words, the original units of a blood glucose(-related) value are arbitary, not reliable as an indicator of the units a user would prefer to see his or her blood glucose(-related) values displayed in, and thus provide little to no value for data-auditing purposes.

The algorithm followed for conversion of blood glucose(-related) values from `mg/dL` to `mmol/L` is:

1. If `units` field is `mg/dL`...
1. Divide the value by `18.01559` ([the molar mass of glucose is 180.1559](http://www.convertunits.com/molarmass/Glucose 'Reference: molar mass of glucose'))
1. Store the resulting floating-point precision value without any rounding or truncation