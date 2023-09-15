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
  this.authService.no_order.subscribe((order)=>
  
  {
    this.badgeNo=order;
    console.log('order:'+order+' bagde '+this.badgeNo);
  }
  
  );

 }
 
  title = 'CafeCoffeeDay';
 
 
}
