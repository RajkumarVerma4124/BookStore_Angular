import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/dataServices/data.service'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-quickview',
  templateUrl: './quickview.component.html',
  styleUrls: ['./quickview.component.scss']
})
export class QuickviewComponent implements OnInit {
  bookId : any;
  booksId: any;
  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.dataService.recievedBookIdData.subscribe((response: any) => {
      console.log("Data Recieved", response);
      this.bookId = response;
    })
    this.booksId = this.route.snapshot.params['bookId']

    console.log(this.bookId, this.booksId);
  }
}
