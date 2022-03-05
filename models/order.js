const mongoose =  require('mongoose');
const { Schema } = mongoose.Schema

const orderSchema = new Schema({
    firstName: String,
    lastName: String,
    phoneNumber: Number,
    orders: [{type: Schema.Types.ObjectId, ref:"Order"}]
})

const Customer = new mongoose.Model("customer". customerSchema);

module.exports = Customer