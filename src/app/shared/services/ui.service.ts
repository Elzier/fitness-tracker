import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatSnackBarConfig } from '@angular/material/snack-bar/snack-bar-config'

@Injectable({providedIn: 'root'})

export class UIService {
  constructor(private _snack: MatSnackBar) {}

  showSnack(message: string, action: string, config: MatSnackBarConfig) {
    this._snack.open(message, action, config)
  }
}
