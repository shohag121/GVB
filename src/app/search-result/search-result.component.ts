import { Component, OnInit } from '@angular/core';
import * as amazon from 'amazon-product-api';
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  private client: any = amazon.createClient(environment.aws);
  public q: string;
  public books: any[];
  constructor(private route: ActivatedRoute, private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {

    this.route.queryParams
      .filter(params => params.q)
      .subscribe(params => {
        this.q = params.q;
        // Initiate spinner
        this.spinnerService.show();
        // Query to amazon
        this.client.itemSearch({
          keywords: this.q,
          searchIndex: 'Books',
          responseGroup: 'ItemAttributes,Images,EditorialReview'
        }).then((results) => {
          // console.log(results);
          this.books = results;
          // console.log(this.books);
          this.spinnerService.hide();
        }).catch((err) => {
          console.log(err);
          this.spinnerService.hide();
        });
      });

  }


}
