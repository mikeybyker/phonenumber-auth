import {
  Component,
  OnInit
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  errors$: Observable<string[]>;// = Observable.of(['testing 123']);

  constructor(private alertService: AlertService) {

  }

  ngOnInit() {
    this.errors$ = this.alertService.errors$;
  }

  close() {
    this.alertService.error();
  }
}
