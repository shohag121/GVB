import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import {EmailService} from '../email.service';
import {SmsService} from '../sms.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent implements OnInit {
  private emailId: string;
  private phone: string;
  private emailsent = false;
  private smssent = false;
  private message: string;
  private type: string;
  private text = `You are invited to check this book.
  https://gvb.coderexpo.com${this.router.url}
  GVB`;

  constructor(
    private email: EmailService,
    private sms: SmsService,
    private spinnerService: Ng4LoadingSpinnerService,
    private router: Router
  ) {}

  ngOnInit() {
  }
  sendEmail() {
    this.spinnerService.show();
    this.email.sendEmail(this.emailId, this.text)
      .subscribe(
        res => {
          // console.log(res);
          this.emailsent = true;
          this.message = 'Email Sent Successfully';
          this.type = 'success';
          this.spinnerService.hide();
        },
        err => {
          console.log(err);
          this.message = 'Error Occared';
          this.type = 'danger';
          this.spinnerService.hide();
        }
      );
  }
  sendSMS() {
    this.spinnerService.show();
    this.sms.sendSMS(this.phone, this.text)
      .subscribe(
        res => {
          // console.log(res);
          this.smssent = true;
          this.message = 'SMS Sent Successfully';
          this.type = 'success';
          this.spinnerService.hide();
        },
        err => {
          console.log(err);
          this.message = 'Error Occared';
          this.type = 'danger';
          this.spinnerService.hide();
        }
      );
  }

  smscloseAlert() {
    this.smssent = !this.smssent;
    this.emailId = '';
  }

  emailcloseAlert() {
    this.emailsent = !this.emailsent;
    this.phone = '';
  }

}
