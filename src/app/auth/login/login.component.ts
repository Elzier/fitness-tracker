import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../../shared/services/auth.service'

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

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
  }

  get email() { return this.form.get('email') }

  get password() { return this.form.get('password') }

  onSubmit() {
    this.authService.login({
      email: this.form.value.email,
      password: this.form.value.password
    })
  }
}
