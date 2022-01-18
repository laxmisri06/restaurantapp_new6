import { Injectable} from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs'; 
import {HttpClient} from '@angular/common/http';
import { FoodItem, FoodOrders, RestaurantDetails } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class RestaurantrelatedService {

 updateCart = new Subject();

//  paramSource = new BehaviorSubject(null);

//  cardcount = new BehaviorSubject<number>(0);

 showFood = new BehaviorSubject(null)


 apiUrl = "http://localhost:3000/";

  constructor(private http: HttpClient) { 
    
  }

  // deliverOrdersItems(){
  //   return of(JSON.parse(localStorage.getItem("Orders")));
  // }

  // getMyCartItems(){
  //   return of(JSON.parse(localStorage.getItem("cartItems")));
  // }

  placedOrders(){
    return of(JSON.parse(localStorage.getItem("PlacedOrders")));
  }

  // //restaurantFoods
  // restaurantFood(restaurantFoods){
  //   localStorage.setItem("RestaurantFood", JSON.stringify(restaurantFoods));
  // }

  restauratFoodReturn(){
     return of(JSON.parse(localStorage.getItem("RestaurantFood")));
  }

  //deliveryOrders
  
  // deliverOrdersItemsUpdate(deliveryItem){
  //   console.log((deliveryItem));
  //   let footItems = []
  //   if (localStorage.getItem("Orders")) {
  //     footItems = JSON.parse(localStorage.getItem("Orders"));
  //     console.log(footItems);
  //     footItems.push(deliveryItem)
  //   }
  //   else {
  //     footItems = [deliveryItem];
  //   }
  // localStorage.removeItem("cartItems");
  // localStorage.setItem("Orders", JSON.stringify(footItems))
  // }
  


  // addToMyCart(foodPrice:any){
  // let footItems = []
  //   if (localStorage.getItem("cartItems")) {
  //     footItems = JSON.parse(localStorage.getItem("cartItems"));
  //     footItems.push(foodPrice)
  //   }
  //   else {
  //     footItems = [foodPrice];
  //   }
  // localStorage.setItem("cartItems", JSON.stringify(footItems))
  // }

  //updateing Cart Items

  // updatedMycartItems(cartItem:any){
  //  localStorage.setItem("cartItems", JSON.stringify(cartItem))
  // }

  
 //addFoodItems 
  // addFoodItems(addFood) {
  //   let footItems = []
  //   if (localStorage.getItem("foodItems")) {
  //     footItems = JSON.parse(localStorage.getItem("foodItems"));
  //     footItems.push(addFood)
  //   }
  //   else {
  //     footItems = [addFood];
  //   }
  // localStorage.setItem("foodItems", JSON.stringify(footItems))
  // }

  //updateFoodItems
  // updatedFood(food){
  //   localStorage.setItem("foodItems", JSON.stringify(food))
  // }

  adminBlockedRestaurants(spliceRestaurant){
    let blockrestaurants = []
    if(localStorage.getItem("adminBlockedRestaurant")){
      blockrestaurants = JSON.parse(localStorage.getItem("adminBlockedRestaurant"));
      blockrestaurants.push(spliceRestaurant);
    }
    else{
      blockrestaurants = [spliceRestaurant];
    }
    localStorage.setItem("adminBlockedRestaurant", JSON.stringify(blockrestaurants))
  }

  // adminBlockedRestaurant(){
  //   return of((JSON.parse(localStorage.getItem("adminBlockedRestaurant"))));
  // }

  // userBlockedRestaurants(restaurants){
  //   let blockrestaurants = []
  //   if(localStorage.getItem("userBlockedRestaurant")){
  //     blockrestaurants = JSON.parse(localStorage.getItem("userBlockedRestaurant"));
  //     blockrestaurants.push(restaurants);
  //   }
  //   else{
  //     blockrestaurants = [restaurants];
  //   }
  //   localStorage.setItem("userBlockedRestaurant", JSON.stringify(blockrestaurants))
  // }

  // usersBlockRestaurant(){
  //   return of(JSON.parse(localStorage.getItem("userBlockedRestaurant")));
  // }

  //adminBlockedRestaurant

  // blockedRestaurants(restaurants){
  //   let blockrestaurants = []
  //   if(localStorage.getItem("adminBlockedRestaurant")){
  //     blockrestaurants = JSON.parse(localStorage.getItem("adminBlockedRestaurant"));
  //     blockrestaurants.push(restaurants);
  //   }
  //   else{
  //     blockrestaurants = [restaurants];
  //   }
  //   localStorage.setItem("adminBlockedRestaurant", JSON.stringify(blockrestaurants))
  // }

  //remove item from restaurantadmin also

  // removeItemFromRestaurantAdmin(restaurants){
  //   localStorage.setItem("restaurantsAdmin", JSON.stringify(restaurants))
  // }

  // allBlockedRestaurants():Observable<any>{
  //   return of(JSON.parse(localStorage.getItem("BlockedRestaurant")));
  // }

  // allUsers(): Observable<any> {
  //   return of(JSON.parse(localStorage.getItem("Users")));
  // }

  // foodDetails() {
  //   return of(JSON.parse(localStorage.getItem("foodItems")));
  // }

  // allRestaurant(): Observable<any> {
  //   return of(JSON.parse(localStorage.getItem("restaurantsAdmin")));
  // }




//===============================================================================//
 
  //allrestaurantAPI
  getAllRestaurants(){
    return this.http.get<RestaurantDetails>(this.apiUrl+"getallrestaurants")
  }

  //Admin BlockrestaurantsAPI
  adminBlockRestaurants(blockrestauarnat){
    return this.http.post(this.apiUrl+"adminBlockRestauarnts",blockrestauarnat)
  }

//getBlockrestaurantAPI
  getAdminBlockRestaurants(){
  return this.http.get<RestaurantDetails>(this.apiUrl+"getadminBlockRestaurant")
   }

   //addFoodItemsAPI
  addFoodItems(addFood){
    return this.http.post<FoodItem>(this.apiUrl+"addFoodItems", addFood)
  }


  //getFoodItemsAPI
  getFoodItems(){
    return this.http.get<FoodItem>(this.apiUrl+"getFoodItems")
  }

  //addtoCartItemsAPI
  addtoCartItems(addtocart:any){
     return this.http.post<FoodItem>(this.apiUrl+"addFoodtoCart", addtocart)
  }
 
  //getMycartCountAPI
  getMycartCount(){
    return this.http.get<number>(this.apiUrl+"getMycartCount");
  }

  //getMycartItemsAPI
  getMycartItems(){
    return this.http.get<FoodItem>(this.apiUrl+"getMycartItems");
  }

  //updateMyCartItemsAPI
   updateMyCartItems(cartId:number, cartQty:number, foodPrice:number){
      return this.http.put<string>(this.apiUrl+"updateMycartItems", {cartId:cartId,cartQty:cartQty,foodPrice:foodPrice})
   }

   //getDeliveryBoyAPI
   getDeliveryBoy(){
     return this.http.get(this.apiUrl+"getDeliveryBoy");
   }
   
   //OrderPlacedDetailsAPI
   placeOrderDetails(placedOrder){
     return this.http.post<FoodItem>(this.apiUrl+"placeOrderDetails",placedOrder)
   }

    //getOrderPlacedDetailsAPI
   getPlaceOrderDetails(){
     return this.http.get<FoodItem>(this.apiUrl+"getPlaceOrderDetails")
   }
 
    //UserBlockedRestauratsAPI
   userBlockedRestaurants(blockedRestaurnat){
     return this.http.post<RestaurantDetails>(this.apiUrl+"userBlockedrestaurant",blockedRestaurnat)
   }
   
   //GetUserBlockedRestaurantsAPI
   getUserBlockedRestaurant(){
     return this.http.get(this.apiUrl+"getUserBlockedRestaurant")
   }
   //deliveryOrdersAPI
   deliveryOrder(deliveryOrders){
     return this.http.post(this.apiUrl+"deliveryOrder", deliveryOrders)
   }
 //getDeliveryOrderAPI
   getDeliveryOrder(){
     return this.http.get(this.apiUrl+"getDeliveryOrder")
   }

   //deleteCartItemsAPI
   deleteCartItem(){
     return this.http.delete(this.apiUrl+"deleteCart")
   }

 //updateFoodItemsAPI
 updateFoodItems(updateFood){
   console.log(updateFood);
   return this.http.post(this.apiUrl+"updateFood",updateFood)
 }
 

}
