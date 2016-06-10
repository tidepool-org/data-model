# data model tools

This repository includes two command-line tools: a document template generator and a sample datum generator. The first tool is only relevant and useful internal to Tidepool: it is only for those of us adding or editing new data model docs. The sample datum generator, on the other hand, may also be useful for third parties who are learning about Tidepool's data model(s). The sample generator can generate single example datums for any type in Tidepool's documented data model(s) in both the format necessary for `ingestion` of data (useful for third parties wishing to build apps that upload data directly into the Tidepool cloud) and in the format that `client` applications will see after requesting data from the Tidepool cloud. (In addition, it is possible to generate a sample datum in `storage` format, but that is again mostly only of interest to Tidepool's own engineering team(s).)

For more information about each of these tools, see the following pages:
- [the doc template generator](./docTemplateGenerator.md)
- [the sample datum generator](./sampleDatumGenerator.md)