import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core'
import { Subscription } from 'rxjs'
import { AuthService } from '../../shared/services/auth.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>()
  private authSub$!: Subscription
  isAuthorized = false


  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authSub$ = this.authService.authChange.subscribe(authStatus => {
      this.isAuthorized = authStatus
    })
  }

  onSidenavToggle() {
    this.sidenavToggle.emit()
  }

  onLogout() {
    this.authService.logout()
  }

  ngOnDestroy(): void {
    if (this.authSub$) this.authSub$.unsubscribe()
  }
}
