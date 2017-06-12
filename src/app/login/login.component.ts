import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';

import * as firebase from 'firebase';

import { AuthService } from 'app/services';
import { PhoneAuth } from './PhoneAuth';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  phoneForm: FormGroup;
  confirmationForm: FormGroup;
  confirmationResult: firebase.auth.ConfirmationResult;

  constructor(public auth: AuthService, private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForms();
  }

  onSubmit({ value, valid }: { value: PhoneAuth, valid: boolean }) {
    this.confirmationResult = null;
    this.logIn(value.phone);
  }

  async logIn(phone: string) {
    const reg = /^\+/;
    phone = !reg.test(phone) ? `+${phone}` : phone;
    this.confirmationResult = await this.auth.login(phone, { buttonId: 'login' });
  }

  onConfirmation({ value, valid }: { value: PhoneAuth, valid: boolean }) {
    if (this.confirmationResult) {
      this.sendCode(value.confirmationCode);
    }
  }

  async sendCode(code) {
    try {
      const result = await this.auth.sendCode(this.confirmationResult, code);
      // console.log('User: ', result.user);
    } catch (error) {
      console.log('Sign in error ::: ', error);
      this.auth.logout();
    }
  }

  reset() {
    this.confirmationResult = null;
  }

  buildForms(): void {
    this.phoneForm = this.fb.group({
      'phone': ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]]
    });
    this.confirmationForm = this.fb.group({
      'confirmationCode': ['', [Validators.required, Validators.minLength(4)]]
    });
  }

}
