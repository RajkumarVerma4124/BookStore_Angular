import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddressService } from 'src/app/services/addressServices/address.service';
import { OrderService } from 'src/app/services/orderServices/order.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CartService } from 'src/app/services/cartServices/cart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/dataServices/data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: any;
  cartItemsCount: any = 0;
  fullName: any;
  mobileNumber: any;
  bookQuantity: number = 1;

  cartHide: boolean = false;
  addressHide: boolean = false;
  summaryHide: boolean = false;
  addressHeaderHide: boolean = false;
  isUpdate: boolean = false;

  customerAddressForm!: FormGroup;
  customerAdressObj: any;
  submitted = false;
  typeId: number = 0;

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor( private addressService: AddressService, private router: Router, private snackBar: MatSnackBar,
    private cartService: CartService, private formbuilder: FormBuilder, private orderService: OrderService, private dataService: DataService) { }

  ngOnInit(): void {
    this.getAllCart();
    this.fullName = localStorage.getItem('FullName');
    this.mobileNumber = localStorage.getItem('MobileNo');
    this.customerAddressForm = this.formbuilder.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
    })
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
    if (this.bookQuantity > 1) {
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

  removeFromCart(cartData: any) {
    console.log(cartData);
    this.cartService.removeCart(cartData.cartId).subscribe((response: any) => {
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
    this.dataService.SendRemoveBookQuantity(cartData.bookQuantity);
  }

  getAllCart() {
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
      this.router.navigateByUrl('/dashboard/allbooks')
    })
  }

  cartShowHide() {
    this.cartHide = !this.cartHide;
  }

  addressHeaderShowHide() {
    this.addressHeaderHide = !this.addressHeaderHide;
  }
  addressShowHide() {
    this.addressHide = !this.addressHide;
    this.submitted = false;
  }

  summaryShowHide() {
    this.summaryHide = !this.summaryHide;
  }

  onSubmit(reqData: any) {
    console.log(reqData)
    if (this.customerAddressForm.valid && this.typeId > 0) {
      if (reqData?.address == undefined) {
        this.submitted = true;
        let reqdata = {
          address: this.customerAddressForm.value.address,
          city: this.customerAddressForm.value.city,
          state: this.customerAddressForm.value.state,
          typeId: this.typeId
        }
        this.addressService.addAddress(reqdata).subscribe((response: any) => {
          console.log("Address confirmed", response);
          this.snackBar.open("Address Added Successfully", 'Success', {
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
      else {
        this.submitted = true;
        console.log("valid data", this.customerAddressForm.value);
        let reqdata = {
          addressId: this.customerAdressObj?.addressId,
          address: this.customerAddressForm.value.address,
          city: this.customerAddressForm.value.city,
          state: this.customerAddressForm.value.state,
          typeId: this.typeId
        }
        this.addressService.updateAddress(reqdata).subscribe((response: any) => {
          console.log("Address Updated", response);
          this.snackBar.open("Address Updated Successfully", 'Success', {
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
    } else {
      this.snackBar.open("Please Fill The Details Properly", 'Failed', {
        duration: 4000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      })
    }
  }

  addressTypevalue(value: any) {
    this.typeId = value;
  }

  editAddress() {
    this.isUpdate = !this.isUpdate;
  }

  getAddress(typeId: any) {
    this.addressService.getAddress(typeId).subscribe((response: any) => {
      console.log("Got Address", response);
      this.customerAdressObj = response.data[0];
    }, error => {
      console.log(error);
      this.snackBar.open(error.error.message, 'Failed', {
        duration: 4000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      })
    })
  }


  addOrder(addressId: any) {
    console.log(addressId)
    if(addressId != null)
    { 
      console.log("addressfound")
      let addressObj = {
        addressId: addressId
      }
      this.orderService.addOrder(addressObj).subscribe((response: any) => {
        console.log("Order Placed Successfully", response);
        this.snackBar.open("Order Placed Successfully", 'Success', {
          duration: 4000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        })
        this.router.navigateByUrl("dashboard/orderplaced")
      }, error => {
        console.log(error);
        this.snackBar.open(error.error.message, 'Failed', {
          duration: 4000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        })
      })
    }
    else
    { 
      this.snackBar.open("Add The Address For Order", 'Failed', {
        duration: 4000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      })
    }
  }
}
