import { Component, OnInit } from '@angular/core';
import {FormGroup,Validators,FormControl, FormControlDirective} from "@angular/forms";
import {Router} from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent implements OnInit {
RequestResetForm!:FormGroup;
forbiddenEmails:any;
errorMessage!:String;
successMessage!:string;
IsValidForm!:boolean;



  constructor(
    private auth:AuthService,
    private router:Router
    ) { }

  ngOnInit(): void {

    this.RequestResetForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
    });
  }


  RequestResetUser(form:any){
    console.log(form)

    if(form.valid){
      this.IsValidForm=true;
      this.auth.requestReset(this.RequestResetForm.value).subscribe(
        (data)=>{
          this.RequestResetForm.reset();
          this.successMessage="Reset password link send to email sucessfully.";
          setTimeout(()=>{
            this.successMessage= '';
            this.router.navigate(['sign-in']);

          },3000)

        },
        (err)=>{
          if(err.error.message){
            this.errorMessage=err.error.message
          }
        }


      )
    }else{
      this.IsValidForm=false;
    }
  }

  get email(){
    return this.RequestResetForm.get('email')
  }

}
