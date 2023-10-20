import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthGuard } from '../auth-guard.service';
import { DeleteDialogComponent } from '../dialog/delete-dialog/delete-dialog.component';
import { OrderDetail } from '../model/orderDetail.model';
import { DbServiceTsService } from '../service/db-service.ts.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {

 cart_order!: OrderDetail[];
cart:OrderDetail[]=[
  {
    menuId: '9oYLiNZSRveoN2nhKgxv',
    name: 'Machiato',
    size:'Small',
    sweetner:'Stevia',
    quantity:1,
    flavors:'Caramel Swirl',
    dairy:'Skimmed Milk',
    image:'https://api.time.com/wp-content/uploads/2016/01/latte-macchiato-starbucks.jpg',
    price:'1.23'
  },
  {
    menuId: 'xe3oFLqLVohkba9OZ4EE',
    name: 'Iced Coffee',
    size:'Small',
    sweetner:'Stevia',
    quantity:1,
    flavors:'Caramel Swirl',
    dairy:'Skimmed Milk',
    image:'https://images.ctfassets.net/v601h1fyjgba/4GLzOncHIe8rq3xY099cZ/dd17ce72ebb6fb01659c763fe64953db/Iced_Latte.jpg',
    price:'2.33'

  }
];
  constructor(private authService: AuthGuard,
    private route: ActivatedRoute, private router: Router,
    private dbService:DbServiceTsService,
    public dialog: MatDialog) {
    this.authService.order_data.subscribe((order) => {
   
     this.cart_order=order;

    });

}
openDialog(index:number): void {
  console.log(index);
  this.cart.splice(index, 1);
 // this.cart=this.cart.filter((_, index) => index !== index);
  this.authService.rearrange_orderData(this.cart);
 console.log(this.cart);
}
}
