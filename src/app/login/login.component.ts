import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthGuard } from '../auth-guard.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DbServiceTsService } from '../service/db-service.ts.service';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private formBuilder: FormBuilder,private firebase:AngularFirestore,
              private route:ActivatedRoute,private router: Router,
              private authService:AuthGuard,
              private dbService:DbServiceTsService,
              private loginService: LoginService) { }
  ngOnInit(): void {
    this.authService.loggedIn.subscribe((status)=>
  
    {
      //this.logStatus=status;
      console.log('status:'+status+' bagde ');
    }
    
    );
  }
  
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

   this.loginService.login(email, f_password).subscribe({next : (res) => {
    console.log(res)
    this.router.navigate(['/signup']);
   }, 
   error: (err) => {
    console.log(err)
    alert("Incorrect Password");
   }})
    
}
}
