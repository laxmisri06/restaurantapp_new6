import { Component, OnInit } from '@angular/core';
import { FoodItem } from 'src/app/models/user';
import { RestaurantrelatedService } from 'src/app/services/restaurantrelated.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-allfood',
  templateUrl: './allfood.component.html',
  styleUrls: ['./allfood.component.css']
})
export class AllfoodComponent implements OnInit {

  foodArray : FoodItem;
 
  constructor(private restaurantrelated : RestaurantrelatedService, private userSer: UserService) { }

  ngOnInit(): void {
    
    
    this.restaurantrelated.showFood.subscribe((data:FoodItem)=>{
      this.foodArray = data;      
    });
 
  //  this.restaurantrelated.restauratFoodReturn().subscribe((data)=>{
  //    this.foodArray = deserialize<FoodItem[]>(FoodItem,data)
  //    this.foodArray.forEach(element => {
  //      element['addedToCart'] = false;
  //    });
  //  });

  }

  addToCart(cartDetails:FoodItem):void{
   
    this.restaurantrelated.addtoCartItems(cartDetails).subscribe((data:FoodItem)=>{
      console.log(data);
      cartDetails['addedToCart'] = true; 
      this.restaurantrelated.updateCart.next();
    });
   
  }



}
