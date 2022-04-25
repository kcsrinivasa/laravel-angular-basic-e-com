import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { API_URL } from '../config/url';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient,private authserv:AuthService) { }

  httpOption:any = {
    observe: 'response',
    headers: new HttpHeaders({
      'contentType' : 'application/json',
      'accept' : 'application/json',
    })
  }

  token:any = this.authserv.getToken();
  httpAuthOption:any = {
    observe: 'response',
    headers: new HttpHeaders({
      'contentType' : 'application/json',
      'accept' : 'application/json',
      'Authorization' : this.token,
    })
  }

  products():Observable<any>{
    return this.http.get(`${API_URL}products`,this.httpOption);
  }
  product(pid:any):Observable<any>{
    return this.http.get(`${API_URL}products/${pid}/details`,this.httpOption);
  }






}
