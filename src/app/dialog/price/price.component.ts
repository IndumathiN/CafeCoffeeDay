import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
export class PriceComponent {
  local_data:any;
  constructor(
    public dialogRef: MatDialogRef<PriceComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: {small:number,medium:number,large:number}) {
   // console.log(data);
    this.local_data = {...data};
    
  }

  close(): void {
    this.dialogRef.close();
  }
}
