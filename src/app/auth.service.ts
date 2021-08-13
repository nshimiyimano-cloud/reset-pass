import { Injectable } from '@angular/core';

import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';

Injectable({
  providedIn: 'root'
})

const BASEURL = 'http://localhost:3000/api/resetpassword';

export class AuthService {

  constructor(private Http:HttpClient) { }





  registerUser(body:any):Observable<any>{
    return this.Http.post(`${BASEURL}/register`,body);
  }

  loginUser(body:any):Observable<any>{
    return this.Http.post(`${BASEURL}/login`,body);
  }


  requestReset(body:any):Observable<any>{
    return this.Http.post(`${BASEURL}/req-reset-password`,body);
  }


  newPassword(body:any):Observable<any>{
    return this.Http.post(`${BASEURL}/new-password`,body);
  }

  validPasswordToken(body:any):Observable<any>{
    return this.Http.post(`${BASEURL}/valid-password-token`,body);
  }


}
