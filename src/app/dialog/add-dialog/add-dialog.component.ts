import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { CustomData } from 'src/app/model/customData.model';
import { DbServiceTsService } from 'src/app/service/db-service.ts.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent {
  docName!: string;
  id!:string;
  action!:string;
  
  edit_data!:CustomData;
  @ViewChild('name')
  name!: ElementRef;
  @ViewChild('active')
  active!: MatSlideToggle;
  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,private firebase:AngularFirestore,
    private dbService:DbServiceTsService,private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data:{id:string,action:string,collection_name:string}
  ) { 
    this.docName=data.collection_name;
    this.id=data.id;
    this.action=data.action;
    console.log(data.collection_name);
    if(this.action=="Edit"){
    this.dbService.getDetailsByDocId(this.docName,this.id)
   .subscribe((res: any)=>{ 
     this.edit_data=res;
     this.name.nativeElement.value =res.name;
     this.active.checked =res.active;
    console.log(this.edit_data);
    });
  }
  }
 
  form:FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    active:['']
   
  });
  onNoClick(): void {
    this.dialogRef.close();
  }

  addDetails(action:string){
    let doc=this.docName;
    let itemData={
      name:this.form.value['name'],
      active:this.form.value['active']
    }
    console.log("itemsdata ",itemData);
   if(action=="Add"){
    this.dbService.addData(doc,itemData);
   } else{
    this.dbService.updateDoc(this.docName,this.id,itemData);
   }
    
    this.dialogRef.close();
   // console.log("id "+id+" doc "+doc);
   // this.dbService.deleteDocId(id,doc);
    }
}
