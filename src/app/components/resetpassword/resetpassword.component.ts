import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch} from '../helpers'

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

  constructor(private formbuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.resetPassForm = this.formbuilder.group({
      newpassword: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).{8,}$')]],
      confirmpassword: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).{8,}$')]],
    }, {
      validator: MustMatch('newpassword', 'confirmpassword')
    });
  }

  onSubmit() {
    this.submitted = true;
  }
}
