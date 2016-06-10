# the sample datum generator

This command-line tool generates sample JSON datums in all the types of the Tidepool data model(s) in a variety of formats, at the user's choice. As with any (good...) command-line tool, you can pass it the argument `--help` to get information about the arguments it takes and their syntax. The tool itself is a node script, but it is executable, so it can be run just like any bash script:

```bash
$ ./sampleDatumGenerator.js --help
```

The present usage (although always use `--help` in case this meta-doc hasn't been updated!) is:
```
  Usage: sampleDatumGenerator [options] <type>

  Options:

    -h, --help                    output usage information
    -c, --clipboard               copy resulting sample JSON to clipboard
    -d, --datetime <value>        ISO-formatted datetime for datum
    -f, --format <value>          data format of client, ingestion, storage
    --subtype, --subType <value>  subType for this datum
```

Or, less concisely...

The only required argument is the `type` of the Tidepool data type, from those listed on the [index page for diabetes data types](../device-data/types/README.md).

Along with this mandatory argument, any of the following optional arguments or flags may appear in any order:

- `-c` or `--clipboard` without an argument to copy the requested sample JSON to the system clipboard
- `-d` or `--datetime` plus an [ISO-formatted](https://en.wikipedia.org/wiki/ISO_8601 'Wikipedia: ISO 8601') datetime to produce the sample datum at the given datetime
- `-f` or `--format` plus one of `client`, `ingestion`, or `storage` to specify a format other than the default `client` format
- `--subtype` or `--subType` plus an appropriate `subType`, `deliveryType` or manufacturer (from `animas`, `insulet`, `medtronic`, or `tandem`), depending on the data type of the sample datum under request

## examples

To generate a sample `smbg` datum (defaults to `client` format):

```bash
$ ./sampleDatumGenerator.js smbg
```

To generate a sample `smbg` datum at noon, April Fool's Day, 2016, UTC time:

```
$ ./sampleDatumGenerator.js smbg -d 2016-04-01T12:00:00+00:00
```

To do the same *and* copy the result to your operating system's clipboard:

```
$ ./sampleDatumGenerator.js smbg -d 2016-04-01T12:00:00+00:00 -c
```

To generate an extended ("square") `bolus`:

```
./sampleDatumGenerator.js bolus --subType square
```

To generate `pumpSettings` in the `tandem` format:

```
./sampleDatumGenerator.js --subtype tandem pumpSettings
```
