import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  
  constructor(private formbuilder: FormBuilder, private router: Router) {

   }

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
  } 
}
