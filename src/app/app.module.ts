
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/do';

import {
  AuthService,
  TruncatePipe
} from './services';
import { LoginComponent } from './login/login.component';
import { MessagesComponent } from './messages/messages.component';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './services/alert.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MessagesComponent,
    TruncatePipe,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    TruncatePipe,
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
