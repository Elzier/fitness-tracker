import { AuthData } from '../models'
import { Subject } from 'rxjs'
import { Router } from '@angular/router'
import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { TrainingService } from './training.service'
import firebase from 'firebase/compat'
import User = firebase.User

@Injectable()
export class AuthService {
  isAuthenticated = false
  authChange = new Subject<boolean>()

  constructor(private router: Router, private fbAuth: AngularFireAuth, private trainingService: TrainingService) {}

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
      await this.fbAuth.signInWithEmailAndPassword(authData.email, authData.password)
    } catch (e) {
      console.error(e)
    }
  }

  async registerUser(authData: AuthData) {
    try {
      await this.fbAuth.createUserWithEmailAndPassword(authData.email, authData.password)
    } catch (e) {
      console.error(e)
    }
  }

  isAuth() {
    return this.isAuthenticated
  }

  async logout() {
    await this.fbAuth.signOut()
  }

}
