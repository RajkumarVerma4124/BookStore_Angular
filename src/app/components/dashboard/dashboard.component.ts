import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/dataServices/data.service'
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CartService } from 'src/app/services/cartServices/cart.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  searchActive: boolean = false;
  searchTerm: string = "";
  fullName: any = "";
  email: any = "";
  searchBarActive: boolean = false;
  tempbookQuantity: number = 0;
  tempremovedQuantity: number = 0;
  bookQuantity: number = 0;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  cartItems: any;
  cartItemsCount: number = 0;

  constructor(private dataService: DataService, private snackBar: MatSnackBar, private router: Router, private cartService: CartService) {
    this.dataService.recievedBookQuanitity.subscribe((response: any) => {
      console.log("Data Recieved", response);
      this.getAllCart();
    })
    this.dataService.recievedremoveBookQuanitity.subscribe((response: any) => {
      console.log("Data Recieved", response);
      this.getAllCart();
    })
 }

  ngOnInit(): void {
    this.fullName = localStorage.getItem("FullName")
    this.email = localStorage.getItem("Email")
  }

  recieveSearchNote(noteString: any) {
    console.log(noteString.target.value);
    this.searchTerm = noteString.target.value;
    this.dataService.SendData(this.searchTerm);
    this.searchActive = true;
    if (this.searchTerm.length == 0) {
      this.clickCross();
    }
  }

  clickCross() {
    this.searchTerm = "";
    this.searchActive = false;
  }

  setSearchActive() {
    this.searchBarActive = !this.searchBarActive;
  }

  setSearchDeactive() {
    this.searchBarActive = false;
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("FullName");
    localStorage.removeItem("MobileNo");
    localStorage.removeItem("Email");
    localStorage.clear();
    this.fullName = "Profile"
    setTimeout(() => {
      this.router.navigateByUrl('/dashboard/logout');
    }, 50);
  }

  login() {
    this.router.navigateByUrl('/login');
  }

  goToCart(){
    if (this.cartItemsCount > 0) {
      this.router.navigateByUrl('/dashboard/cart');
    }
    else {
      this.snackBar.open("Add Some Books First", 'Failed', {
        duration: 4000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      })
    }
  }

  getAllCart() {
    this.cartService.getAllCart().subscribe((response: any) => {
      console.log("Got The Cart Successfully", response);
      this.cartItems = response.data;
      this.cartItemsCount = 0;
      this.cartItems.forEach((cartItem: any) => {
        this.cartItemsCount = this.cartItemsCount + cartItem.bookQuantity
      })
      console.log(this.cartItemsCount)
    }, error => {
      console.log(error);
      this.cartItemsCount = 0;
    })
  }


  goToHome() {
    this.router.navigateByUrl('/dashboard/allbooks');
  }
  
  goToOrders() {
    if(this.fullName != null) {
      this.router.navigateByUrl('/dashboard/orderlist');
    } else {
      this.snackBar.open("Please Login First", 'Failed', {
        duration: 4000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      })
    }
  }
  goToWishlist() {
    if (this.fullName != null) {
      this.router.navigateByUrl('/dashboard/wishlist');
    } else {
      this.snackBar.open("Please Login First", 'Failed', {
        duration: 4000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      })
    }
  }
}
