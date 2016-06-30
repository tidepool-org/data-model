# data-model

Documentation for Tidepool's data models.

Jump to...

 - [diabetes device data](./device-data/README.md 'Diabetes device data')

## meta-documentation (documentation for this documentation toolset)

> (This and all Markdown documents in [this repository](https://github.com/tidepool-org/data-model 'Tidepool on GitHub: data-model') are used to generate [the Tidepool data model documentation website](http://developer.tidepool.io/data-model/ 'Tidepool data model documentation') via [GitBook](https://github.com/GitbookIO/gitbook 'GitHub: GitBook').

The developer microsite has [more information on Tidepool's use of GitBook for documentation and recommended workflows](http://developer.tidepool.io/docs/ 'Tidepool Developer Portal: Docs').

After downloading or cloning this repository, if you want to serve yourself the documentation locally, first install the required dependencies with `npm install` (assuming you have [Node.js](https://nodejs.org/en/ 'Node.js')) and [the node package manager (`npm`)](https://www.npmjs.com/ 'npm homepage') installed already). After installing the required dependencies, you may use either `npm start` or `npm run serve-docs` to serve the docs at [http://localhost:4000](http://localhost:4000).

### editing documents

Only certain sections of most of the Markdown files in this repository should be edited *directly*. Most of the content for the data model documentation here is generated through the JavaScript code found in the `src/` directory.

Specifically, each .md document or directory of .md documents under `device-data/` is generated automatically unless marked with `<!-- non-generated document! all areas editable -->` at the top. Auto-generated docs are also marked themselves with the comment `<!-- auto-generated doc! most areas *not* editable -->` at the top.

In the automatically-generated docs, the following three areas should **not** be edited, as any changes will be steamrolled the next time that the doc is regenerated using the [document template generator](./bin/docTemplateGenerator.md).

1) The title, note about required fields, and links to jump to example JSON. For example:

```
## Coffee (coffee)

**NB:** All fields are *required* unless otherwise noted.


> Jump to example JSON:

>  - [client example](#example-client)
>  - [ingestion example](#example-ingestion)
>  - [storage example](#example-storage)
```

2) The sub-header for each field through to the starting comment for "color commentary," including the "quick summary". For example:

```
### type

[ingestion, storage, client] The string `coffee`.

  QUICK SUMMARY
  Required:
    jellyfish: yes
    platform: yes

<!-- start editable commentary on type -->
```

3) The JSON examples at the bottom of the document, starting with the first header for these—`### example (client)`.

*The **only** area that can (and should!) be edited by hand is the "color commentary" space between the `<!-- start editable commentary on $FIELD -->` and `<!-- end editable commentary on $FIELD -->` comments within the section for each field. On initial generation of the documentation template, this space will contain a `<!-- TODO -->` comment that **must** be deleted in order for other changes in this space to be preserved. (The lack of the `<!-- TODO -->` comment is what signals the script to look for and preserve the content between the `<!-- start editable commentary on $FIELD -->` and `<!-- end editable commentary on $FIELD -->` comments.)*

For data types with sub-types, the README in the directory for the type is also an automatically generated document. Only the space between the header and the `<!-- end intro -->` comment should be edited by hand. See [the introduction to the `bolus` type](https://raw.githubusercontent.com/tidepool-org/data-model/master/device-data/types/bolus/README.md) for an example.

### (re)generating documents

There is a bash script in this repository to generate new and regenerate old or regenerate (after updates to the source) all of the data model documents.

The script is intended to be run from the root of this repository, and it requires no arguments, simply:

```bash
$ ./regenerate-all-docs.sh
```

When you regenerate docs that have been generated before, there will *always* be changes in the resulting Markdown document because the JSON examples in various formats for each data type are regenerated on every run. This is *intentional*: the doc generation script cannot tell if anything has changed in the source code that generates the examples, and we want to ensure that the examples get updated if something has! (If a field or value has been renamed, to give a simple example.) It is recommended to use a workflow like `git add -p` (to review "chunks" of the `git diff` and stage them for commitment interactively) after regenerating all of the docs in order to discard unneeded updates (like updates to the JSON examples if you're *absolutely* certain they are unnecessary) while keeping those that are needed. After committing, use `git checkout -- path/to/docs/` to clear the changes you felt were superfluous.
