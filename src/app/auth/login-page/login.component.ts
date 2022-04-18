import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../../shared/services/auth.service'
import { Observable} from 'rxjs'
import { UIService } from '../../shared/services/ui.service'
import { Store } from '@ngrx/store'
import * as fromRoot from '../../store/app.reducer'

@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading$!: Observable<boolean>
  form!: FormGroup
  showLoader = false

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private uiService: UIService,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(fromRoot.isLoading)

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
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
