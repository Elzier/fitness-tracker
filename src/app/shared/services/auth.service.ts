import { AuthData } from '../models'
import { Subject } from 'rxjs'
import { Router } from '@angular/router'
import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { TrainingService } from './training.service'
import firebase from 'firebase/compat'
import User = firebase.User
import { MatSnackBar } from '@angular/material/snack-bar'
import { FirebaseError } from 'firebase/app'
import { UIService } from './ui.service'
import { Store } from '@ngrx/store'
import * as fromRoot from '../../store/app.reducer'
import * as UI from '../../store/ui/ui.actions'

@Injectable()
export class AuthService {
  isAuthenticated = false
  authChange = new Subject<boolean>()

  constructor(
    private router: Router,
    private fbAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private _snack: MatSnackBar,
    private uiService: UIService,
    private store: Store<fromRoot.State>
  ) {}

  initAuthListener() {
    this.fbAuth.authState.subscribe((user: User | null) => {
      if (user) {
        this.isAuthenticated = true
        this.authChange.next(true)
        this.router.navigate(['/training'])
      }
      else {
        this.trainingService.cancelAllSubs()
        this.isAuthenticated = false
        this.authChange.next(false)
        this.router.navigate(['/login'])
      }
    })
  }

  async login(authData: AuthData) {
    try {
      this.store.dispatch(new UI.StartLoading())
      await this.fbAuth.signInWithEmailAndPassword(authData.email, authData.password)
    }
    catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/invalid-email":
          case "auth/wrong-password":
          case "auth/user-not-found":
            this._snack.open('Wrong email address or password.', '', {duration: 2500})
            break
          default:
            this._snack.open('Unexpected Error', '', {duration: 2500})
            break
        }
      }
    }
    finally {
      this.store.dispatch(new UI.StopLoading())
    }
  }

  async registerUser(authData: AuthData) {
    try {
      this.store.dispatch(new UI.StartLoading())
      await this.fbAuth.createUserWithEmailAndPassword(authData.email, authData.password)
    }
    catch (err) {
      if (err instanceof FirebaseError) {
        switch (err.code) {
          case 'auth/email-already-in-use':
            this._snack.open('An account with the given email address already exists.', '', {duration: 2500})
            break
          case 'auth/invalid-email':
          case 'auth/weak-password':
            this._snack.open('Wrong email address or password.', '', {duration: 2500})
            break
          case 'auth/operation-not-allowed':
            this._snack.open('Email/password are not enabled.', '', {duration: 2500})
            break
          default:
            this._snack.open('Unexpected Error', '', {duration: 2500})
            break
        }
      }
    }
    finally {
      this.store.dispatch(new UI.StopLoading())
    }
  }

  isAuth() {
    return this.isAuthenticated
  }

  async logout() {
    await this.fbAuth.signOut()
  }
}
