import { Component, OnInit } from '@angular/core';
import {EmailService} from '../email.service';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent implements OnInit {
  private emailId: string;

  constructor(private email: EmailService) { }

  ngOnInit() {
  }
  sendEmail() {
    this.email.sendEmail(this.emailId);
  }

}
