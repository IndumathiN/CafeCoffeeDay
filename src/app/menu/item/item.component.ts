import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PriceComponent } from 'src/app/dialog/price/price.component';
import { DbServiceTsService } from 'src/app/service/db-service.ts.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  constructor(private formBuilder: FormBuilder,private firebase:AngularFirestore,
    private dbService:DbServiceTsService,public dialog: MatDialog) { }

  itemForm = this.formBuilder.group({
    name: ['', Validators.required],
    calories: ['', Validators.required],
    category: ['', [Validators.required]],
    image:[''],
    description:[''],
    dairy: [false],
    flavor: [false],
    sweetner: [false]
});

get f() { return this.itemForm.controls; }

onSubmit(){
  if (this.itemForm.invalid) {
    return;
}
let itemData={
  name:this.itemForm.value['name'],
  calories:this.itemForm.value['calories'],
  category:this.itemForm.value['category'],
  image:this.itemForm.value['image'],
  description:this.itemForm.value['description'],
  dairy:this.itemForm.value['dairy'],
  flavor:this.itemForm.value['flavor'],
  sweetner:this.itemForm.value['sweetner'],
  pricelist:this.pricelist
};
const colName=this.itemForm.value['category'];
this.dbService.addData(colName,itemData);
this.itemForm.reset();
  
}

  small_price: number | undefined;
  medium_price: number | undefined;
  large_price: number | undefined;
  pricelist:any;
openDialog(): void {
  const dialogRef = this.dialog.open(PriceComponent,{width:'500px',
                    data: {small:this.small_price,medium:this.medium_price,large:this.large_price}
                  });

  dialogRef.afterClosed().subscribe(result => {
    
    this.pricelist=result;
    
  });
}

}
