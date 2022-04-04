import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
  }

  get email() { return this.form.get('email') }
  get password() { return this.form.get('password') }
  onSubmit() {
    console.log(this.form)
  }
}
