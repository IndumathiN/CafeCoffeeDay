import { Component, OnInit } from '@angular/core';
import { getDatabase, onValue, ref, set } from '@angular/fire/database';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Items } from '../model/menu_items.model';
import { getFirestore, QueryDocumentSnapshot, SnapshotOptions, WithFieldValue } from '@angular/fire/firestore';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  constructor(private formBuilder: FormBuilder,private firebase:AngularFirestore) { 
}

 
 coffee: Observable<Items[]> | undefined;


 
  

  ngOnInit() {
  let db=getFirestore();
//  this.coffee= 
//  this.firebase.collection('coffee').valueChanges();
console.log('ngOnInit')
// this.firebase.collection('coffee').add({'cal': '100'})
this.firebase.collection('coffee').get().forEach((qSnapshot) => {console.log(qSnapshot.docs.forEach(d => console.log(d.id, d.data()))) })
// this.coffee= 
this.firebase.collection('coffee').snapshotChanges().forEach(a => {
  console.log(a.forEach(a1 => {
    console.log(a1.type)
    console.log(a1.payload.doc.data())

    

  }))
})

// this.coffee=this.firebase.collection('coffee').snapshotChanges().map(docArray=>{
        
//         return docArray.map(doc=>{
//           return {
//             id:doc.payload.doc.id,
//             name:doc.payload.doc.data().name,
//             calories:doc.payload.doc.data().calories,
//             description:doc.payload.doc.data().description,
//             imgurl:doc.payload.doc.data().imgurl
//             //...doc.payload.doc.data() as Items
//           };
//         });
// });

// .subscribe(result=>{
//   console.log(result);
// });


 }

writeData(user: string | null | undefined,email: string | null | undefined){
  let db=getDatabase();
  set(ref(db,'users'),{
    username:user,
    email:email
  });
}

readData(){
  let db=getDatabase();
  const starCountRef = ref(db, 'users');
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  console.log(data);
  //updateStarCount(postElement, data);
});
}

  
  
  hide = true;
  submitted=false;

  signupForm = this.formBuilder.group({
    f_name: ['', Validators.required],
    l_name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    mobile_no: ['', [Validators.required]]
});

  get f() { return this.signupForm.controls; }

  onSubmit() {
    
    this.submitted = true;
    
    // stop here if form is invalid
    if (this.signupForm.invalid) {
        return;
    }


    let signupData={
      fname:this.signupForm.value['f_name'],
      lname:this.signupForm.value['l_name'],
      email:this.signupForm.value['email'],
      password:this.signupForm.value['password'],
      mobile:this.signupForm.value['mobile_no'],
    };

    this.firebase.collection("signupDetails").add(signupData)
  .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
  })
  .catch((error) => {
      console.error("Error adding document: ", error);
  });

    // this.writeData(this.signupForm.value['f_name'],this.signupForm.value['email']);
    // console.log(this.signupForm.value['email']);
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.signupForm.value));
}
}
function push(arg0: Promise<void>) {
  throw new Error('Function not implemented.');
}



