import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatSnackBarConfig } from '@angular/material/snack-bar/snack-bar-config'

@Injectable({providedIn: 'root'})

export class UIService {
  loaderStateChanged = new Subject<boolean>()

  constructor(private _snack: MatSnackBar,) {
  }

  showLoader() {
    this.loaderStateChanged.next(true)
  }

  hideLoader() {
    this.loaderStateChanged.next(false)
  }

  showSnack(message: string, action: string, config: MatSnackBarConfig) {
    this._snack.open(message, action, config)
  }
}
