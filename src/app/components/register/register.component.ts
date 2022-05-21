import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/userServices/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  category: boolean = false;
  registerForm!: FormGroup;
  submitted = false;
  hide = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  
  constructor(private formbuilder: FormBuilder, private router: Router, private userService: UserService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.registerForm = this.formbuilder.group({
      fullName: ['', [Validators.required, Validators.pattern('(?=^.{0,40}$)^[a-zA-Z-]{3,}\\s[a-zA-Z-]{3,}$')]],
      emailId: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{3,}([._+-][0-9a-zA-Z]{2,})*@[0-9a-zA-Z]+[.]?([a-zA-Z]{2})+[.]([a-zA-Z]{3})+$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).{8,}$')]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^(\\+?\\d{1,3}[- ]?)?\\d{10}$')]],
    });
  }

  register(){
    this.category = false;
    this.router.navigateByUrl('/register')
  }

  login(){
    this.category = true;
    this.router.navigateByUrl('/login')
  }

  onSubmit() {
    this.submitted= true;
    if (this.registerForm.valid) {
      let reqData = {
        fullName: this.registerForm.value.fullName,
        emailId: this.registerForm.value.emailId,
        password: this.registerForm.value.password,
        mobileNumber: this.registerForm.value.mobileNumber
      }
      this.userService.register(reqData).subscribe((response: any) => {
        console.log("Registered the user successfully", response);
        this.router.navigateByUrl('/login')
        this.snackBar.open('User registered successfully', 'Success', {
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
      });
    } else {
      this.snackBar.open("Fill the register form with valid values", 'Alert', {
        duration: 4000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      })
    } 
  } 
}
