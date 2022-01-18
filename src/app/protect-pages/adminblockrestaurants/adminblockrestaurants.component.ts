import { Component, OnInit } from '@angular/core';
import { RestaurantDetails } from 'src/app/models/user';
import { RestaurantrelatedService } from 'src/app/services/restaurantrelated.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-adminblockrestaurants',
  templateUrl: './adminblockrestaurants.component.html',
  styleUrls: ['./adminblockrestaurants.component.css']
})
export class AdminblockrestaurantsComponent implements OnInit {

    blockedRestauant: RestaurantDetails[]

  constructor(private useSer : UserService , private restaurantrelated : RestaurantrelatedService) { }

  ngOnInit(): void {
    let restuaurantList = []
    this.restaurantrelated.getAllRestaurants().subscribe((data:any)=>{
      for(let i=0; i<data.length; i++){
        if(data[i].adminblocked == false){
          restuaurantList.push(data[i])
        }
      }
      this.blockedRestauant = restuaurantList
    },(error)=>{
       console.log("Error");
    });
    

  //  this.restaurantrelated.getAdminBlockRestaurants().subscribe((data:RestaurantDetails)=>{
  //    this.blockedRestauant = data;
  //    console.log(this.blockedRestauant);
  //  });

  }


  unblockedRestaurant(index:number){
   const unblockedRestuaurantList =  this.blockedRestauant.splice(index,1)
     unblockedRestuaurantList[0].adminblocked = true
     this.useSer.updatedUser(unblockedRestuaurantList[0]).subscribe((data)=>{
       console.log(data);
    });
  }

}
