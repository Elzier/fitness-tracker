import { AuthData, User } from '../models'
import { Subject } from 'rxjs'
import { Router } from '@angular/router'
import { Injectable } from '@angular/core'

@Injectable()
export class AuthService {
  private user: User | null = null
  authChange = new Subject<boolean>()

  constructor(private router: Router) {
  }


  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10).toString()
    }
    this.authSuccessfully()
  }

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10).toString()
    }
    this.authSuccessfully()
  }

  logout() {
    this.user = null
    this.authChange.next(false)
    this.router.navigate(['/login'])
  }

  getUser(): User | null {
    if (this.user) {
      return {...this.user}
    }
    return null
  }

  isAuth(): boolean {
    return this.user !== null
  }

  private authSuccessfully() {
    this.authChange.next(true)
    this.router.navigate(['/training'])
  }

}
