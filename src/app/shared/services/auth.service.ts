import { AuthData } from '../models'
import { Subject } from 'rxjs'
import { Router } from '@angular/router'
import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { TrainingService } from './training.service'

@Injectable()
export class AuthService {
  isAuthenticated = false
  authChange = new Subject<boolean>()

  constructor(private router: Router, private fbAuth: AngularFireAuth, private trainingService: TrainingService) {}


  async login(authData: AuthData) {
    try {
      await this.fbAuth.signInWithEmailAndPassword(authData.email, authData.password)
      this.authSuccessfully()
    } catch (e) {
      console.error(e)
    }
    this.authSuccessfully()
  }

  async registerUser(authData: AuthData) {
    try {
      await this.fbAuth.createUserWithEmailAndPassword(authData.email, authData.password)
      this.authSuccessfully()
    } catch (e) {
      console.error(e)
    }
  }

  isAuth() {
    return this.isAuthenticated
  }

  async logout() {
    this.trainingService.cancelAllSubs()
    await this.fbAuth.signOut()
    this.isAuthenticated = false
    this.authChange.next(false)
    this.router.navigate(['/login'])
  }

  private authSuccessfully() {
    this.isAuthenticated = true
    this.authChange.next(true)
    this.router.navigate(['/training'])
  }

}
