import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch} from '../helpers'
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/userServices/user.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';


@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  category: boolean = true;
  resetPassForm!: FormGroup;
  submitted = false;
  hide = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  token: any;

  constructor(private formbuilder: FormBuilder, private userService: UserService, private activeRoute: ActivatedRoute, 
    private router: Router, private snackBar: MatSnackBar) { 
  }

  ngOnInit() {
    this.resetPassForm = this.formbuilder.group({
      newpassword: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).{8,}$')]],
      confirmpassword: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).{8,}$')]],
    }, {
      validator: MustMatch('newpassword', 'confirmpassword')
    });
    this.token = this.activeRoute.snapshot.paramMap.get('token');
  }

  onSubmit() {
    this.submitted = true;
    if (this.resetPassForm.valid) {
      let reqData = {
        password: this.resetPassForm.value.newpassword,
        confirmPassword: this.resetPassForm.value.confirmpassword
      }
      this.userService.resetPassword(reqData, this.token).subscribe((response: any) => {
        console.log("Password changed successfully", response);
        this.snackBar.open("Resetted the password successfully", 'Success', {
          duration: 4000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        })
        this.router.navigateByUrl('/login')
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
      this.snackBar.open("Check Your Password", 'Alert', {
        duration: 4000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      })
    }
  }
}
