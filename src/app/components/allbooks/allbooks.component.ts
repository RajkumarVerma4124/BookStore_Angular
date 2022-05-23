import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/bookServices/book.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataService } from '../../services/dataServices/data.service'

@Component({
  selector: 'app-allbooks',
  templateUrl: './allbooks.component.html',
  styleUrls: ['./allbooks.component.scss']
})
export class AllbooksComponent implements OnInit {
  booklist: any = [];
  booksCount: any;
  searchString: string= "";
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private bookService: BookService, private router: Router, private snackBar: MatSnackBar, 
    private dataService: DataService) { }

  ngOnInit(): void {
    this.getAllbooks();
    this.dataService.recievedData.subscribe((response: any) => {
      console.log("Data Recieved", response);
      this.searchString = response;
    })
  }

  getAllbooks() {
    this.bookService.getallbooks().subscribe((response: any) => {
      console.log("Got All Books Succesfully", response);
      this.booklist = response.data
      this.booksCount = response.data.length;
      console.log("All Books", this.booklist);
      console.log("Books length", this.booksCount);
    }, error => {
      console.log(error);
      this.snackBar.open(error.error.message, 'Failed', {
        duration: 4000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      })
    })
  }

  lowToHigh() {
    this.booklist = this.booklist.sort((x: any, y: any) => x.discountPrice - y.discountPrice);
  }
  highToLow() {
    this.booklist = this.booklist.sort((x: any, y: any) => y.discountPrice - x.discountPrice);
  }
  newestArrivals() {
    this.booklist.reverse();
  }
}
