import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Register, RestaurantDetails } from '../models/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = "http://localhost:3000/";

  constructor(private router: Router, private authSer: AuthService, private http : HttpClient) { }

  // addUser(adduser): void {
    
  //   let allUsers = []
  //   if (localStorage.getItem("Users")) {
  //     allUsers = JSON.parse(localStorage.getItem("Users"));
  //     allUsers.push(adduser)
  //   }
  //   else {
  //     allUsers = [adduser];
  //   }
  //   localStorage.setItem("Users", JSON.stringify(allUsers))

  //   if (adduser.roleId == '2') {
  //     let restaurantUser = []
  //     if (localStorage.getItem("restaurantsAdmin")) {
  //       restaurantUser = JSON.parse(localStorage.getItem("restaurantsAdmin") || '[]');
  //       restaurantUser.push(adduser)
  //     }
  //     else {
  //       restaurantUser = [adduser];
  //     }
  //     localStorage.setItem("restaurantsAdmin", JSON.stringify(restaurantUser))

  //   }
  // }

  // userLogin(email: string, password: string) {
  //   const allUsers = JSON.parse(localStorage.getItem('Users') || '[]');
  //   const user = allUsers.find(user => user.email === email && user.password === password);
  //   if (user) {
  //     console.log(user);
  //      localStorage.setItem('LoggedUser', JSON.stringify(user))
  //      this.authSer.send(user)
  //     if (user.roleId == '1') {
  //       this.router.navigate(["allrestaurant"]);
  //     }
  //     else if (user.roleId == '2') {
  //       this.router.navigate(["myrestaurant"]);
  //     }
  //     else if (user.roleId == '3') {
  //       this.router.navigate(["orders"]);
  //     }
  //     else if (user.roleId == '4') {
  //       this.router.navigate(["userRestaurant"]);
  //     }
  //     return { message: 'Login Successfull.', user }

  //   } else {
  //     alert("Invalid Login");
  //     return { message: 'User not found.' }
  //   }
  // }
   
//updateUserlocalstroage
updateUserLogged(editUser){
   localStorage.setItem("token", JSON.stringify(editUser))
 }
  
  //RegisterAPI
  userRegister(addUser:Register){
    return this.http.post<string>(this.apiUrl+"register",addUser)
  }
  //LoginAPI
  userLogged(loginUser){
    return this.http.post<Register[]>(this.apiUrl+"login",loginUser)
  }

  //updateUserAPI
  updatedUser(user){
    console.log(user);
    return this.http.post<Register>(this.apiUrl+"updateUser",user)
  }
  


  
}
