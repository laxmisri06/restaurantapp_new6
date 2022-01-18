import { Component, OnInit } from '@angular/core';
import { FoodItem } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { RestaurantrelatedService } from 'src/app/services/restaurantrelated.service';

@Component({
  selector: 'app-restaurant-associates',
  templateUrl: './restaurant-associates.component.html',
  styleUrls: ['./restaurant-associates.component.css']
})
export class RestaurantAssociatesComponent implements OnInit {
  userName : string
  deliveryBoyName : string
  restaurantArray :any[] 
  constructor(private restaurantrelated : RestaurantrelatedService, private authSer: AuthService) { }

  ngOnInit(): void {

    this.authSer.loggedUser().subscribe((data)=>{
      data.forEach(element => {
        this.userName =element.name
      });
    });
    this.restaurantrelated.getPlaceOrderDetails().subscribe((data:any) => {
      console.log(data);
       data.forEach(element => {
        this.deliveryBoyName = element.deliveryBoyName
       });
         1
        if(this.userName == this.deliveryBoyName){
          this.restaurantArray = data
          console.log(this.restaurantArray);
        }
    });
}
}
