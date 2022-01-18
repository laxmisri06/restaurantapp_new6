import { Component, OnInit } from '@angular/core';
import { RestaurantrelatedService } from 'src/app/services/restaurantrelated.service';
import { FoodItem } from 'src/app/models/user';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  deliveryBoyName:string;
  orders : string;
  foodOrders : FoodItem;

  constructor(private restaurantrelated : RestaurantrelatedService) { }

  ngOnInit(): void {
     this.restaurantrelated.getPlaceOrderDetails().subscribe((data:FoodItem)=>{
     this.foodOrders = data;
     });
  }
  

}
