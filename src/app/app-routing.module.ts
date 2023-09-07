import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
import {HomeComponent} from "./home/home.component";
import { LoginComponent } from './login/login.component';
import { DetailsComponent } from './menu/details/details.component';
import { ItemComponent } from './menu/item/item.component';
import { ListComponent } from './menu/list/list.component';
import { MenuComponent } from './menu/menu.component';
import { SignupDetailsComponent } from './signup/signup-details/signup-details.component';
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
        path: "signupDetails",
        component: SignupDetailsComponent
       
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "menu",
        component: MenuComponent
    },
    {
        path: "item",
        component: ItemComponent
    },
    {
        path: "menulist",
        component: ListComponent
    },
    {
        path: "menudetail/:id",
        component: DetailsComponent
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
