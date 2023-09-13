import { Component, OnInit } from '@angular/core';
import { getDatabase, onValue, ref, set } from '@angular/fire/database';
import { AbstractControl, FormBuilder, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Items } from '../model/menu_items.model';
import { getFirestore, QueryDocumentSnapshot, SnapshotOptions, WithFieldValue } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { DbServiceTsService } from '../service/db-service.ts.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  isConstructorCalled = false;
  constructor(private formBuilder: FormBuilder,private firebase:AngularFirestore,private route: ActivatedRoute,private dbService:DbServiceTsService) { 
    console.log("constructor")
    console.log(this.firebase)


    this.isConstructorCalled = true
  }

 
 coffee: Observable<Items[]> | undefined;

 collection_name='signupDetails';
 
  

  ngOnInit() {
  console.log("ngOninit")
// this.firebase.collection('coffee').get().forEach((qSnapshot) => {console.log(qSnapshot.docs.forEach(d => console.log(d.id, d.data()))) })
// this.firebase.collection('coffee').snapshotChanges().forEach(a => {
//   console.log(a.forEach(a1 => {
//     console.log(a1.type)
//     console.log(a1.payload.doc.data())
//  }))
// })
console.log(this.route.snapshot.data['id']);
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
  show=true;
  submitted=false;
  emailExists:any='';
  check=false;

  signupForm = this.formBuilder.group({
    f_name: ['', Validators.required],
    l_name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    password: ['', [Validators.required, Validators.minLength(8),this.createPasswordStrengthValidator()]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    mobile_no: ['', [Validators.required]]
});


createPasswordStrengthValidator(): ValidatorFn {
  return (control:AbstractControl) : ValidationErrors | null => {

      const value = control.value;
     
      if (!value) {
          return null;
      }

      const hasUpperCase = /[A-Z]+/.test(value);

      const hasLowerCase = /[a-z]+/.test(value);

      const hasNumeric = /[0-9]+/.test(value);

      const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;
      
      return !passwordValid ? {passwordStrength:true}: null;
  }
}

confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return password && confirmPassword && password.value === confirmPassword.value ? { confirmPassword: true } : null;
};

emailCheck(email:any){
 
  this.firebase.collection("signupDetails").doc(email).ref.get().then( (doc) => {
    if (doc.exists) {
      console.log(doc.data());
      this.emailExists='Already exists';
      this.check=false;
    } else {
      console.log("There is no document!");
      this.emailExists='Valid';
      this.check=true;
    }
  }).catch(function (error) {
    console.log("There was an error getting your document:", error);
  });

  
console.log(this.emailExists, "  status " ,this.check);
 
  console.log(email);

}
  get f() { return this.signupForm.controls; }

  onSubmit() {
    
    this.submitted = true;
    
    // stop here if form is invalid
    if (this.signupForm.invalid || this.check==false) {
        return;
    }


    let signupData={
      fname:this.signupForm.value['f_name'],
      lname:this.signupForm.value['l_name'],
      email:this.signupForm.value['email'],
      password:this.signupForm.value['password'],
      mobile:this.signupForm.value['mobile_no'],
    };

  //   this.firebase.collection("signupDetails").add(signupData)
  // .then((docRef) => {
  //     console.log("Document written with ID: ", docRef.id);
  // })
  // .catch((error) => {
  //     console.error("Error adding document: ", error);
  // });
let docName:any=this.signupForm.value['email'];

this.dbService.addDataCustomDoc(this.collection_name,docName,signupData);

this.signupForm.reset();
alert('Success');
  // this.firebase.collection("signupDetails").doc(docName).set(signupData)
  // .then((docRef) => {
  //     console.log("Document written with ID: ", docRef);
  // })
  // .catch((error) => {
  //     console.error("Error adding document: ", error);
  // });

    // this.writeData(this.signupForm.value['f_name'],this.signupForm.value['email']);
    // console.log(this.signupForm.value['email']);
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.signupForm.value));
}
}
function push(arg0: Promise<void>) {
  throw new Error('Function not implemented.');
}



