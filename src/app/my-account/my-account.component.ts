import { Component, OnInit } from '@angular/core';
import {AuthService} from '../core/auth.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  books: any;
  constructor( public auth: AuthService) {}

  ngOnInit() {
    this.auth.getData().subscribe(data => {
      data.subscribe(books => {
       if (books.length > 0) {
         this.books = books;
       } else {
         this.books = null;
       }
      });
    });
  }

}
