import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder
} from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import * as firebase from 'firebase/app';
import 'firebase/database';

import { AuthService, TruncatePipe } from 'app/services';

interface Saved {
  message: string;
}

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  savedSubject$: BehaviorSubject<Saved> = new BehaviorSubject({ message: '' });
  saved$ = this.savedSubject$.asObservable();

  userReference: firebase.database.Reference;
  formSub$: Subscription; // @todo auto-unsub (takeUntil?)
  authSub$: Subscription;

  userForm = new FormGroup({
    message: new FormControl()
  });

  constructor(public auth: AuthService, public truncate: TruncatePipe) { }

  ngOnInit() {
    console.log('init');
    this.formSub$ = this.userForm
      .get('message')
      .valueChanges
      .debounceTime(1000)
      .distinctUntilChanged()
      .map(value => this.truncate.transform(value, ['100']))
      .subscribe(value => this.saveMessage(value));


    this.authSub$ = this.auth
      .user$
      .filter(user => !!user)
      .subscribe(user => {
        this.userReference = this.getUserRef(user.uid);
        this.watchMessage();
      });
  }

  getUserRef(uid) {
    return firebase
      .database()
      .ref(`users-fb-phone/${uid}`);
  }

  watchMessage() {
    this.userReference && this.userReference.on('value', snapshot => this.savedSubject$.next(snapshot.val()));
  }
  unWatchMessage() {
    this.userReference && this.userReference.off('value')
  }

  async saveMessage(message: string) {
    try {
      await this.userReference.update({ message });
    } catch (error) {
      // Do something...
      console.log('Error saving message: ', error);
    }
  }

  async loadData(user) {
    try {
      const snapshot = await this.userReference
        .once('value');
      this.savedSubject$.next(snapshot.val());
    } catch (error) {
      // Do something...
      console.error('Ah snap: ', error);
    }
  }

  ngOnDestroy() {
    console.log('destroy messages');
    this.formSub$ && this.formSub$.unsubscribe();
    this.authSub$ && this.authSub$.unsubscribe();
    this.unWatchMessage();
  }

}
