import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { BookService } from 'src/app/services/bookServices/book.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CartService } from 'src/app/services/cartServices/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: any;
  cartItemsCount: any;
  bookQuantity: number = 1;
  cartHide: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private bookService: BookService, private router: Router, private snackBar: MatSnackBar, 
    private cartService: CartService) { }

  ngOnInit(): void {
    this.getAllCart();
  }


  plusCartBook(cartData: any) {
    this.bookQuantity = cartData.bookQuantity;
   this.bookQuantity++
   console.log(this.bookQuantity)
    this.cartService.updateCart(cartData.cartId, this.bookQuantity).subscribe((response: any) => {
      console.log("Add To Cart Successfully", response);
      this.snackBar.open("Add To Cart Successfully", 'Success', {
        duration: 4000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      })
      this.getAllCart();
    }, error => {
      console.log(error);
      this.snackBar.open(error.error.message, 'Failed', {
        duration: 4000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      })
    })
  }

  minusCartBook(cartData: any) {
    this.bookQuantity = cartData.bookQuantity;
    if(this.bookQuantity > 1){
      this.bookQuantity--
      console.log(this.bookQuantity)
      this.cartService.updateCart(cartData.cartId, this.bookQuantity).subscribe((response: any) => {
        console.log("Remove From Cart Successfully", response);
        this.getAllCart();
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

  removeFromCart(cartId: any) {
    console.log(cartId);
    this.cartService.removeCart(cartId).subscribe((response: any) => {
      console.log("Remove The Book From Cart Successfully", response);
      this.snackBar.open("Book Remove From Cart Successfully", 'Success', {
        duration: 4000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      })
      this.getAllCart();
    }, error => {
      console.log(error);
      this.snackBar.open(error.error.message, 'Failed', {
        duration: 4000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      })
    })
  }

  getAllCart(){
    this.cartService.getAllCart().subscribe((response: any) => {
      console.log("Got The Cart Successfully", response);
      this.cartItems = response.data;
      this.cartItemsCount = response.data.length;
    }, error => {
      console.log(error);
      this.snackBar.open(error.error.message, 'Failed', {
        duration: 4000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      })
    })
  }

  cartShowHide(){
    this.cartHide = !this.cartHide;
  }
}
