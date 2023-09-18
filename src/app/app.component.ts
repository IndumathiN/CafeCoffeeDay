import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
import { OrderDetail } from './model/orderDetail.model';
import { DbServiceTsService } from './service/db-service.ts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  badgeNo!: any;
  logStatus: boolean = false;
  subCollection_id!: string;
  doc_name!:string;
  constructor(private authService: AuthGuard,
    private route: ActivatedRoute, private router: Router,
    private dbService:DbServiceTsService) {
    this.authService.no_order.subscribe((order) => {
      this.badgeNo = order;
      console.log('order:' + order + ' bagde ' + this.badgeNo);
    }

    );

    this.authService.loggedIn.subscribe((status) => {
      this.logStatus = status;
      console.log('status:' + status + ' bagde ' + this.logStatus);
    }

    );

  }
  ngOnInit(): void {
    this.authService.log_subColl_id.subscribe((id) => {
      this.subCollection_id = id;
    });

    this.authService.logged_details.subscribe((details) => {
      this.doc_name = details.email;
    });
  }

  title = 'CafeCoffeeDay';
  setLogStatus() {
    let date=this.authService.date_TO_String(new Date());
    let dataArray={logout:date};
  //  this.dbService.appendDataToSubcollection('signupDetails',this.doc_name,'loggedDetails',dataArray);
    this.dbService.updateDataInSubcollection('signupDetails',this.doc_name,'loggedDetails',this.subCollection_id,dataArray).then(() => {
      this.authService.check_loggedIn(false);

    this.router.navigate(['/login']);
    })
    .catch((error) => {
      console.error('Error updating document in subcollection:', error);
    });
    
  }

}
