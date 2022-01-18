import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private subject = new Subject()
  subject$ = this.subject.asObservable()
  
  apiUrl = "http://localhost:3000/";

  constructor(private http : HttpClient) {}

  send(data) {
    console.log(data);
    this.subject.next(data);
  }

 
  //localstroge token data
  loggedUser():Observable<any>{
    return of(JSON.parse(localStorage.getItem("token")));
  }

  getLoggedUser(){
    return of(JSON.parse(localStorage.getItem("user")));
  }

  getUsers(){
    return this.http.get(this.apiUrl+"getUsers")
  }


  logOut() {
    localStorage.removeItem("token")
  }




}
