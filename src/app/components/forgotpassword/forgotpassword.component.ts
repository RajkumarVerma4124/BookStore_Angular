import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private formbuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.forgotPassForm = this.formbuilder.group({
      emailId: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{3,}([._+-][0-9a-zA-Z]{2,})*@[0-9a-zA-Z]+[.]?([a-zA-Z]{2})+[.]([a-zA-Z]{3})+$')]],
    });
  }

  onSubmit() {
    this.submitted = true;
  }
}
