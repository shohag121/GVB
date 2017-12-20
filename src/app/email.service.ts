import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable()
export class EmailService {

  constructor(private http: HttpClient) { }
  sendEmail( email: string) {
    let body: any = {
      to: email,
      from: 'postmaster@gvb.coderexpo.com',
      subject: 'Book Share',
      text: 'this is a test text',
      multipart: true
    };
    body = JSON.stringify(body);
    this.http.post('https://api.mailgun.net/v3/gvb.coderexpo.com/messages', body, {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + btoa('api:key-1fda7ae1c5299000e3d1f7376490c1b5'))
        .set('Content-Type', 'application/x-www-form-urlencoded'),
    })
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
  }

}
