# Phone Number Authorisation

A sample app showing phone authentication with [Firebase](https://firebase.google.com/docs/auth/web/phone-auth).

[Live](https://mikeybyker.github.io/phonenumber-auth/)

## Setup

Add your firebase config to firebase.config.sample.ts and rename firebase.config.ts

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Note
Although it may seem logical to assume this would be a good way to go about authentication in an ionic/phonegap/cordova application - it isn't!

You could waste many an hour building the app, with all working nicely on your local development version. However, as soon as you put the app on your phone...Nope.

The problem is, recaptcha is built into the autentication of phone numbers. Recaptcha does not work in this situation, due to the file:/// protocol.

If it seems a bit weird that you can't authenticate an app on your phone with your phone number...that's because it is.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.1.1.
