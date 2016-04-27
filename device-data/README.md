This section documents the diabetes device data types that the Tidepool data ingestion API ([jellyfish](https://github.com/tidepool-org/jellyfish 'Tidepool on GitHub: jellyfish')) reads and stores. All events read and stored by the Tidepool platform use the [JSON](http://www.json.org/ 'JSON.org') data interchange format. All events have a `type` field identifying the subcategory of event. The semantics of the other fields in each subcategory are generally defined individually per subcategory, but there are some common fields.

The page describing these [common fields](./common.md) that apply to all (or at least most) data types is a good place to start.

For a detailed explanation of how units for various values (but especially blood glucose) are treated upon ingestion and in storage, see the [units](./units.md) page.

Otherwise, jump to [diabetes data types](./types/README.md).
