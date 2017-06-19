import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import * as firebase from 'firebase/app';

interface User {
  uid: string;
}

@Injectable()
export class AuthService {

  static NO_USER = { uid: 'non' };
  static UNKNOWN_USER = { uid: 'unknown' };

  userSubject$: BehaviorSubject<User> = new BehaviorSubject(AuthService.NO_USER);
  user$ = this.userSubject$.asObservable()
    .map(user => {
      if (!user.uid || user.uid === AuthService.NO_USER.uid) {
        return null;
      }
      return user;
    });

  authenticated$ = this.user$
    .filter(user => !!user) // get rid of non (pending)
    .map(user => user.uid !== AuthService.UNKNOWN_USER.uid); // boolean on if we are real user, or still unknown

  accessToken: string;
  recaptchaVerifier: firebase.auth.RecaptchaVerifier;

  constructor() { }

  checkAuthState() {
    firebase.auth()
      .onAuthStateChanged((user) => {
        if (user) {
          // console.log('onAuthStateChanged: User signed in ::: ', user);
          this.userSubject$.next(user);
        } else {
          //  console.log('onAuthStateChanged: No user signed in');
          this.userSubject$.next(AuthService.UNKNOWN_USER);
        }
      });
  }


  private generateRecaptcha({ buttonId = null, recaptchaId = null }: { buttonId?: string, recaptchaId?: string } = {}) {
    if (recaptchaId) {
      return new firebase.auth.RecaptchaVerifier(recaptchaId);
    }
    return new firebase.auth.RecaptchaVerifier(buttonId, {
      'size': 'invisible'
    });
  }

  public login(phoneNumber: string, options: { buttonId?: string, recaptchaId?: string } = {}): firebase.Promise<firebase.auth.ConfirmationResult> {
    this.recaptchaVerifier = this.generateRecaptcha(options);

    return firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, this.recaptchaVerifier);

  }

  public sendCode(confirmationResult: firebase.auth.ConfirmationResult, code: string): firebase.Promise<any> { // user
    return confirmationResult.confirm(code);
  }

  public logout() {
    firebase.auth()
      .signOut()
      .then(() => this.userSubject$.next(AuthService.UNKNOWN_USER));
  }

}
