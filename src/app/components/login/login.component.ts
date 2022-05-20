import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  category: boolean = true;
  loginForm!: FormGroup;
  submitted = false;
  hide = true;

  constructor(private formbuilder: FormBuilder, private router: Router) { 

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
  }

  forgotpassword(){
    this.router.navigateByUrl('/forgotpassword');
  }
}
