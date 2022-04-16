import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../../shared/services/auth.service'
import { Subscription } from 'rxjs'
import { UIService } from '../../shared/services/ui.service'

@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private loaderSub$!: Subscription
  form!: FormGroup
  showLoader = false

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private uiService: UIService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })

    this.loaderSub$ = this.uiService.loaderStateChanged.subscribe(showOrNot => this.showLoader = showOrNot)
  }

  ngOnDestroy() {
    if (this.loaderSub$) this.loaderSub$.unsubscribe()
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
