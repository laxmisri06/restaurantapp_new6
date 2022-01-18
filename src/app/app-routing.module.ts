import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteGuard } from './Guard/route.guard';
import { AdminblockrestaurantsComponent } from './protect-pages/adminblockrestaurants/adminblockrestaurants.component';
import { AllfoodComponent } from './protect-pages/allfood/allfood.component';
import { AllrestaurantsComponent } from './protect-pages/allrestaurants/allrestaurants.component';
import { BlockRestaurantsComponent } from './protect-pages/block-restaurants/block-restaurants.component';
import { DeliveryOrdersComponent } from './protect-pages/delivery-orders/delivery-orders.component';
import { MyrestaurantComponent } from './protect-pages/myrestaurant/myrestaurant.component';
import { OrderHistoryComponent } from './protect-pages/order-history/order-history.component';
import { ProfileComponent } from './protect-pages/profile/profile.component';
import { RestaurantAssociatesComponent } from './protect-pages/restaurant-associates/restaurant-associates.component';
import { RestaurantOrdersComponent } from './protect-pages/restaurant-orders/restaurant-orders.component';
import { ScheduleOrderComponent } from './protect-pages/schedule-order/schedule-order.component';
import { UserRestaurantsComponent } from './protect-pages/user-restaurants/user-restaurants.component';
import { LoginComponent } from './public-pages/login/login.component';
import { RegisterComponent } from './public-pages/register/register.component';


const routes: Routes = [
  {path:"", component:LoginComponent},
  {path:"register" , component:RegisterComponent},
  {path:"allrestaurant", component:AllrestaurantsComponent, canActivate:[RouteGuard],data:{roleId : 1}},
  {path:"adminBlockrestaurat", component:AdminblockrestaurantsComponent, canActivate:[RouteGuard], data:{roleId :1}},
  {path:"profile", component:ProfileComponent,canActivate:[RouteGuard]},
  {path:"myrestaurant", component:MyrestaurantComponent, canActivate:[RouteGuard],data:{roleId : 2}},
  {path:"restaurantOrders", component:RestaurantOrdersComponent, canActivate:[RouteGuard],data:{roleId : 2}},
  {path:"orders", component:DeliveryOrdersComponent, canActivate:[RouteGuard],data:{roleId : 3}},
  {path:"restaurantAssociated", component:RestaurantAssociatesComponent, canActivate:[RouteGuard],data:{roleId : 3}},
  {path:"userRestaurant", component:UserRestaurantsComponent, canActivate:[RouteGuard],data:{roleId : 4}},
  {path:"orderHistory", component:OrderHistoryComponent, canActivate:[RouteGuard],data:{roleId : 4}},
  {path:"blockRestaurant", component:BlockRestaurantsComponent, canActivate:[RouteGuard],data:{roleId : 4}},
  {path:"allfood", component:AllfoodComponent},
  {path:"scheduleOrder", component:ScheduleOrderComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
