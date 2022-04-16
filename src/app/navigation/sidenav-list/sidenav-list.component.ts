import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core'
import { Subscription } from 'rxjs'
import { AuthService } from '../../shared/services/auth.service'

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() sidebarCloseEvent = new EventEmitter<void>()
  private authSub$!: Subscription
  isAuthorized = false

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authSub$ = this.authService.authChange.subscribe(authStatus => {
      this.isAuthorized = authStatus
    })
  }

  onClose() {
    this.sidebarCloseEvent.emit()
  }

  onLogout() {
    this.onClose()
    this.authService.logout()
  }

  ngOnDestroy(): void {
    if (this.authSub$) this.authSub$.unsubscribe()
  }
}
