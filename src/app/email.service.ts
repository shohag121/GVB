import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';



@Injectable()
export class EmailService {

  constructor(private http: HttpClient) { }
  sendEmail( email: string, msg: string) {
    const body = new HttpParams()
      .set('to', email)
      .set('from', 'noreplay@gvb.coderexpo.com')
      .set('subject', 'GVB Book Suggestion')
      .set('text', msg);

    return this.http.post('https://api.mailgun.net/v3/gvb.coderexpo.com/messages', body, {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + btoa('api:key-1fda7ae1c5299000e3d1f7376490c1b5'))
        .set('Content-Type', 'application/x-www-form-urlencoded'),
    });
  }

}
