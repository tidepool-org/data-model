## User Profile (profile)

**NB:** All fields are *required* unless otherwise noted.

### fullName

String value: first name, last name, and any other name parts the user chose to include when signing up.

<!-- TODO -->
<!-- end fullName -->

### patient

> This field is **optional**.

Object value: optional additional information stored as part of the data storage set up process for PWDs with data to store in the Tidepool platform.

A `patient` object will only appear in the `profile`s of users who are PWDs. It includes three fields, described below: `about`, `birthday`, and `diagnosisDate`.

> PWD: Person with Diabetes or, within Tidepool, also Person with (Diabetes Device) Data

<!-- end patient -->

#### about

String value: free-form "about me" text optionally entered by the PWD on sign-up.

<!-- TODO -->
<!-- end about -->

#### birthday

String value: the PWD's birthday in YYYY-MM-DD format.

<!-- TODO -->
<!-- end birthday -->

#### diagnosisDate

String value: the date the PWD was diagnosed with diabetes in YYYY-MM-DD format.

<!-- TODO -->
<!-- end diagnosisDate -->

### example (non-PWD)

```json
{
	"fullName": "Michael Cameron Nguyen"
}
```

### example (PWD)

```json
{
	"fullName": "Herbert Santos",
	"patient": {
		"about": "Bapagga pidipawa wujfil gece vomloew ezdilwom doput cotih suved fophejov tiwug hibibmo bohook domcircu medojpo.",
		"birthday": "1985-02-05",
		"diagnosisDate": "1995-02-07"
	}
}
```
