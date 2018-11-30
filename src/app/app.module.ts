import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { ListComponent } from './list/list.component';
import { HomeComponent } from './home/home.component';
import { ChildComponent } from './child/child.component';
import { AuthGuard } from './auth.guard';
import { DataService } from './data.service'

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    RegisterComponent,
    AddContactComponent,
    ListComponent,
    HomeComponent,
    ChildComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['https://gbsantaapi.azurewebsites.net/'],
      }
    })
  ],
  providers: [
    DataService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
