import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WishlistService } from 'src/app/services/wishlistServices/wishlist.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  wishList: any = [];
  wishListCount: any = 0;
  pipe = new DatePipe('en-US');
  orderedDate: any;
  constructor(private wishlistService: WishlistService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getAllWishlist();
  }

  getAllWishlist() {
    this.wishlistService.getAllWishlist().subscribe((response: any) => {
      console.log("Got The Wishlist Successfully", response);
      this.wishList = response?.data;
      this.wishListCount = response?.data?.length;
    }, error => {
      console.log(error);
      this.snackBar.open(error.error.message, 'Failed', {
        duration: 4000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      })
      window.location.reload();
    })
  }

  deleteWishlist(wishlistId: any) {
    console.log(wishlistId)
    this.wishlistService.removeWishlist(wishlistId).subscribe((response: any) => {
      console.log("Deleted The Wishlist Successfully", response);
      this.snackBar.open("Deleted The Wishlist Successfully", 'Success', {
        duration: 4000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      })
      this.getAllWishlist();
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
