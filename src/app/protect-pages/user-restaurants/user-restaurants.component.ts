import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FoodItem, RestaurantDetails } from 'src/app/models/user';
import { RestaurantrelatedService } from 'src/app/services/restaurantrelated.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-restaurants',
  templateUrl: './user-restaurants.component.html',
  styleUrls: ['./user-restaurants.component.css']
})
export class UserRestaurantsComponent implements OnInit {

  allRestaurants: any;
  restaurantView: FoodItem
  captureForms : FormGroup
  restaurantIndexNumber: number;
  constructor(private restaurantrelated: RestaurantrelatedService, private router: Router, public userSer: UserService) { }

  ngOnInit(): void {
    let restuaurantList = []
    this.restaurantrelated.getAllRestaurants().subscribe((data:any) => {
      console.log(data);
      for(let i=0; i<data.length; i++){
        if(data[i].adminblocked == true){
          restuaurantList.push(data[i])
        }
      }
      this.allRestaurants = restuaurantList
    });
    console.log(this.allRestaurants);

    this.captureForms = new FormGroup({
      'name' : new FormControl()
    });
  }

  blockRestaurant(data: number): void {
    this.restaurantIndexNumber = data;
    //console.log(data);
    // var blockedRestaurant = this.allRestaurants.splice(data, 1);
    // this.restaurantrelated.userBlockedRestaurants(blockedRestaurant[0]);
    // this.restaurantrelated.allRestaurant().subscribe((data: any[]) => {
    //   var restaurants = data;
    //   for (let i = 0; i < restaurants.length; i++) {
    //     if (restaurants[i].email == blockedRestaurant[0].email) {
    //       restaurants.splice(i, 1)
    //     }
    //   }
    //   this.restaurantrelated.removeItemFromRestaurantAdmin(restaurants);
    // });

  }

  showRestaurantsList(user: RestaurantDetails) {
    let restuaranFood = []
    const currentUser = user.name
    console.log(currentUser);
    this.restaurantrelated.getFoodItems().subscribe((data: any) => {
      data.forEach(element => {
        restuaranFood.push(element);
      });
      console.log(restuaranFood);
      const restaurantView = restuaranFood.filter(id => id.uniqueId == currentUser)
      this.restaurantrelated.showFood.next(restaurantView);
      this.router.navigate(["/allfood"])
    });


    // this.restaurantrelated.foodDetails().subscribe((data: any) => {
    //   var allFoodItems = data;
    //   var restaurantFoods = allFoodItems.filter(view => view.uniqueNum == user.name)
    //    console.log(restaurantFoods);
    //    this.restaurantrelated.restaurantFood(restaurantFoods)
    //   this.router.navigate(["/allfood"]);
    // });
  }

  captureReason(){
    let user = this.restaurantIndexNumber
    const spliceRestaurant = this.allRestaurants.splice(user,1)
    console.log(spliceRestaurant);
    const obj = {
      blockedRestaurant : spliceRestaurant,
      data : this.captureForms.value
    }
    this.restaurantrelated.userBlockedRestaurants(obj).subscribe((data:RestaurantDetails)=>{
      console.log(data);
    spliceRestaurant[0]['active'] = false
    this.userSer.updatedUser(spliceRestaurant[0]).subscribe((data)=>{
      console.log(data);
    });
    });


  }

} 
