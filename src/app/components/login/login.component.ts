import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/userServices/user.service';
import { AdminService } from 'src/app/services/adminServices/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  category: boolean = true;
  isAdmin: boolean = false;
  loginForm!: FormGroup;
  submitted = false;
  hide = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private formbuilder: FormBuilder, private router: Router, private userService: UserService, 
    private adminService: AdminService, private snackBar: MatSnackBar) { 

  }

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      emailId: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{3,}([._+-][0-9a-zA-Z]{2,})*@[0-9a-zA-Z]+[.]?([a-zA-Z]{2})+[.]([a-zA-Z]{3})+$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).{8,}$')]],
    });
  }

  register() {
    this.category = true;
    this.router.navigateByUrl('/register')
  }

  login() {
    this.category = false;
    this.router.navigateByUrl('/login')
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      let reqData = {
        emailId: this.loginForm.value.emailId,
        password: this.loginForm.value.password
      }
      if (this.isAdmin == false)
      {
        this.userService.login(reqData).subscribe((response: any) => {
          console.log("User login successfull", response);
          localStorage.setItem("token", response.token);
          localStorage.setItem("FullName", response.fullName);
          localStorage.setItem("MobileNo", response.mobileNum);
          localStorage.setItem("Email", response.email);
          this.snackBar.open('User Login successfull', 'Success', {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          })
          this.router.navigateByUrl('/dashboard').then(() => {
            window.location.reload();
          });
        }, error => {
          console.log(error);
          this.snackBar.open(error.error.message, 'Failed', {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          })
        });
      } else if (this.isAdmin == true){
        this.adminService.adminlogin(reqData).subscribe((response: any) => {
          console.log("Admin login successfull", response);
          localStorage.setItem("token", response.token);
          localStorage.setItem("FullName", response.fullName);
          localStorage.setItem("MobileNo", response.mobileNum);
          localStorage.setItem("Email", response.email);
          this.snackBar.open('Admin Login successfull', 'Success', {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          })
          this.router.navigateByUrl('/dashboard').then(() => {
            window.location.reload();
          });
        }, error => {
          console.log(error);
          this.snackBar.open(error.error.message, 'Failed', {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          })
        });
      }
    } 
    else {
      this.snackBar.open("Fill the login form with valid values", "Alert", {
        duration: 4000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      })
      // this.loginForm.reset();
    } 
  }

  forgotpassword(){
    this.router.navigateByUrl('/forgotpassword');
  }

  admin() {
    this.isAdmin = true;
  }

  userReg() {
    this.isAdmin = false;
  }
}
