import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class SmsService {


  constructor(private http: HttpClient) { }
  sendSMS( phone: string, msg: string) {
    const body: any = {
      'api_key': 'C20007125a3a8f7d7201a4.67228368',
      'type': 'text',
      'contacts': phone,
      'senderid': '8804445629106',
      'msg': msg
    };
     return this.http.post('http://esms.dianahost.com/smsapi', body, {
       responseType: 'text'
     });
  }


}
