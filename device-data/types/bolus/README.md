## Bolus Insulin

This is the Tidepool data type for one-time doses of fast-acting insulin programmed on an insulin pump to "cover" meals or correct high blood glucose (hyperglycemia). A bolus event can be interrupted or canceled; since it is very important for behavioral auditing as well as statistical analysis of a PWD's data to know exactly how much insulin was delivered, the Tidepool data model includes fields to represent programmed vs. delivered bolus amounts and durations.

All insulin pumps provide several strategies for delivering boluses of insulin, and each manufacturer uses different terminology for each strategy, although the strategies are equivalent across insulin pumps. The different strategies are handled by our three different `subType`s of boluses—`normal`, `square`, and `dual/square`. These are documented on the following pages:
<!-- end intro -->

- [normal](./normal.md)
- [square](./square.md)
- [dual/square](./dual-square.md)
