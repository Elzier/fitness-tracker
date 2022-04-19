import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core'
import { Observable } from 'rxjs'
import { AuthService } from '../../../services/auth.service'
import { Store } from '@ngrx/store'
import * as fromRoot from '../../../../store/app.reducer'
import { isAuthenticated } from '../../../../store/app.reducer'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>()
  isAuthenticated$!: Observable<boolean>


  constructor(private authService: AuthService, private store: Store<fromRoot.State>) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(isAuthenticated)
  }

  onSidenavToggle() {
    this.sidenavToggle.emit()
  }

  onLogout() {
    this.authService.logout()
  }
}
