import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable()
export class AmazonService {

  constructor(private http: HttpClient) { }
  public bookSearch(q: string ) {
    return this.http.get(`https://gvb.fun/api/booksearch.php?keyword=${q}`);
  }
  public bookDetails(isbn: string) {
    return this.http.get(`https://gvb.fun/api/bookdetails.php?isbn=${isbn}`);
  }

}
