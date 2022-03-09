const mongoose = require("mongoose")
const Product = require("../models/product")

mongoose.connect('mongodb://localhost:27017/curbside-pickup');

let productNames = ["Cheese Pizza", "Pepperoni Pizza", "Hawaiian Pizza", "Meat Lover's Pizza", "Veggies Pizza"];
const generateProducts = async () => {
    await Product.deleteMany({})
    for(let i = 0; i < 20; i++){
        let productName = productNames[Math.floor((Math.random()*productNames.length))]
        let productPrice = Math.random()*21
        productPrice = productPrice.toFixed(2)
        const product = new Product({
            name: productName,
            price: productPrice
        })
        await product.save();
    }
}

generateProducts().then(() => {
    mongoose.connection.close();
})
