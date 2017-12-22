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
   this.bookeditorial = this.book.EditorialReviews[0].EditorialReview[0].Content[0];
   this.bookeditorial = this.bookeditorial.replace(/<(?:.|\n)*?>/gm, '');
  }

}
