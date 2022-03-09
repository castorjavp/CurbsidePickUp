const mongoose = require("mongoose")
const Order = require("../models/order")
const Product = require("../models/product")


mongoose.connect('mongodb://localhost:27017/curbside-pickup');

const findProduct = async () => {
    const product = await Product.random();
    console.log(product)
}

findProduct().then(() => {
    mongoose.connection.close();
})



// let productNames = ["Cheese Pizza", "Pepperoni Pizza", "Hawaiian Pizza", "Meat Lover's Pizza", "Veggies Pizza"];
// const generateProducts = async () => {
//     for(let i = 0; i < 20; i++){
//         let productName = productNames[Math.floor((Math.random()*productNames.length))]
//         let productPrice = Math.random()*20;
//         const product = new Product({
//             name: productName,
//             price: productPrice
//         })
//         await product.save();
//     }
// }

// generateProducts().then(() => {
//     mongoose.connection.close();
// })