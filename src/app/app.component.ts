import { Component, OnInit } from '@angular/core';
import { AuthGuard } from './auth-guard.service';
import { OrderDetail } from './model/orderDetail.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  badgeNo!: any;
 constructor(private authService:AuthGuard){
  this.authService.orderCart.subscribe((order)=>
  //
  {
    this.badgeNo=order;
    console.log('order:'+order+' bagde '+this.badgeNo);
  }
  
  );
  this.authService.orderCartArr.subscribe((order)=>
  //
  {
   console.log(order);
  }
  
  );
 }
 
  title = 'CafeCoffeeDay';
 
  count(event:Event){
    this.badgeNo=event  as unknown as number;
    console.log('nois '+this.badgeNo);

  }
}
