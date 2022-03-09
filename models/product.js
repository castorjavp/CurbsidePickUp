const mongoose =  require('mongoose');
const Schema  = mongoose.Schema

const productSchema = new Schema({
    name: String,
    price: Number,
})

productSchema.statics.random = async function() {
    const count = await this.count();
    const rand = Math.floor(Math.random() * count);
    const randomDoc = await this.findOne().skip(rand);
    return randomDoc;
};


const Product = mongoose.model("Product", productSchema);

module.exports = Product