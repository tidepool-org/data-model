## Platform User (user)

**NB:** All fields are *required* unless otherwise noted.

### userid

String value: a hash key to uniquely identify the user.

<!-- TODO -->
<!-- end userid -->

### username

String value: e-mail address used for logging in.

<!-- TODO -->
<!-- end username -->

### termsAccepted

> This field is **optional**.

String value: an ISO 8601-formatted timestamp (with timezone offset) indicating when the user accepted the terms of use and privacy policy.

This field will only appear after the user has accepted the terms of use and privacy policy, which currently occurs *after* the e-mail confirmation step in the sign-up process.

<!-- end termsAccepted -->

### emails

An array containing the e-mail address serving as the user's `username`.

<!-- TODO -->
<!-- end emails -->

### example (non-PWD)

```json
{
	"userid": "fac9ddcf",
	"username": "zut@foobar.com",
	"termsAccepted": "2015-12-05T01:00:09-08:00",
	"emails": [
		"zut@foobar.com"
	]
}
```

### example (PWD)

```json
{
	"userid": "2158ce03",
	"username": "izi@foobar.com",
	"termsAccepted": "2015-12-05T01:00:09-08:00",
	"emails": [
		"izi@foobar.com"
	]
}
```
