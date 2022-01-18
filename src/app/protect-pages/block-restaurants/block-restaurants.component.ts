import { Component, OnInit } from '@angular/core';
import { RestaurantDetails } from 'src/app/models/user';
import { RestaurantrelatedService } from 'src/app/services/restaurantrelated.service';

@Component({
  selector: 'app-block-restaurants',
  templateUrl: './block-restaurants.component.html',
  styleUrls: ['./block-restaurants.component.css']
})
export class BlockRestaurantsComponent implements OnInit {

  constructor(private restaurantrelevant: RestaurantrelatedService) { }

  blockedRestaurants:RestaurantDetails

  ngOnInit(): void {

    this.restaurantrelevant.getUserBlockedRestaurant().subscribe((data:RestaurantDetails)=>{
      this.blockedRestaurants = data
    });

    // this.restaurantrelevant.getAdminBlockRestaurants().subscribe((data:any)=>{
    //   console.log(data);
    //   this.blockedRestaurant = data;
    // },(error)=>{ 
    //   console.log("error");
    // });
 
  }

}
