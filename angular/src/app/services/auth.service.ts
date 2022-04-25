import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

import { API_URL } from '../config/url';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,private router:Router) { }

  subject = new Subject<any>();
  httpOption:any = {
    observe: 'response',
    headers:new HttpHeaders({
      'contentType' : 'application/json',
      'accept' : 'application/json',
    })
  }
  token:any = this.getToken();
  httpAuthOption:any = {
    observe: 'response',
    headers:new HttpHeaders({
      'contentType' : 'application/json',
      'accept' : 'application/json',
      'authorization' : this.token,
    })
  }

  login(data:any){
    return this.http.post(`${API_URL}login`,data, this.httpOption);
  }
  register(data:any){
    return this.http.post(`${API_URL}register`,data,this.httpOption);
  }



    /** check user logged in */
    isLoggedIn(){
      const data = localStorage.getItem('_token');
      if(!data){
        this.subject.next({isLoggedIn:false});
        localStorage.setItem('isLoggedIn','false');
        return false;
      }
      this.subject.next({isLoggedIn:true});
      localStorage.setItem('isLoggedIn','true');
      return true;
    }
  
    getToken(){
      return localStorage.getItem('_token');
    }
  
    getUser():any{
      try{
        let token:any = localStorage.getItem('_token');
        return jwt_decode(token);
      }
      catch(ex){
        return false;
      }
    }
  
  
    getSubjectNav():Observable<any>{
      return this.subject.asObservable()
    }
  
    logout(){
      this.http.post(`${API_URL}logout`,'',this.httpAuthOption);
      this.subject.next({isLoggedIn:false});
      localStorage.removeItem('_token');
      localStorage.removeItem('isLoggedIn');
    }


}
