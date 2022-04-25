import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../config/url';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

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
    return this.http.get(`${API_URL}order`,this.httpAuthOption);
  }

  store(data:any):Observable<any>{
    return this.http.post(`${API_URL}order`,data,this.httpAuthOption);
  }
  show(oid:any):Observable<any>{
    return this.http.get(`${API_URL}order/${oid}`,this.httpAuthOption);
  }







}
