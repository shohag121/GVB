import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-search-result-single',
  templateUrl: './search-result-single.component.html',
  styleUrls: ['./search-result-single.component.css']
})
export class SearchResultSingleComponent implements OnInit {
  @Input() book: any;
  public bookeditorial: string;
  constructor() { }

  ngOnInit() {
   // console.log(this.book);
    if (this.book.EditorialReviews.EditorialReview.Content) {
      this.bookeditorial = this.book.EditorialReviews.EditorialReview.Content;

    } else {
      this.bookeditorial = '';
    }
    this.bookeditorial = this.bookeditorial.replace(/<(?:.|\n)*?>/gm, '');
  }

}
