import {Component, Input, OnInit} from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import {EmailService} from '../email.service';
import {SmsService} from '../sms.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {AuthService} from '../core/auth.service';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent implements OnInit {
  public isCollapsed: any;
  public isCollapsed1: any;
  public emailId: string;
  public phone: string;
  public emailsent = false;
  public smssent = false;
  public message: string;
  public type: string;
  public bookinfo: any;
  private text = `You are invited to check this book.\nhttps://gvb.coderexpo.com${this.router.url}\nGVB`;
  @Input() book: any;
  constructor(
    private email: EmailService,
    private sms: SmsService,
    private spinnerService: Ng4LoadingSpinnerService,
    private router: Router,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.bookinfo = this.book;
  }
  sendEmail() {
    this.spinnerService.show();
    this.email.sendEmail(this.emailId, this.text)
      .subscribe(
        res => {
          // console.log(res);
          this.emailsent = true;
          this.message = `Success! Email sent successfully.`;
          this.type = 'success';
          this.spinnerService.hide();
        },
        err => {
          console.log(err);
          this.emailsent = true;
          this.message = `Error! Email not sent.`;
          this.type = 'danger';
          this.spinnerService.hide();
        }
      );
  }
  sendSMS() {
    if (this.phone.length === 10 ) {
      this.phone = '88' + this.phone;
    } else if (this.phone.length < 10) {
      this.smssent = true;
      this.message = `Error! Number not valid.`;
      this.type = 'danger';
      return;
    }
    this.spinnerService.show();
    this.sms.sendSMS(this.phone, this.text)
      .subscribe(
        res => {
          // console.log(res);
          this.smssent = true;
          this.message = `Success! SMS sent successfully.`;
          this.type = 'success';
          this.spinnerService.hide();
        },
        err => {
          console.log(err);
          this.smssent = true;
          this.message = `Error! SMS not sent.`;
          this.type = 'danger';
          this.spinnerService.hide();
        }
      );
  }

  smscloseAlert() {
    this.smssent = !this.smssent;
    this.phone = '';
    this.isCollapsed1 = !this.isCollapsed1;
  }

  emailcloseAlert() {
    this.emailsent = !this.emailsent;
    this.emailId = '';
    this.isCollapsed = !this.isCollapsed;
  }

}
