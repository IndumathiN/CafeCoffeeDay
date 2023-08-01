import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DeleteDialogComponent } from 'src/app/dialog/delete-dialog/delete-dialog.component';
import { SignupDet } from 'src/app/model/signupdetails.model';

@Component({
  selector: 'app-signup-details',
  templateUrl: './signup-details.component.html',
  styleUrls: ['./signup-details.component.css']
})

// export interface SignUpDet{
//     sno:number,
//     id:string,
//     name:string,  
//     mobile:number, 
//     email:string
// }
export class SignupDetailsComponent {

  constructor(private firebase:AngularFirestore,private router: Router,public dialog: MatDialog) { }
  displayedColumns: string[] = ['sno', 'name', 'mobile', 'email','edit'];
  dataSource: { id: string; name: string; mobile: any; email: any; }[]=[];
  //dataSource:SignUpDet[]=[];

 docRef = this.firebase.collection("signupDetails").get().toPromise().then(querySnapshot => {
  let details: { sno:number;id: string; name: string; mobile: any; email: any; }[]=[];
  let sno=1;
  querySnapshot?.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      details.push({sno:sno,id:doc.id,name:doc.get('fname')+' '+doc.get('lname'),mobile:doc.get('mobile'),email:doc.get('email')});
      sno++;
     
  });
  
  this.dataSource=details;
});

openDialog(id:string,name:string): void {
  const dialogRef = this.dialog.open(DeleteDialogComponent, {
    data: {id: id, name: name},
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    
  });
}

getDetails(id:string){
 // this.router.navigate(['signup/']);
 this.router.navigate(
  ['/signup/'],
{queryParams:{id:id}}
);
}

// deleteDetails(id:string){

// this.firebase.collection("signupDetails").doc(id).delete().then(() => {
//     console.log("Document successfully deleted!");
// }).catch((error) => {
//     console.error("Error removing document: ", error);
// });
// }
//det=this.firebase.collection("signupDetails").valueChanges().subscribe((details:SignupDet[])=>{fetchDetails.next(details)});


}
