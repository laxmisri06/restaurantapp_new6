import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './public-pages/register/register.component';
import { LoginComponent } from './public-pages/login/login.component';
import { HeaderComponent } from './public-pages/header/header.component';
import { FooterComponent } from './public-pages/footer/footer.component';
import { ProfileComponent } from './protect-pages/profile/profile.component';
import { RestaurantOrdersComponent } from './protect-pages/restaurant-orders/restaurant-orders.component';
import { AllrestaurantsComponent } from './protect-pages/allrestaurants/allrestaurants.component';
import { MyrestaurantComponent } from './protect-pages/myrestaurant/myrestaurant.component';
import { DeliveryOrdersComponent } from './protect-pages/delivery-orders/delivery-orders.component';
import { RestaurantAssociatesComponent } from './protect-pages/restaurant-associates/restaurant-associates.component';
import { UserRestaurantsComponent } from './protect-pages/user-restaurants/user-restaurants.component';
import { BlockRestaurantsComponent } from './protect-pages/block-restaurants/block-restaurants.component';
import { OrderHistoryComponent } from './protect-pages/order-history/order-history.component';
import { AllfoodComponent } from './protect-pages/allfood/allfood.component';
import { AdminblockrestaurantsComponent } from './protect-pages/adminblockrestaurants/adminblockrestaurants.component';
import {HttpClientModule} from '@angular/common/http';
import { ScheduleOrderComponent } from './protect-pages/schedule-order/schedule-order.component';





@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    ProfileComponent,
    RestaurantOrdersComponent,
    AllrestaurantsComponent,
    MyrestaurantComponent,
    DeliveryOrdersComponent,
    RestaurantAssociatesComponent,
    UserRestaurantsComponent,
    BlockRestaurantsComponent,
    OrderHistoryComponent,
    AllfoodComponent,
    AdminblockrestaurantsComponent,
    ScheduleOrderComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
