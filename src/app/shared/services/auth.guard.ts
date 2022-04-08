import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router'
import { AuthService } from './auth.service'
import { Observable } from 'rxjs'
import { Injectable } from '@angular/core'

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isAuth()) {
      return true
    }
    this.router.navigate(['/login'])
    return false
  }
}
