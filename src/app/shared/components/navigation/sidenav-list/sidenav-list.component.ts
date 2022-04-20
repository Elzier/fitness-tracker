import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { Observable } from 'rxjs'
import { AuthService } from '../../../services/auth.service'
import * as fromRoot from '../../../../store/app.reducer'
import { Store } from '@ngrx/store'
import { isAuthenticated } from '../../../../store/app.reducer'

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  @Output() sidebarCloseEvent = new EventEmitter<void>()
  isAuthenticated$!: Observable<boolean>

  constructor(private authService: AuthService, private store: Store<fromRoot.State>) { }

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(isAuthenticated)
  }

  onClose() {
    this.sidebarCloseEvent.emit()
  }

  onLogout() {
    this.onClose()
    this.authService.logout()
  }
}
