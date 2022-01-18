import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RestaurantrelatedService } from 'src/app/services/restaurantrelated.service';

@Component({
  selector: 'app-schedule-order',
  templateUrl: './schedule-order.component.html',
  styleUrls: ['./schedule-order.component.css']
})
export class ScheduleOrderComponent implements OnInit {

  userName: string
  deliveryBoyName: string
  restaurantName: any[]
  deliveryOrder: any[] = []
  
  constructor(private authSer: AuthService, private restaurantrelated: RestaurantrelatedService) { }

  ngOnInit(): void {
    this.authSer.loggedUser().subscribe((data) => {
      data.forEach(element => {
        this.userName = element.name
      });
    });

    this.restaurantrelated.getPlaceOrderDetails().subscribe((data: any) => {
      data.forEach(element => {
        this.deliveryBoyName = element.deliveryBoyName
      });
      if (this.userName == this.deliveryBoyName) {
        this.restaurantName = data
      }
    });


  }

  markAsOrder(data: any): void {
    data['markAsDelivered'] = true;
    var obj = data;
    obj.deliveryTime = Date.now()
    this.deliveryOrder.push(data)
    this.restaurantrelated.deliveryOrder(this.deliveryOrder).subscribe((data) => {
      console.log(data);
    });
  
  }

}
