import { EventEmitter, Injectable, Output } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { LogDetails } from "./model/logDetails.model";
import { OrderDetail } from "./model/orderDetail.model";
@Injectable()
export class AuthGuard implements CanActivate {
   

    //email check in signup comp
    mail_exists: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public mail_exists_Obs: Observable<boolean> = this.mail_exists.asObservable();

    //login comp
    loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    loggedIn_Obs: Observable<boolean> = this.loggedIn.asObservable();
    logged_details = new Subject<LogDetails>();
    //tracking badge_no (app comp) 
    no_order: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    //cart details array(details comp)
    order_data: BehaviorSubject<OrderDetail[]> = new BehaviorSubject<OrderDetail[]>([]);
    order_data_Obs: Observable<OrderDetail[]> = this.order_data.asObservable();
    //get subCollectionId for updating logout
    log_subColl_id=new Subject<string>();

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> |
        Promise<boolean | UrlTree> {
        
        return true;
    }

    check_mail(status:boolean){
        this.mail_exists.next(status);
      }
     
    check_loggedIn(status:boolean){
        this.loggedIn.next(status);
      }

      push_orderData(data:OrderDetail){
        
      const currentData = this.order_data.value.slice(); //takes copy of old array
      currentData.push(data);
        
        this.order_data.next(currentData);
        this.no_order.next(currentData.length);
      }
      rearrange_orderData(data:OrderDetail[]){
        this.order_data.next(data);
        this.no_order.next(data.length);
      }

      date_TO_String(date_Object: Date): string {
        // get the year, month, date, hours, and minutes seprately and append to the string.
        let date_String: string =
          date_Object.getFullYear() +
          "/" +
          (date_Object.getMonth() + 1) +
          "/" +
          +date_Object.getDate() +
          " " +
          +date_Object.getHours() +
          ":" +
          +date_Object.getMinutes();
        return date_String;
      }
      

}