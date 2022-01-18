
const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const mongodb = require("mongodb").MongoClient;
const multer = require("multer");


const app = express();
app.use(cors());
app.use(bodyparser.json());
var db;

var loggedUser;

mongodb.connect("mongodb+srv://baskar:baskar@cluster0.wmakr.mongodb.net/restaurantapp?retryWrites=true&w=majority", (error, database) => {
    if (!error) {
        db = database.db("restaurantapp");
        console.log("DB connected");
    }
    else {
        console.log("DB not Connected");
    }
});



app.post("/register", (req, res) => {
    console.log(req.body);
    req.body._id = new Date().getTime();
    db.collection("users").insert(req.body, (error, data) => {
        console.log(data);
        if (error) {
            res.status(403).json("Error in Insert Query");
        }
        else {
            res.json("User register successfully");
        }
    });
});

app.post("/login", (req, res) => {
    console.log(req.body);
    db.collection("users").find(req.body, { projection: { roleIndex: 0 } }).toArray((error, data) => {
        res.json(data);
        for (let i = 0; i < data.length; i++) {
            loggedUser = data[i]._id
        }
        console.log(loggedUser);
    });
});

app.get("/getUsers", (req, res) => {
  db.collection("users").find().toArray((error,data)=>{
      res.json(data)
  });
});

app.post("/updateUser", (req, res) => {
    console.log(req.body)
    db.collection("users").update({ _id: req.body._id }, {
        $set: {
            adminblocked: req.body.adminblocked,
            name: req.body.name,
            email: req.body.email,
            roleId: req.body.roleId,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
            restaurantName: req.body.restaurantName,
            restaurantLocation: req.body.restaurantLocation,
            restaurantImage: req.body.restaurantImage,
            phoneNumber: req.body.phoneNumber,
            _id: req.body._id,
            active: req.body.active,
        }
    });
});

app.get("/getallUsers", (req, res) => {
    let allRestaurant = []
    db.collection("users").find().toArray((error, data) => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].roleId == '2') {
                allRestaurant.push(data[i]);
            }
        }
        res.json(allRestaurant);
    });
});


app.get("/getallrestaurants", (req, res) => {
    let allRestaurant = []
    console.log(req.body);
    db.collection("users").find().toArray((error, data) => {
        if(data){
        for (let i = 0; i < data.length; i++) {
            if (data[i].roleId == '2') {
                allRestaurant.push(data[i]);
            }
        }
    }
        res.json(allRestaurant);
        console.log(allRestaurant);
    }, (error) => {
        console.log(error);
    })
});


app.post("/adminBlockRestauarnts", (req, res) => {

    req.body._id = new Date().getTime();
    db.collection("adminblockrestaurants").insert(req.body, (error, data) => {
        if (error) {
            console.log(error)
        }
        else {
            res.json(data)
            console.log(data);
        }
    });
});


app.get("/getadminBlockRestaurant", (req, res) => {
    db.collection("adminblockrestaurants").find().toArray((error, data) => {
        res.json(data);
    }, (error) => {
        console.log(error);
    });
});

const myStroge = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "src/Backend/food_image");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname + "-" + new Date().getTime());
    }
});

app.post("/addFoodItems", multer({ storage: myStroge }).single("foodImage"), (req, res) => {
    req.body._id = new Date().getTime();
    req.body.foodPrice = Number(req.body.foodPrice)
    db.collection("fooditems").insert(req.body, (error, data) => {
        res.json(data);
    }, (error) => {
        console.log(error);
    });
});

app.get("/getFoodItems", (req, res) => {
    db.collection("fooditems").find().toArray((error, data) => {
        res.json(data);
    }, (error) => {
        console.log(error);
    });
});

app.post("/addFoodtoCart", (req, res) => {
    console.log(req.body);
    req.body._id = new Date().getTime();
    req.body.cartQty = 1
    req.body.cartUserId = loggedUser
    db.collection("cart").insertOne(req.body, (error, data) => {
        if (error) {
            console.log(error)
        }
        else {
            res.json(data);
        }
    });
});


app.get("/getMycartCount", (req, res) => {
    db.collection("cart").count({ cartUserId: loggedUser }, (error, data) => {
        res.json(data);
    });
});


app.get("/getMycartItems", (req, res) => {
    db.collection("cart").find(req.body).toArray((error, data) => {
        res.json(data);
    });
});

app.put("/updateMycartItems", (req, res) => {
    var condition = { _id: req.body.cartId };
    var newValues = {
        $set: {
            cartQty: req.body.cartQty,
            foodPrice: req.body.foodPrice
        }
    };
    db.collection("cart").update(condition, newValues, (error, data) => {
        res.json("Cart items successfully")
    });
});

app.post("/updateFood", (req, res) => {
    console.log(req.body)
    db.collection("fooditems").updateOne({ _id: req.body._id }, {
        $set: {
            foodName: req.body.foodName,
            foodPrice: req.body.foodPrice,
            restaurantName: req.body.restaurantName,
            uniqueId: req.body.uniqueId,
            foodImage: req.body.foodImage
        }
    });
});


app.get("/getDeliveryBoy", (req, res) => {
    let deliveryBoy = []
    db.collection("users").find(req.body).toArray((error, data) => {
        console.log(data);
        for (let x in data) {
            if (data[x].roleId == '3') {
                deliveryBoy.push(data[x]);
            }
        }
        res.json(deliveryBoy);
    });
});

app.post("/placeOrderDetails", (req, res) => {
    req.body._id = new Date().getTime();
    db.collection("orderdetails").insert(req.body, (error, data) => {
        if (error) {
            console.log(error)
        }
        else {
            res.json(data)
            console.log(data);
        }
    });
});

app.get("/getPlaceOrderDetails", (req, res) => {
    db.collection("orderdetails").find(req.body).toArray((error, data) => {
        res.json(data);
    });
});


app.post("/userBlockedrestaurant", (req, res) => {
    req.body._id = new Date().getTime();
    db.collection("userblockedrestaurants").insert(req.body, (error, data) => {
        if (error) {
            console.log(error)
        }
        else {
            res.json(data)
            console.log(data);
        }
    });
});


app.get("/getUserBlockedRestaurant", (req, res) => {
    db.collection("userblockedrestaurants").find(req.body).toArray((error, data) => {
        res.json(data);
    });
});

app.post("/deliveryOrder" , (req,res)=>{
    req.body._id = new Date().getTime();
    db.collection("deliveryorders").insert(req.body , (error, data)=>{
        if (error) {
            console.log(error)
        }
        else {
            res.json(data)
            console.log(data);
        }
    });
});

app.get("/getDeliveryOrder", (req,res)=>{
    db.collection("deliveryorders").find(req.body).toArray((error,data)=>{
        res.json(data)
    });
});


app.delete("/deleteCart" , (req,res)=>{
    console.log(req.body);
    db.collection("cart").remove(req.body , (error,data)=>{
        if (error) {
            console.log(error)
        }
        else {
            res.json(data)
           // console.log(data);
        }
    });
});




module.exports = app;