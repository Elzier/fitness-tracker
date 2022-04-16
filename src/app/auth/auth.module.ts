import { NgModule } from '@angular/core'
import { SignupComponent } from './signup-page/signup.component'
import { LoginComponent } from './login-page/login.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MaterialModule } from '../shared/material.module'
import { FlexLayoutModule } from '@angular/flex-layout'
import { CommonModule } from '@angular/common'
import { AuthService } from '../shared/services/auth.service'
import { AngularFireAuthModule } from '@angular/fire/compat/auth'

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    AngularFireAuthModule
  ],
  exports: [],
  providers: [AuthService]
})

export class AuthModule {}
