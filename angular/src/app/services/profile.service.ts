import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../config/url';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  
  constructor(private http:HttpClient,private authserv:AuthService) { }


  token:any = this.authserv.getToken();
  httpAuthOption:any = {
    observe: 'response',
    headers: new HttpHeaders({
      'contentType' : 'application/json',
      'accept' : 'application/json',
      'Authorization' : this.token,
    })
  }


  index():Observable<any>{
    return this.http.get(`${API_URL}profile`,this.httpAuthOption);
  }

  update(data:any):Observable<any>{
    return this.http.put(`${API_URL}profile`,data,this.httpAuthOption);
  }

  delete():Observable<any>{
    return this.http.delete(`${API_URL}profile`,this.httpAuthOption);
  }


}
