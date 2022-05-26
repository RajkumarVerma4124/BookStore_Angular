import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddressService } from 'src/app/services/addressServices/address.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  fullName: any;
  mobileNumber: any;
  emailId: any
  customerAddressForm!: FormGroup;
  customerAdressObj: any;
  customerAdressessObj: any;
  submitted = false;
  typeId: number = 0;
  addressHide: boolean = false;
  addressHeaderHide: boolean = false;
  isUpdate: boolean = false;

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private addressService: AddressService, private router: Router, private snackBar: MatSnackBar,
     private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.fullName = localStorage.getItem('FullName');
    this.mobileNumber = localStorage.getItem('MobileNo');
    this.emailId = localStorage.getItem('Email');

    this.customerAddressForm = this.formbuilder.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
    })

    this.getAllAddress()
  }


  addressShowHide() {
    this.addressHide = !this.addressHide;
  }

  addNewAddress(){
    this.submitted = false;
    this.isUpdate = false;
  }

  addressTypevalue(value: any) {
    this.typeId = value;
  }

  editAddress() {
    this.isUpdate = true;
  }

  onSubmit(addressData: any) {
    console.log(addressData)
    if (this.customerAddressForm.valid && this.typeId > 0) {
      if (addressData?.address == undefined) {
        this.submitted = true;
        let reqdata = {
          address: this.customerAddressForm.value.address,
          city: this.customerAddressForm.value.city,
          state: this.customerAddressForm.value.state,
          typeId: this.typeId
        }
        console.log(reqdata)
        this.addressService.addAddress(reqdata).subscribe((response: any) => {
          console.log("Address confirmed", response);
          this.snackBar.open("Address Added Successfully", 'Success', {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          })
          this.getAllAddress()
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
        console.log(reqdata)
        this.addressService.updateAddress(reqdata).subscribe((response: any) => {
          console.log("Address Updated", response);
          this.snackBar.open("Address Updated Successfully", 'Success', {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          })
          this.getAllAddress()
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

  getAllAddress() {
    this.addressService.getAllAddress().subscribe((response: any) => {
      console.log("Got Address", response);
      this.customerAdressessObj = response.data;
      this.customerAdressessObj.reverse();
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
