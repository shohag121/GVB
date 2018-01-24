import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {AmazonService} from '../amazon.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})

export class SearchResultComponent implements OnInit {
  public q: string;
  public books: any;
  constructor(public ams: AmazonService, private route: ActivatedRoute, private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {

    this.route.queryParams
      .filter(params => params.q)
      .subscribe(params => {
        this.q = params.q;
        // Initiate spinner
        this.spinnerService.show();
        // Query to amazon
        this.ams.bookSearch(this.q).subscribe(res => {
          console.log(res);
          this.books = res;
          this.spinnerService.hide();
        });
      });

  }


}
