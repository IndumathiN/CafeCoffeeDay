import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
import {HomeComponent} from "./home/home.component";
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [
    {
        path: "",
        component: HomeComponent

    },
    {
        path: "signup",
        component: SignupComponent,
        canActivate:[AuthGuard]
    },
    {
        path: "login",
        component: LoginComponent
    },
   
    {
        path: "**",
        redirectTo: '/'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
