import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { API_URL } from '../config/url';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

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

  /** RxJS subject */
  private subject = new Subject<any>();

  setCount(count:number){ this.subject.next(count); }

  getCount():Observable<any>{ return this.subject.asObservable(); }

  /** RxJS subscription checkoutTotal */
  private checkoutTotal = new BehaviorSubject({});
  currentcheckoutTotal = this.checkoutTotal.asObservable();
  setCheckoutTotal(checkoutData:any){ this.checkoutTotal.next(checkoutData); }


  index():Observable<any>{
    return this.http.get(`${API_URL}cart`,this.httpAuthOption);
  }

  store(data:any):Observable<any>{
    return this.http.post(`${API_URL}cart`,data,this.httpAuthOption);
  }

  update(cid:any,data:any):Observable<any>{
    return this.http.put(`${API_URL}cart/${cid}`,data,this.httpAuthOption);
  }

  delete(cid:any):Observable<any>{
    return this.http.delete(`${API_URL}cart/${cid}`,this.httpAuthOption);
  }

}
