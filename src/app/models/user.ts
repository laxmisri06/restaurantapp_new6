
export class Login {
    email: string
    password: string
}

export class Register {
    name: string
    email: string
    password: string
    confirmPassword: string
    roleId: string


    restaurantName?: string
    restaurantLocation?: string
    restaurantImage?: string
    phoneNumber?: number
    _id ?: number
}

export class RestaurantDetails {
    name: string
    email: string
    password: string
    confirmPassword: string
    phoneNumber: number
    restaurantLocation: string
    restaurantName: string
    roleId: string
    active:boolean
    adminblocked:boolean
   
}

export class FoodItem {
    restaurantName: string
    foodName: string
    foodPrice: string
    foodImage: string
    uniqueId: string
    cartQty?: number
    addedToCart?: boolean
}

export class FoodOrders {
    userName: string;
    deliveryBoyName: string;
    registerDate: any;
    userDetails: Orders[];
}

export class Orders {
    cartQty: number
    foodImage: string
    foodName: string
    foodPrice: string
    restaurantName: string
    uniqueId: string
}



