import { EventEmitter, Injectable, Output } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { OrderDetail } from "./model/orderDetail.model";
@Injectable()
export class AuthGuard implements CanActivate {
    @Output() orderCart = new EventEmitter<Event>();
    @Output() orderCartArr = new EventEmitter<OrderDetail[]>();

    userDetails=new Subject<string>();

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> |
        Promise<boolean | UrlTree> {
        
        return true;
    }

}