import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Register } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {

  userGuard : string;

  userRoute : Register;

  constructor(public router: Router ) {
  }
   canActivate(route: ActivatedRouteSnapshot): boolean {
      this.userRoute = JSON.parse(localStorage.getItem("token"));
      for(let x in this.userRoute){
        this.userGuard = this.userRoute[x].roleId
      }
     if (!this.userGuard) {
      this.router.navigate(["/"])
      return false;
    }
     if (route.data.roleId && route.data.roleId != this.userGuard) {
      console.log(this.userGuard);
      if (this.userGuard == '1') {
        this.router.navigate(["allrestaurant"]);
      }
      else if (this.userGuard == '2') {
        this.router.navigate(["myrestaurant"]);
      }
      else if (this.userGuard == '3') {
        this.router.navigate(["orders"]);
      }
      else if (this.userGuard == '4') {
        this.router.navigate(["userRestaurant"])
      }
      return false;
    }
    return !!this.userRoute;
  }

   }
