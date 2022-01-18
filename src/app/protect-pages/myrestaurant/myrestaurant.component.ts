import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FoodItem, Register, RestaurantDetails } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { RestaurantrelatedService } from 'src/app/services/restaurantrelated.service';

@Component({
  selector: 'app-myrestaurant',
  templateUrl: './myrestaurant.component.html',
  styleUrls: ['./myrestaurant.component.css']
})
export class MyrestaurantComponent implements OnInit {

  myFoodForm: FormGroup
  isAddFoodItemsShow: boolean;
  img: string;
  uniquUser: string;
  isShowFoodItems: boolean;
  indexNum: number;
  uniqueRestaurantView: RestaurantDetails[] 
  restaurantName: string;
  editIndex:any;

  constructor(private fb: FormBuilder, private restaurantrelated: RestaurantrelatedService, private authSer: AuthService) { }

  ngOnInit(): void {
    this.authSer.loggedUser().subscribe((data:Register) => {
      for(let x in data){
        var user = data[x]
      }
      this.uniquUser = user.name
      this.restaurantName = user.restaurantName
    });

    this.myFoodForm = this.fb.group({
      restaurantName: [this.restaurantName],
      foodName: [""],
      foodPrice: ["", Validators.pattern("^[0-9]*$")],
      uniqueId: [this.uniquUser],
      foodImage: ["", Validators.required],
      cartQty: [1]
    });
  }

  showAndHideAddfoodItem(): void {
    this.isAddFoodItemsShow = !this.isAddFoodItemsShow
  }


  showRestaurantItems(): void {
    let foodArray = []
    this.isShowFoodItems = !this.isShowFoodItems;
    this.restaurantrelated.getFoodItems().subscribe((data:any) => {
      data.forEach(element => {
         foodArray.push(element);
      });
    this.uniqueRestaurantView =  foodArray.filter(id=>id.uniqueId == this.uniquUser)

      // if (data) {
        // this.foodArray = values;
      //   console.log(this.foodArray)
        // var uniqueUser = this.foodArray.filter(view => view.uniqueId == this.uniquUser)
        // console.log(uniqueUser);
        

      // }
    });
    
  }

  addFood(): void {
    if (this.myFoodForm.valid) {
      var fd = new FormData(); 
      fd.append("foodName", this.myFoodForm.value.foodName);
      fd.append("foodPrice", this.myFoodForm.value.foodPrice);
      fd.append("uniqueId", this.uniquUser);
      fd.append("restaurantName", this.restaurantName);
      fd.append("foodImage", this.img);


      this.restaurantrelated.addFoodItems(fd).subscribe((data:FoodItem)=>{
        console.log(data);
        this.myFoodForm.reset();
      },(error)=>{
        console.log("Error");
      });
      // const foodItem: FoodItem = {
      //   restaurantName: this.restaurantName,
      //   foodName: this.myFoodForm.value.foodName,
      //   foodPrice: this.myFoodForm.value.foodPrice,
      //   uniqueId: this.uniquUser,
      //   cartQty: 1,
      //   foodImage: this.myFoodForm.value.foodImage,
      // }
      // this.foodArray.push(foodItem)
      // for (let i = 0; i < this.foodArray.length; i++) {
      //   if (i == this.foodArray.length - 1) {
      //     this.foodArray[i].foodImage = this.img.name
      //     // this.restaurantrelated.addFoodItems(foodItem)
      //   }
      // }
      // this.myFoodForm.reset();
    }
  }

  editFood(index: number): void {
    this.indexNum = index
    console.log(this.uniqueRestaurantView)
    this.editIndex = this.uniqueRestaurantView[this.indexNum]
    console.log(this.editIndex);
    this.myFoodForm.patchValue(this.editIndex);
  
  }

  updateFood(): void {
    let obj = {
      _id : this.editIndex._id,
      foodName: this.myFoodForm.controls.foodName.value,
      foodPrice: this.myFoodForm.controls.foodPrice.value,
      restaurantName : this.editIndex.restaurantName,
      uniqueId : this.editIndex.uniqueId,
      foodImage:this.img
    }
    this.restaurantrelated.updateFoodItems(obj).subscribe((data:FoodItem)=>{
      console.log(data);
    });

  }

  foodImage(event: any): void {
    this.img = event.target.files[0].name
    console.log(this.img);
  }

}
