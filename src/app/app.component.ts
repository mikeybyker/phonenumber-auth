import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as firebase from 'firebase/app';

import { AuthService } from './services/authService';
import { TruncatePipe } from './services/truncate';
import { config } from './firebase.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public auth: AuthService) { }

  ngOnInit() {
    firebase.initializeApp(config);
    this.auth.checkAuthState();
  }

}
