import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/userServices/user.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {
  category: boolean = true;
  forgotPassForm!: FormGroup;
  submitted = false;
  hide = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private formbuilder: FormBuilder, private router: Router, private userService: UserService,
    private snackBar: MatSnackBar) {
   }

  ngOnInit(): void {
    this.forgotPassForm = this.formbuilder.group({
      emailId: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{3,}([._+-][0-9a-zA-Z]{2,})*@[0-9a-zA-Z]+[.]?([a-zA-Z]{2})+[.]([a-zA-Z]{3})+$')]],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.forgotPassForm.valid) {
      let reqData = {
        emailId: this.forgotPassForm.value.emailId,
      }
      this.userService.forgotPassword(reqData).subscribe((response: any) => {
        console.log("Reset link sent successfully", response);
        this.snackBar.open('Reset link sent successfully', 'Success', {
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
    }
    else {
      this.snackBar.open("Enter the email with correct format", "Alert", {
        duration: 4000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      })
      // this.loginForm.reset();
    } 
  }
}
