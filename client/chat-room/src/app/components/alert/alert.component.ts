import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {AlertService} from '../../services';
import {AlertMessage} from "../../models";

@Component({
  selector: 'alert-message',
  template: `
    <div *ngIf="message"
         [ngClass]="{ 'alert': message, 'alert-success': message.success, 'alert-danger': !message.success }">
      {{message.text}}
    </div>`
})

export class AlertComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  message: AlertMessage;

  constructor(private alertService: AlertService) {
  }

  ngOnInit() {
    this.subscription = this.alertService.getMessage().subscribe(message => {
      this.message = message;
      setTimeout(() => {
        this.message = null;
      }, 2000);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
