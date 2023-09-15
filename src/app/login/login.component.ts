import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthGuard } from '../auth-guard.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private formBuilder: FormBuilder,private firebase:AngularFirestore,
              private route:ActivatedRoute,private router: Router,
              private authService:AuthGuard) { }
  
  hide = true;
  submitted=false;

  signupForm = this.formBuilder.group({
   
    email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    password: ['', [Validators.required, Validators.minLength(8)]]
   
});

get f() { return this.signupForm.controls; }

  onSubmit() {
    
    this.submitted = true;
    console.log('submitted');
    // stop here if form is invalid
    if (this.signupForm.invalid) {
        return;
    }
   //  this.authService.userDetails.next();
   let email:any=this.signupForm.value['email'];
   let f_password:any=this.signupForm.value['password'];
   this.firebase.collection("signupDetails").doc(email).ref.get().then( (doc) => {
    if (doc.exists) {
      const password=doc.get('password');
      if(password==f_password){
        this.router.navigate(['/signup']);
      }
      else{
        alert("Incorrect Password");
      }
     
      
      
     
    } else {
      alert("No such user!!!");
     
  
    
    }
  }).catch(function (error) {
    console.log("There was an error getting your document:", error);
  });
    
}
}
