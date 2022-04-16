import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({providedIn: 'root'})

export class UIService {
  loaderStateChanged = new Subject<boolean>()

  showLoader() {
    this.loaderStateChanged.next(true)
  }

  hideLoader() {
    this.loaderStateChanged.next(false)
  }
}
