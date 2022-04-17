import { NgModule } from '@angular/core'
import { SignupComponent } from './signup-page/signup.component'
import { LoginComponent } from './login-page/login.component'
import { AuthService } from '../shared/services/auth.service'
import { SharedModule } from '../shared/shared.module'
import { AuthRoutingModule } from './auth-routing.module'

@NgModule({
  declarations: [SignupComponent, LoginComponent],
  imports: [SharedModule, AuthRoutingModule],
  providers: [AuthService]
})

export class AuthModule {}
