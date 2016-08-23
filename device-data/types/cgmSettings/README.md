## Continuous Glucose Monitor Settings (`cgmSettings`)

This is the Tidepool data type to represent the settings on a continuous glucose monitor (CGM). A CGM consists of a sensor inserted into subcutaneous tissue and attached to a transmitter clipped into the sensor's cradle attached to the surface of the PWDs skin with adhesive tape. Every five minutes, the transmitter sends a blood glucose reading to a receiving device, which can be an insulin pump with receiving capabilities (such as a CGM-enabled Medtronic Minimed pump, a Tandem G4 model pump, or an Animas Vibe model pump), a dedicated hardware receiver (required with the Dexcom G4 system and optional with the G5 system), or an iPhone with a companion app capable of receiving sensor transmissions via Bluetooth, as introduced with the Dexcom G5 system. Aside from providing a constant stream of fresh blood glucose data, a CGM system can also be configured to alert the user and/or PWD about glucose values that fall outside configured parameters.

Retrospective data collection from CGM systems happens via one of these receiving devices. Note that at present the Tidepool platform does not have a ready mechanism to deduplicate the same data ingested through more than one receiving device, if more than one is being used. For example, duplicate data will result for a user using a Dexcom CGM with a Tandem G4 system if the user is using *both* the Tandem pump as a receiver *and* a dedicated hardware receiver and if the user uploads both the pump and the receiver through the Tidepool uploader.

There are currently only two manufacturers of CGMs available to consumers in the U.S.: Dexcom and Medtronic. The features offered by these systems are fairly similar but differ more than the features offered by different insulin pumps. For example, only the Medtronic system (currently) offers predictive alerts about blood glucose events. For this reason, we document the data model for each manufacturer on separate pages:
<!-- end intro -->

- [dexcom](./dexcom.md)
- medtronic (Coming soon!)
