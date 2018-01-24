import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable()
export class EmailService {

  constructor(private http: HttpClient) { }
  sendEmail( email: string, msg: string) {
    const body = new HttpParams()
      .set('to', email)
      .set('from', 'no-replay@gvb.fun')
      .set('subject', 'GVB Book Suggestion')
      .set('text', msg);

    return this.http.post('https://api.mailgun.net/v3/email.gvb.fun/messages', body, {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + btoa('api:key-1fda7ae1c5299000e3d1f7376490c1b5'))
        .set('Content-Type', 'application/x-www-form-urlencoded'),
    });
  }

}
