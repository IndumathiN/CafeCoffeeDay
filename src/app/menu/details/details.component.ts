import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { MenuDetail } from 'src/app/model/menuDetail.model';
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

  id:any='';
  collection='coffee';
  constructor(private formBuilder: FormBuilder, private firebase: AngularFirestore,
    private dbService: DbServiceTsService,private route: ActivatedRoute) {  }

  @Input('formGroup') detailForm = this.formBuilder.group({
    flavor: ['', [Validators.required]],
    sweetner: ['None', [Validators.required]],
    dairy: ['No Milk', [Validators.required]],
    size: ['', [Validators.required]],
  });

  ngOnInit() {
    this.sweetner = this.dbService.loadDropDownData('sweetner');
    this.flavors = this.dbService.loadDropDownData('flavor');
    this.dairy = this.dbService.loadDropDownData('dairy');
    
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
   
    this.data=this.dbService.getDetailsByDocId(this.collection,this.id)
    // .pipe(tap(data => {
    //   // here you can do what you plan to to do inside getWrapperGridData
    //  this.getValue(data); 
    //  }))
   .subscribe(res=>{ 
     this.data=res;
    this.getValue(); 
    });
    
  // this.dbService.getDetailsByDocId(this.collection,this.id).toPromise().then((res)=>{this.data=res; console.log(this.data); });
    // this.dbService.getDetailsByDocId(this.collection,this.id).pipe(
    //   takeUntil(this.closed$)
    // ).subscribe({
    //   next: (data: any) => { console.log(data);
    //     this.data = data;
    //     // other statements that depend on `this.userProfile`
    //   }
    // });


    console.log("ngOnInit ",this.data);
  }

  ngOnDestroy() {
    //this.closed$.next();   // <-- close open subscription(s)
  }
  onSubmit() {

  }

  getValue(){
    // this.data=data;
   console.log("getValue ",this.data);
   
  }
  
  getData() {
     this.firebase.collection('coffee').doc('5KG3eeYHGcm2rVrtXrcA').snapshotChanges().pipe(tap(res => {
     let detail= { id: res.payload.id, ...res.payload.data() };
    // console.log(detail);
     return detail;
    
   }));
  }
  getDatabyId() {
    let detail:any;
     this.firebase.collection('coffee').doc('5KG3eeYHGcm2rVrtXrcA').snapshotChanges().subscribe(
      res => {
         detail= { id: res.payload.id, ...res.payload.data() };
       // console.log(detail);
        return detail;
       
      },
      err => {
        console.debug(err);
      }
    )
    ///return detail;
    
  }

}
