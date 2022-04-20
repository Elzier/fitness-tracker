import { NgModule } from '@angular/core'
import { environment } from '../environments/environment'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from './shared/material.module'

import { AppComponent } from './app.component'
import { WelcomeComponent } from './welcome/welcome.component'
import { FlexLayoutModule } from '@angular/flex-layout'
import { SidenavListComponent } from './shared/components/navigation/sidenav-list/sidenav-list.component';
import { HeaderComponent } from './shared/components/navigation/header/header.component';
import { AngularFireModule } from '@angular/fire/compat'
import { AuthModule } from './auth/auth.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { StoreModule } from '@ngrx/store'
import { reducers } from './store/app.reducer'


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    SidenavListComponent,
    HeaderComponent
  ],
  imports: [
    AuthModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    StoreModule.forRoot(reducers),
    AngularFireModule.initializeApp(environment.firebase),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
