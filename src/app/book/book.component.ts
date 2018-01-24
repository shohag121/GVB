import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {AmazonService} from '../amazon.service';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})

export class BookComponent implements OnInit {
  private bookID: string;
  public book;

  constructor( public ams: AmazonService, public route: ActivatedRoute, private spinnerService: Ng4LoadingSpinnerService) {
     this.spinnerService.show();
  }

  ngOnInit() {
    this.bookID = this.route.snapshot.paramMap.get('id');
    this.ams.bookDetails(this.bookID).subscribe(res => {
       console.log(res);
      this.book = res;
      this.spinnerService.hide();
    });

  }

}
