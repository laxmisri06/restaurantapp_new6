import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { deserialize } from 'serializer.ts/Serializer';
import { Login, Register } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  userSubmited: boolean;

  constructor(public userSer: UserService, private router : Router, private authSer : AuthService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      "mail": new FormControl("", [Validators.required, Validators.email]),
      "password": new FormControl("", [Validators.required])
    });
  }

  OnLogin(): void {
    this.userSubmited = true;
    if (this.loginForm.valid) {
      const login: Login = {
        email: this.loginForm.value.mail,
        password: this.loginForm.value.password,
      }
       this.userSer.userLogged(login).subscribe((data)=>{
         var userLogged = deserialize<Register>(Register,data)
         if(Object.keys(userLogged).length == 0){
           alert("Invalid login")
         }
         else if (userLogged) {
           console.log(userLogged);
              localStorage.setItem("token", JSON.stringify(userLogged))
              for(let x in userLogged){
                var roleId = userLogged[x].roleId
              }
              this.authSer.send(userLogged)
              if (roleId == '1') {
                this.router.navigate(["allrestaurant"]);
              }
              else if (roleId == '2') {
                this.router.navigate(["myrestaurant"]);
              }
              else if (roleId == '3') {
                this.router.navigate(["orders"]);
              }
              else if (roleId == '4') {
                this.router.navigate(["userRestaurant"]);
              }}
       
       },(error)=>{
         console.log(error); 
       });
    }
  }
}