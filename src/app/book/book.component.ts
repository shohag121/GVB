import { Component, OnInit } from '@angular/core';
import amazon from 'amazon-product-api';
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})

export class BookComponent implements OnInit {
  private bookID: string;
  public book;
  private client: any = amazon.createClient(environment.aws);
  constructor(private route: ActivatedRoute, private spinnerService: Ng4LoadingSpinnerService) {
    this.spinnerService.show();
  }

  ngOnInit() {
    this.bookID = this.route.snapshot.paramMap.get('id');
    this.client.itemLookup({
      idType: 'ISBN',
      itemId: this.bookID,
      responseGroup: 'ItemAttributes,Images,EditorialReview'
    }).then((results) => {
      console.log(results);
      this.book = results;
      this.spinnerService.hide();
    }).catch((err) => {
      console.log(err);
      this.spinnerService.hide();
    });


  }

}
