import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  
  constructor(private formBuilder: FormBuilder) { }
  
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
    console.log('submitted');
    // stop here if form is invalid
    if (this.signupForm.invalid) {
        return;
    }

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.signupForm.value));
}
}
