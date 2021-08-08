import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { RequestResetComponent } from './request-reset/request-reset.component';
import { ResponseResetComponent } from './response-reset/response-reset.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{
  path:'sign-in',
  component:SigninComponent
},

{
  path:'sign-up',
  component:SignupComponent
},

{
  path:'request-reset-password',
  component:RequestResetComponent
},

{
  path:'response-reset-password',
  component:ResponseResetComponent
},


{
  path:'response-reset-password',
  redirectTo:'sign-in'
},



];


@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    RequestResetComponent,
    ResponseResetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    ],

  exports:[RouterModule],


  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
