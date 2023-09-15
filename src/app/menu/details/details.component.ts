import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { elementAt, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { AuthGuard } from 'src/app/auth-guard.service';
import { MenuDetail } from 'src/app/model/menuDetail.model';
import { OrderDetail } from 'src/app/model/orderDetail.model';
import { DbServiceTsService } from 'src/app/service/db-service.ts.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit,OnDestroy {

  sweetner: any = [];
  flavors: any = [];
  dairy: any = [];
  data:any;
  private closed$ = new Subject<any>();

  submitted=false;
  id:any='';
  collection='coffee';
  order_data:OrderDetail[]=[];

  constructor(private formBuilder: FormBuilder, private firebase: AngularFirestore,
    private dbService: DbServiceTsService,private route: ActivatedRoute,private authService:AuthGuard) {  }

  @Input('formGroup') detailForm = this.formBuilder.group({
    flavor: ['Caramel Swirl', [Validators.required]],
    sweetner: ['None', [Validators.required]],
    dairy: ['No Milk', [Validators.required]],
    size: ['', [Validators.required]],
  });

  ngOnInit() {
    this.sweetner = this.dbService.loadDropDownData('sweetner');
    this.flavors = this.dbService.loadDropDownData('flavor');
    this.dairy = this.dbService.loadDropDownData('dairy');
    
    this.id = this.route.snapshot.paramMap.get('id');
  //  console.log(this.id);
   
    this.data=this.dbService.getDetailsByDocId(this.collection,this.id)
   .subscribe(res=>{ 
     this.data=res;
   
    });
    this.authService.order_data_Obs.subscribe(data =>{ this.order_data = data;
    console.log(data);
    });
 
  }

  ngOnDestroy() {
    //this.closed$.next();   // <-- close open subscription(s)
  }
  get f() { return this.detailForm.controls; }

  onSubmit() {
    
   
   
    // stop here if form is invalid
    if (this.detailForm.invalid) {
        return;
    } else{
      this.submitted = true;
     
      let orderData={} as OrderDetail;
      orderData={
        menuId: this.id,
        name: this.data.name,
        size: this.detailForm.value['size'],
         sweetner: this.detailForm.value['sweetner'],
         flavors: this.detailForm.value['flavor'],
         dairy: this.detailForm.value['dairy']
        };
      let orderArr=[];
      orderArr.push(orderData);
   
    
      this.authService.push_orderData(orderData);
   
    }

    
}

 
  
  

}
