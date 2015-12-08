## User Memberships (memberships)

Any user of the Tidepool platform, whether PWD or non-PWD, may receive an invitation granting the user permissions to view, make notes, and/or upload to a PWD user's data storage account. The group of people with whom a given PWD user's data is shared in this way is known as a *careteam*. Every PWD user has a careteam (minimally including only himself or herself). Conversely, every user - whether PWD or not - may have membership in zero or more users' careteams. This page documents the derived data model used for the logged-in user's memberships in Tidepool's client applications.

There are two types of membership lists: one containing the logged-in user's memberships where he or she has upload permissions, and one containing the logged-in user's memberships where he or she has any permissions at all, from view-only through upload. Both lists have the same derived data model as they are currently used in Tidepool's client apps: an array of objects, each containing the `userid` from a [user](../types/user.md) object and that user's [profile](../types/profile.md).

The logged-in user himself or herself will always appear in this array (typcially sorted to the first position before being returned from a client application's API wrapper) *if* (1) the logged-in user is a PWD and (2) the memberships list is a list of memberships where the logged-in user has *any* permissions. In other words: every PWD user is a member of his or her own care team. If the memberships list is limited to memberships with upload permissions only and the logged-in user is not a PWD, then this list may be empty, or it may be non-empty but then not include the logged-in user.

> PWD: Person with Diabetes or, within Tidepool, also Person with (Diabetes Device) Data

### example (non-PWD logged-in user)

```json
[
  {
    "userid": "e8e3b228",
    "profile": {
      "fullName": "Hannah Coleman"
    }
  },
  {
    "userid": "ad614bdc",
    "profile": {
      "fullName": "Louis Edward Gray",
      "patient": {
        "about": "Candamfa adba okcefte numew loc bazag dezace zuz ihjogmu colju tudlifda so zied vorabul cuidu.",
        "birthday": "1959-03-31",
        "diagnosisDate": "1974-04-04"
      }
    }
  },
  {
    "userid": "e185df24",
    "profile": {
      "fullName": "Estelle Belle Huff",
      "patient": {
        "about": "Bosojo ginjig nugaf mozir detisce uwuducce kikpezpa iloze dih nizje oliitwo vel ibwonih bobbodu.",
        "birthday": "1996-02-08",
        "diagnosisDate": "2003-02-19"
      }
    }
  },
  {
    "userid": "f105a6bb",
    "profile": {
      "fullName": "Maude Santos",
      "patient": {
        "about": "Safi hem uhais ekwib gajhicmu lefcu pu ditow aketu ot efo ow ubo votuhopi wuc hik.",
        "birthday": "1988-12-13",
        "diagnosisDate": "1996-12-28"
      }
    }
  },
  {
    "userid": "6c03906a",
    "profile": {
      "fullName": "Lucinda Berry",
      "patient": {
        "about": "Veris tizejpiv ovi vikcawu dogacgo pur coz tutwoje hupciruf ulo puvel go ti pav ac vigiri uztieke.",
        "birthday": "1972-05-22",
        "diagnosisDate": "1980-05-24"
      }
    }
  }
]
```

### example (PWD logged-in user)

```json
[
  {
    "userid": "4931936c",
    "profile": {
      "fullName": "Hallie Lucile Lyons",
      "patient": {
        "about": "Ufiwovec sieszo is jahu le gasoti la ju geinicuv te susihpi tag jat kuzoklaz gobzewatu jovdiam urvalrub kek.",
        "birthday": "1989-07-10",
        "diagnosisDate": "1994-07-13"
      }
    }
  },
  {
    "userid": "4eb1675b",
    "profile": {
      "fullName": "Katharine Dorothy Harmon",
      "patient": {
        "about": "Jupugfa pen nun obtinas er sifuz efeag fuzku nosjah wafki fondo gob behoze johfac huszebi.",
        "birthday": "1956-06-21",
        "diagnosisDate": "1965-06-23"
      }
    }
  },
  {
    "userid": "153e02cc",
    "profile": {
      "fullName": "Rhoda Burns",
      "patient": {
        "about": "Refjahzeh wecjo ubomilfan kubuwe opa holpavab od te dah mu veh tahira sarez juwtos vivimtoz sawilar itupevedo jawa.",
        "birthday": "1971-01-12",
        "diagnosisDate": "1986-01-20"
      }
    }
  },
  {
    "userid": "64f3e7d4",
    "profile": {
      "fullName": "Sara Eunice Love",
      "patient": {
        "about": "Vezlupbe le uhmisat kim zu jat soloc imopa nuwuh sohro ara lir vel dorunsiv jaidopac ji hob.",
        "birthday": "1986-03-08",
        "diagnosisDate": "2000-03-15"
      }
    }
  }
]
```
