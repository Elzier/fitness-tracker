import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { AuthService } from '../../shared/services/auth.service'
import { Store } from '@ngrx/store'
import * as fromRoot from '../../store/app.reducer'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  focused = false
  maxDate: Date = new Date()
  isLoading$!: Observable<boolean>

  constructor(private authService: AuthService, private store: Store<fromRoot.State>) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select<boolean>(fromRoot.isLoading)
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
  }

  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    })
  }
}
