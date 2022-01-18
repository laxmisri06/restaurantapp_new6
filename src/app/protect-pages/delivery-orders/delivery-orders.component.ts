import { Component, OnInit } from '@angular/core';
import { RestaurantDetails } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { RestaurantrelatedService } from 'src/app/services/restaurantrelated.service';

@Component({
  selector: 'app-delivery-orders',
  templateUrl: './delivery-orders.component.html',
  styleUrls: ['./delivery-orders.component.css']
})
export class DeliveryOrdersComponent implements OnInit {

  userName: string;
  finalUser: RestaurantDetails[] = []
  deliveryTime: number;

  constructor(private restaurantrelated: RestaurantrelatedService, private authSer : AuthService) { }

  ngOnInit(): void {
    // this.authSer.loggedUser().subscribe((data)=>{
    //   data.forEach(element => {
    //     this.userName = element.name
    //   });
    // });
    // this.restaurantrelated.getDeliveryOrder().subscribe((data:any)=>{
    //   console.log(data);
    //   for(let j=0; j<data.length; j++){
    //     this.deliveryTime = data[j]
    //   }
    //   for(let i=0; i<data.length; i++){
    //     this.deliveryDetails = data[i].orderDetails
    //   }
    //   for(let x=0; x<this.deliveryDetails.length; x++){
    //     this.deliveryBoyName = this.deliveryDetails[x].deliveryBoyName
    //   }
    //   if(this.userName == this.deliveryBoyName){
        this.restaurantrelated.getDeliveryOrder().subscribe((data:any)=>{
          this.finalUser = data;
          console.log(this.finalUser);
        });
      }
}
