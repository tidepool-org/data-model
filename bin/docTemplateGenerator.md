# the doc template generator

This command-line tool generates or regenerates Markdown files for types or sub-types in the Tidepool data model(s). At present, it is designed to be run from within the `bin/` directory, although it is on @jebeck's list of things to do to make it more flexible. As with any (good...) command-line tool, you can pass it the argument `--help` to get information about the arguments it takes and their syntax. The tool itself is a node script, but it is executable, so it can be run just like any bash script:

```bash
$ ./docTemplateGenerator.js --help
```

The present usage (although always use `--help` in case this meta-doc hasn't been updated!) is:
```
  Usage: docTemplateGenerator [options] <type>

  Options:

    -h, --help                    output usage information
    -p, --path <value>            path to docs directory
    --subtype, --subType <value>  subType for this datum
```

The bash script `regenerate-all-docs.sh` employs the doc template generator to regenerate all the Markdown files for all data types. Tidepool developers are encouraged to use this script and discard any unnecessary changes to ensure that *everything* that should be updated gets updated. See the section on [regenerating documents](../README.md#regenerating-documents) in the introduction for more details.

## examples

To regenerate the Markdown file for the `wizard` data type:

```bash
$ ./docTemplateGenerator.js wizard
```

To regenerate just the Markdown file documenting a `basal` with a `deliveryType` of `temp`:

```bash
$ ./docTemplateGenerator.js --subtype temp basal
```