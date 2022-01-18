import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FoodItem, Register, RestaurantDetails } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { RestaurantrelatedService } from 'src/app/services/restaurantrelated.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  totalCartPrice: number = 0
  menusub: Subscription;
  userName: string;
  userRoleId: string;
  cartCount: number = 0;
  myCartFinalPrice: number
  myCartItem: any;
  selectDeliveryBoys: any[] = []
  isShowOrderPlaced: boolean
  finalPrice: number
  placeToOrderButton: boolean = false
  obj: any
  isShowCartItems : boolean;
  succesMsg : boolean;
  constructor(public authSer: AuthService, private router: Router, private restaurantrelated: RestaurantrelatedService) { }

  ngOnInit(): void {
    this.restaurantrelated.getMycartCount().subscribe((data: number) => {
      console.log(data);
      this.cartCount = data;


      this.restaurantrelated.updateCart.subscribe((data: any) => {
    
        this.restaurantrelated.getMycartCount().subscribe((data: number) => {

          this.cartCount = data;
        });
      });
    });
    this.menusub = this.authSer.subject$.subscribe((data: Register) => {
      var userData = data;
      if (data) {
        for (let x in data) {
          var userData = (data[x])
        }
      }
      this.userRoleId = userData.roleId
      this.userName = userData.name
    });

    this.authSer.loggedUser().subscribe((value: any) => {
      if (value) {
        for (let x in value) {
          var userData = (value[x])
        }
        this.userName = userData.name
        this.userRoleId = userData.roleId
      }
    });


    // this.getCartCount();

    //   this.restaurantrelated.cardcount.subscribe((data: number) => {
    //     this.cartCount = data;
    //   });

    // this.menusub =  this.authSer.subject$.subscribe((data:Register) => {
    //    if(data){
    //      for(let x in data){
    //        var userData = (data[x])
    //      }}
    //     this.userRoleId = userData.roleId
    //     this.userName = userData.name
    //   });
    //   this.authSer.loggedUser().subscribe((value: any) => {
    //     if(value){
    //       for(let x in value){
    //         var userData = (value[x])
    //       }
    //       this.userName = userData.name
    //       this.userRoleId = userData.roleId
    //     }
    //     });
  }

  // getCartCount(): void {
  //   this.getCartCountSubscription?.unsubscribe()
  //   this.getCartCountSubscription = this.restaurantrelated.getMyCartItems().subscribe((data:RestaurantDetails) => {
  //     console.log(data);
  //     this.cartCount = 0;
  //     for (let x in data) {
  //       const count = data[x].cartQty
  //       data[x].cartQty++;
  //       this.cartCount += Number(count);
  //       this.restaurantrelated.cardcount.next(this.cartCount)
  //     }
  //   });
  // }

  cartItem(): void {
    this.isShowCartItems = true;
    this.isShowOrderPlaced = false;
    this.restaurantrelated.getMycartItems().subscribe((data: FoodItem) => {
      this.myCartItem = data;
      this.myCartFinalPrice = 0;
      this.myCartItem.forEach(element => {
        this.totalCartPrice = this.totalCartPrice + (element.cartQty * element.foodPrice)
      });
    });

    this.authSer.getUsers().subscribe((data: any) => {
      data.forEach(element => {
        if (element.roleId == '3') {
          this.selectDeliveryBoys.push(element.name)
        }
      });
    });

    //   this.restaurantrelated.getMyCartItems().subscribe((data:FoodItem[]) => {
    //     console.log(data);

    //     this.myCartFinalPrice = 0;
    //     for (let x in this.myCartItem) {
    //       const finalCartItem = this.myCartItem[x].foodPrice
    //       const quantyItem = this.myCartItem[x].cartQty
    //       const cartNum = Number(finalCartItem) * quantyItem
    //       this.myCartFinalPrice += cartNum
    //     }
    //   });
  }

  updateCartItems(cartId: number, cartQty: number, foodPrice: number): void {
    var currentFoodPrice = foodPrice
    console.log(currentFoodPrice);
    this.restaurantrelated.updateMyCartItems(cartId, cartQty, foodPrice).subscribe((data: string) => {
      console.log("data" + data);
      var index = this.myCartItem.findIndex((obj) => {
        return obj._id == cartId;``
      });
      console.log(index);
      this.myCartItem[index].cartQty = cartQty;
      console.log(this.myCartItem[index].cartQty)
      // this.myCartItem[index].foodPrice = cartQty*currentFoodPrice;
      console.log(this.myCartItem[index].foodPrice)
      this.myCartFinalPrice = 0;
      this.totalCartPrice = 0;
      //  for(let x in this.myCartItem){
      //   this.myCartFinalPrice =  this.myCartFinalPrice += this.myCartItem[x].cartQty*currentFoodPrice;
      //  }

      this.myCartItem.forEach(element => {
        this.totalCartPrice = this.totalCartPrice + (element.cartQty * element.foodPrice)
      });

    });
    //   for (let i = 0; i < this.myCartItem.length; i++) {
    //     if (this.myCartItem[i].foodName == cart.foodName) {
    //       const finalCartItem = this.myCartItem[i].foodPrice
    //       this.myCartItem[i].cartQty++;
    //       this.myCartFinalPrice += Number(finalCartItem);
    //       this.restaurantrelated.getMyCartItems().subscribe((data: FoodItem) => {
    //         if (data) {
    //           this.cartCount++
    //         }
    //       });
    //     }
    //     this.restaurantrelated.updatedMycartItems(this.myCartItem)
    //   }

  }

  selectDeliveryBoy(user: RestaurantDetails) {
    this.placeToOrderButton = true;
    this.restaurantrelated.getMycartItems().subscribe((data: FoodItem) => {
      this.obj = {
        userName: this.userName,
        deliveryBoyName: user,
        registerDate: Date.now(),
        userDetails: data
      }
    });

  }


  placeToOrder(): void {
     this.succesMsg = true;
    this.restaurantrelated.placeOrderDetails(this.obj).subscribe((data: FoodItem) => {
      console.log(data);
      this.restaurantrelated.deleteCartItem().subscribe((data) => {
        console.log(data);
        this.restaurantrelated.getMycartCount().subscribe((data: number) => {
          this.cartCount = data;
        });
      }); 
    });



    //  this.restaurantrelated.getDeliveryBoy().subscribe((data:FoodItem)=>{
    //     this.selectDeliveryBoys = data;

    //  });

    //   this.restaurantrelated.allUsers().subscribe((data:RestaurantDetails) => {
    //     console.log(data);
    //     const allUsers = data;
    //     for (let user in allUsers) {
    //       if (allUsers[user].roleId == '3') {
    //         const deliveryBoy = allUsers[user]
    //         this.selectedDeliveryBoy.push(deliveryBoy)
    //       }
    //     }
    //   });
  }

  doLogOut(): void {
    this.authSer.send("!userRoleId");
    this.authSer.logOut();
    this.router.navigate(["/"])
  }

}
