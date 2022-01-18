import { Component, OnInit } from '@angular/core';
import { deserialize } from 'serializer.ts/Serializer';
import { FoodOrders, RestaurantDetails } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { RestaurantrelatedService } from 'src/app/services/restaurantrelated.service';

@Component({
  selector: 'app-restaurant-orders',
  templateUrl: './restaurant-orders.component.html',
  styleUrls: ['./restaurant-orders.component.css']
})
export class RestaurantOrdersComponent implements OnInit {
  foodOrders: any[] 
  userLogin : string
  finalArray : any[] = [];
  totalFoodPrice : number = 0;
  restaurantName: any;
  constructor(private restaurantrelated : RestaurantrelatedService, private authSer: AuthService) { }

  ngOnInit(): void {
    let arrayValue = []
    this.authSer.loggedUser().subscribe((data:FoodOrders)=>{
      for(let x in data){
        this.userLogin = data[x].name
      }
      this.restaurantrelated.getPlaceOrderDetails().subscribe((value)=>{
        this.foodOrders = deserialize<FoodOrders[]>(FoodOrders,value)
      for(let x in this.foodOrders)
      {
        var data = this.foodOrders[x]
        for(let value in data.userDetails){
         var data2 = data.userDetails[value]
         arrayValue.push(data2)
        }
      } 
      for(let x in arrayValue)
      {
        if(arrayValue[x].uniqueId == this.userLogin)
        {
          this.finalArray.push(arrayValue[x]);
        }
      }
      });
    });

    
     
     
  }

}
