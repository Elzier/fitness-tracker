import { NgModule } from '@angular/core'
import { environment } from '../environments/environment'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from './shared/material.module'

import { AppComponent } from './app.component'
import { SignupComponent } from './auth/signup/signup.component'
import { LoginComponent } from './auth/login/login.component';
import { TrainingComponent } from './training/training.component';
import { NewTrainingComponent } from './training/new-training/new-training.component';
import { PastTrainingsComponent } from './training/past-trainings/past-trainings.component';
import { WelcomeComponent } from './welcome/welcome.component'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { HeaderComponent } from './navigation/header/header.component';
import { CurrentTrainingComponent } from './training/current-training/current-training.component'
import { StopTrainingComponent } from './training/current-training/stop-training.component'
import { AuthService } from './shared/services/auth.service'
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'
import { FirestoreDatePipe } from './shared/pipes/firestoreDate.pipe'
import { AngularFireAuthModule } from '@angular/fire/compat/auth'


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    TrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    WelcomeComponent,
    SidenavListComponent,
    HeaderComponent,
    CurrentTrainingComponent,
    StopTrainingComponent,
    FirestoreDatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
