import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/services/bookServices/book.service';
import { CartService } from 'src/app/services/cartServices/cart.service';
import { WishlistService } from 'src/app/services/wishlistServices/wishlist.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-quickview',
  templateUrl: './quickview.component.html',
  styleUrls: ['./quickview.component.scss']
})
export class QuickviewComponent implements OnInit {
  booksId : any;
  booksData: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  comment: any;
  ratingValue: any = 0;
  feedbackList: any = [];
  bookQuantity: number = 1;
  constructor(private bookService: BookService, private cartService: CartService, private router: Router, private snackBar: MatSnackBar, 
    private activeRoute: ActivatedRoute, private wishlistService: WishlistService) { }

  ngOnInit(): void {
    this.booksId = this.activeRoute.snapshot.paramMap.get('bookId');
    console.log(this.booksId);
    this.getbook()
    this.getAllFeedback(this.booksId)
  }

  getbook() {
    this.bookService.getbook(this.booksId).subscribe((response: any) => {
      console.log("Got The Books Succesfully", response);
      this.booksData = response.data
      console.log("Books Details", this.booksData);
    }, error => {
      console.log(error);
      this.snackBar.open(error.error.message, 'Failed', {
        duration: 4000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      })
    })
  }

  addFeedback(bookData: any) {
    let reqData = {
      bookId: bookData.bookId,
      comment: this.comment,
      rating: this.ratingValue
    }
    console.log(reqData)
    this.bookService.addFeedback(reqData).subscribe((response: any) => {
      console.log("Added The Feedback Succesfully", response);
      this.snackBar.open("Added The Feedback Succesfully", 'Success', {
        duration: 4000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      })
      this.getAllFeedback(bookData.bookId)
    }, error => {
      console.log(error);
      this.snackBar.open(error.error.message, 'Failed', {
        duration: 4000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      })
    })
  }

  getAllFeedback(bookId: any) {
    this.bookService.getAllFeedback(bookId).subscribe((response: any) => {
      console.log("Got The Feedbacks Succesfully", response);
      this.feedbackList = response.data
      console.log("FeedBack Details", this.feedbackList);
    }, error => {
      console.log(error);
    })
  }

  getShortName(fullName: any) {
    return fullName.split(' ').map((n: any) => n[0]).join('');
  }

  addToCart(bookData: any) {
    let reqData = {
      bookId: bookData.bookId,
      bookQuantity: this.bookQuantity
      
    }
    this.cartService.addToCart(reqData).subscribe((response: any) => {
      console.log("Add To Cart Successfully", response);
      this.snackBar.open("Add To Cart Successfully", 'Success', {
        duration: 4000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      })
    }, error => {
      console.log(error);
      this.snackBar.open(error.error.message, 'Failed', {
        duration: 4000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      })
    })
  }

  addWishlist(bookId: any) {
    this.wishlistService.addWishlist(bookId).subscribe((response: any) => {
      console.log("Added To Wishlist Succesfully", response);
      this.snackBar.open(response.data, 'Success', {
        duration: 4000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      })
    }, error => {
      console.log(error);
      this.snackBar.open(error.error.message, 'Failed', {
        duration: 4000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      })
    })
  }
}
