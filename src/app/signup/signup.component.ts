import { Component, OnInit } from '@angular/core';

import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {Router} from '@angular/router'
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

SignupForm!:FormGroup;
forbiddenEmails:any;
errorMessage:any;

  constructor(
private fb:FormBuilder,
private auth:AuthService,
private router:Router

  ) {
   this.buildSignupForm();
  }





  private buildSignupForm(){
    this.SignupForm=this.fb.group({
      userName:[null,[Validators.required]],
      email:[null,[Validators.required,Validators.email,],this.forbiddenEmails],
      password:[null,[Validators.required,Validators.minLength(4)]]
    })
  }

  onSubmit(){
    this.SignupForm.reset();
  }

signupUser(){
this.auth.registerUser(this.SignupForm.value).subscribe(
  (data:any)=>{
    this.SignupForm.reset()
    setTimeout(()=>{
      this.router.navigate(['sign-in']);


    },3000)



  },
  (err:any)=>{
    if(err.error.msg){                          /* may be that error we set in our backend */
      this.errorMessage=err.error[0].msg;

    }
    if(err.error.message){
      this.errorMessage=err.error.message;

    }
  }
);

}

get username(){
  return this.SignupForm.get('username')
}


get email(){
  return this.SignupForm.get('email')
}

get password(){
  return this.SignupForm.get('password')
}



ngOnInit(): void {
}

}
