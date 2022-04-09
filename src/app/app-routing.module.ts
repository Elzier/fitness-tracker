import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { WelcomeComponent } from './welcome/welcome.component'
import { LoginComponent } from './auth/login/login.component'
import { SignupComponent } from './auth/signup/signup.component'
import { TrainingComponent } from './training/training.component'
import { AuthGuard } from './shared/services/auth.guard'

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'training', component: TrainingComponent},
  // , canActivate: [AuthGuard]
  {path: 'welcome', component: WelcomeComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
