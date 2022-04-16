import { Component, OnDestroy, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { AuthService } from '../../shared/services/auth.service'
import { Subscription } from 'rxjs'
import { UIService } from '../../shared/services/ui.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  focused = false
  maxDate: Date = new Date()
  showLoader = false
  private loaderSub$!: Subscription

  constructor(private authService: AuthService, private uiService: UIService) {}

  ngOnInit(): void {
    this.loaderSub$ = this.uiService.loaderStateChanged.subscribe(showOrNot => this.showLoader = showOrNot)
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
  }

  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    })
  }

  ngOnDestroy(): void {
    if (this.loaderSub$) this.loaderSub$.unsubscribe()
  }
}
