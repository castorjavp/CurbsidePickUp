const mongoose =  require('mongoose');
const Schema = mongoose.Schema

const orderSchema = new Schema({
    products: [{type: Schema.Types.ObjectId, ref:"Product"}],
    status_: {
      type: String,
      lowercase: true,
      enum: ['not ready', 'ready for pickup', 'checked in', 'done'],
      default: 'not ready'
    },
    customer: {
      type: Schema.Types.ObjectId, ref:"Customer"
    }
})

orderSchema.statics.random = async function() {
    const count = await this.count();
    const rand = Math.floor(Math.random() * count);
    const randomDoc = await this.findOne().skip(rand);
    return randomDoc;
  };

const Order = mongoose.model("Order", orderSchema);

module.exports = Order