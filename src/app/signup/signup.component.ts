import { Component, OnInit } from '@angular/core';
import { getDatabase, onValue, ref, set } from '@angular/fire/database';
import { AbstractControl, FormBuilder, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Items } from '../model/menu_items.model';
import { getFirestore, QueryDocumentSnapshot, SnapshotOptions, WithFieldValue } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { DbServiceTsService } from '../service/db-service.ts.service';
import { AuthGuard } from '../auth-guard.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

 
  constructor(private formBuilder: FormBuilder,private firebase:AngularFirestore,
    private route: ActivatedRoute,
    private dbService:DbServiceTsService,
    public authService:AuthGuard) { 
    


   
  }

 
 

 collection_name='signupDetails';
 
  

  ngOnInit() {
  
console.log(this.route.snapshot.data['id']);

this.authService.mail_exists_Obs.subscribe(data => this.check = data);

this.authService.logged_details.subscribe(data=> console.log(data));


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
      this.authService.check_mail(false);
      this.emailExists='Already exists';
      
     
    } else {
      console.log("There is no document!");
      this.authService.check_mail(true);
     this.emailExists='Valid';
  
    
    }
  }).catch(function (error) {
    console.log("There was an error getting your document:", error);
  });

  


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

 
let docName:any=this.signupForm.value['email'];

this.dbService.addDataCustomDoc(this.collection_name,docName,signupData);

this.signupForm.reset();
alert('Success');
 
}
}
function push(arg0: Promise<void>) {
  throw new Error('Function not implemented.');
}



