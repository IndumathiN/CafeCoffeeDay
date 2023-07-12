import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private formBuilder: FormBuilder,private route:ActivatedRoute,private router: Router) { }
  
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

    this.router.navigate(['/signup']);
}
}
