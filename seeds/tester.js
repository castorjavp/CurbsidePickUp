const Order = require("../models/order")
const mongoose = require("mongoose")

mongoose.connect('mongodb://localhost:27017/curbside-pickup');
const foo = async () => {
    // await Order.deleteMany({})

    const order = new Order()
    console.log(order)
    console.log("before save")
    await order.save().then(() => {
        console.log("after save")
        console.log(order)
        mongoose.connection.close()
    }).catch((error)=> {
        console.log(error)
    })
    
}

foo()
