import { AuthData, User } from '../models'
import { Subject } from 'rxjs'

export class AuthService {
  private user: User | null = null
  authChange = new Subject<boolean>()


  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10).toString()
    }
    this.authChange.next(true)
  }

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10).toString()
    }
    this.authChange.next(true)
  }

  logout() {
    this.user = null
    this.authChange.next(false)
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

}
