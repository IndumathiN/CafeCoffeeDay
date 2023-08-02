import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TouchedErrorStateMatcher } from 'src/app/touched-error-state.matcher';
@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
export class PriceComponent {
  local_data:any;
  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<PriceComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: {small:number,medium:number,large:number}) {
   // console.log(data);
   
    this.local_data = {...data};
  }
  matcher = new TouchedErrorStateMatcher();
  priceForm = this.fb.group({
    small: ['', Validators.required],
    medium: ['', Validators.required],
    large: ['', [Validators.required]]
});
get f() { return this.priceForm.controls; }

addPrice(){
  console.log("add");
  if(this.priceForm.valid) {
    this.dialogRef.close(this.priceForm.value);
}   else{
  return;
} 
}
  close(): void {
    this.dialogRef.close();
  }
}
