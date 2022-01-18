import { Component, OnInit } from '@angular/core';
import { FoodItem, RestaurantDetails } from 'src/app/models/user';
import { RestaurantrelatedService } from 'src/app/services/restaurantrelated.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-allrestaurants',
  templateUrl: './allrestaurants.component.html',
  styleUrls: ['./allrestaurants.component.css']
})
export class AllrestaurantsComponent implements OnInit {

  allRestaurants: any[]
  restaurantName: RestaurantDetails[] = []
  constructor(private restaurantrelated: RestaurantrelatedService, private userSer: UserService) { }

  ngOnInit(): void {
    let restuaurantList = []
    this.restaurantrelated.getAllRestaurants().subscribe((data: any) => {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        if (data[i].adminblocked == true) {
          restuaurantList.push(data[i])
        }
      }
      this.allRestaurants = restuaurantList
      
      
    }, (error) => {
      console.log("Error");
    });

    this.restaurantrelated.getDeliveryOrder().subscribe((data: any) => {
      console.log(data);
      data.forEach(element => {
        element.userDetails.forEach(x => {
           this.restaurantName.push(x)
        });
      });
      this.allRestaurants.forEach(element => {
           var obj = element
           obj.check = this.restaurantName.filter(x=>x.restaurantName == element.restaurantName).length
           
      });

      console.log(this.allRestaurants);
     


     
    
    });


    //  this.restaurantrelated.deliverOrdersItems().subscribe((data) => {
    //    this.deliveryFood = deserialize<FoodOrders[]>(FoodOrders,data)
    //  for(let x in data)
    //        //    var foodItems = data[x]
    //    for(let value in foodItems.userDetails){
    //     var splitFoodItems = foodItems.userDetails[value]
    //     this.arrayValue.push(splitFoodItems)
    //    }
    //  }   

    // });

    // this.restaurantrelated.allRestaurant().subscribe((data) => {
    //    this.allRestaurants = deserialize<RestaurantDetails[]>(RestaurantDetails,data)
    // });

  }

  blockRestaurant(user: number): void {
    const spliceRestaurant = this.allRestaurants.splice(user, 1);
    spliceRestaurant[0].adminblocked = false
    this.userSer.updatedUser(spliceRestaurant[0]).subscribe((data) => {
      console.log(data);

      //  });
      // for(let x in spliceRestaurant){
      //   var res = spliceRestaurant[x]
      //     res['adminblocked'] = false
      // }

      // console.log(spliceRestaurant);
      // spliceRestaurant[1]['adminblocked'] = false 
      // console.log(spliceRestaurant[1]);
      // console.log(spliceRestaurant);

    });

    //   this.restaurantrelated.blockedRestaurants(spliceRestaurant[0])
    //   this.restaurantrelated.allRestaurant().subscribe((data) => {
    //     var restaurants  = deserialize<RestaurantDetails[]>(RestaurantDetails,data)
    //     for (let i = 0; i < restaurants.length; i++) {
    //       if (restaurants[i].email == spliceRestaurant[0].email) {
    //         restaurants.splice(i, 1)
    //       }
    //     }
    //     this.restaurantrelated.removeItemFromRestaurantAdmin(restaurants);
    //   });
  }

}
