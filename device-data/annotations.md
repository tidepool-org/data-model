<!-- non-generated document! all areas editable -->

## Annotations

Tidepool strives for complete accuracy in the data uploaded to the Tidepool platform. However, in some cases the data coming in from diabetes devices falls *just* shy of the requirements of the data model, and in some of these cases it is possible to implement logic that gives us *high* but not 100% confidence in the result. In such cases, we have chosen[^a] to implement this logic but also to *annotate* the resulting datum (or data) to expose the small amount of uncertainty remaining.

### Syntax & conventions of annotations

In the Tidepool data model, `annotations` is an optional property that may appear on any `type` in the data model with the exception of `upload` (which is more of a metadata container). `annotations` itself is an array of objects, where each object represent an individual annotation.

An annotation object *must* have a `code` property, and the typical construction of this `code` property is `[manufacturer]/(datatype)/(description)`. The manufacturer prefix is optional—that is, only present if the reason for annotation is manufacturer-specific. The data type (e.g., `basal`, `bolus`, and potentially `bg` encompassing both `cbg` and `smbg`) provides another level of annotation namespacing. Finally, a descriptive and hyphen-delimited string should come last in the annotation `code`.

#### Examples

Manufacturer/device-specific:

- `animas/bolus/extended-equal-split`
- `insulet/basal/fabricated-from-schedule`

Non-specific:

- `bg/out-of-range`

Aside from the `code`, the annotation object may also contain other properties as appropriate. For an example of this, see the documentation on [out of range values](out-of-range.md), which gives full examples of the `bg/out-of-range` annotation.

Since we want to ensure that there are no duplicate annotations on a single datum, there are utility functions provided in the uploader repository's `lib/eventAnnotations.js`: `annotateEvent` (which checks for duplicates before adding an annotation) and `isAnnotated` (for just checking for the existence of a particular annotation).

Finally, while the vast majority of annotations are added at the time of ingesting data into the Tidepool platform, a few annotations are added during the data preprocessing in the client prior to data display. These annotations relate to event *interplay* across device uploads and thus are not identifiable at present during the device data ingestion process. An example of an annotation of the type is `basal/intersects-incomplete-suspend` which we surface in blip with a hover message of, 'Within this basal segment, we are omitting a suspend event that didn't end. This may have resulted from changing the date & time settings on the device or switching to a new device. As a result, this basal segment may be inaccurate.'

At present, the best resource for viewing all current annotations in the Tidepool data model is [this spreadsheet](https://docs.google.com/spreadsheets/d/1CpPiASDONvyB9aV97E3bioVlJ14E5ZGDIy-PgukdxeI/edit#gid=0 'Tidepool Communication for Errors etc'), though note that this also contains other Tidepool error messages as well.

[^a]: For many reasons, but chief among them to provide the same user experience to users using a variety of diabetes devices in their treatment.
