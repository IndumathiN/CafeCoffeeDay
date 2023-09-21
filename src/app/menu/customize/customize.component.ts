import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthGuard } from 'src/app/auth-guard.service';
import { DbServiceTsService } from 'src/app/service/db-service.ts.service';
import { get } from '@angular/fire/database';
import { MatSelect } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/dialog/delete-dialog/delete-dialog.component';
import { AddDialogComponent } from 'src/app/dialog/add-dialog/add-dialog.component';

@Component({
  selector: 'app-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.css']
})
export class CustomizeComponent {

signupForm: any;
constructor(private formBuilder: FormBuilder,private firebase:AngularFirestore,
  private route:ActivatedRoute,private router: Router,
  private authService:AuthGuard,
  private dbService:DbServiceTsService,
  public dialog: MatDialog) { }

customize=['Dairy','Flavor','Sweetner'];
  @ViewChild('matSelect')
  matSelect!: MatSelect;
  collection_name:any;
  optionSelected=false;
  custom_data:any;
displayedColumns: string[] = ['sno', 'name', 'active','edit'];
dataSource: { id: string; name: string; active: any; }[]=[];
customizeForm = this.formBuilder.group({
  
  
  name: ['', [Validators.required]],
  flavor: ['', [Validators.required]]
 
});

get f() { return this.customizeForm.controls; }

ngAfterViewInit() {
  console.log("ngafterview ");
  this.matSelect.valueChange.subscribe(value => {
    if(value != "") {
    this.optionSelected=true;
    this.custom_data=value;
     // console.log("ngafterview ",value.toLowerCase());
      
      this.collection_name=value.toLowerCase();
      this.loadData(value.toLowerCase());
    }
    //  console.log("selected ", this.custom_data);
     // this.custom_data=data;
  });
}
retrieveData(value:any){
console.log("retrive ",value);
let data=this.loadData(value.toLowerCase());

}
onSubmit(){

}
loadData(doc_name:string){
  let docRef = this.firebase.collection(doc_name).get().toPromise().then(querySnapshot => {
     let details: { sno:number;id: string; name: string; active: any; }[]=[];
     let sno=1;
     querySnapshot?.forEach((doc) => {
         // doc.data() is never undefined for query doc snapshots
         details.push({sno:sno,id:doc.id,name:doc.get('name'),active:doc.get('active')});
         sno++;
        
     });
     
     this.dataSource=details;
     
   });
 }

openDialog(id:string,name:string): void {
  const col_name=this.collection_name;
  const dialogRef = this.dialog.open(DeleteDialogComponent, {
    data: {id: id, name: name, doc:col_name},
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    
  });
}
addDialog(id:string,action:string){
  const col_name=this.collection_name;
  const dialogRef = this.dialog.open(AddDialogComponent, { width: '500px',
    data: { id:id,action:action, collection_name:col_name},
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    
  });
}
}
