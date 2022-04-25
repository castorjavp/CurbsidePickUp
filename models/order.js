const mongoose = require('mongoose');
const Schema = mongoose.Schema

const orderSchema = new Schema({
  _id: {
    type: String,
    default: "H6339-"
  },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  status_: {
    type: String,
    lowercase: true,
    enum: ['not ready', 'ready for pickup', 'checked in', 'done'],
    default: 'not ready'
  },
  customer: {
    type: Schema.Types.ObjectId, ref: "Customer"
  },
  count: {
    type: Number,
    default: 154608
  }
})

orderSchema.statics.random = async function () {
  const count = await this.count();
  const rand = Math.floor(Math.random() * count);
  const randomDoc = await this.findOne().skip(rand);
  return randomDoc;
};

orderSchema.statics.getLastCount = async function () {
  const order = await Order.findOne().sort({ count: -1 }).exec()
  if (order) {
    return order.count
  }
  return 154608
}

orderSchema.pre('save', { document: true, query: false }, async function (next) {
  let doc = this
  if (this.isNew) {
    let count = await Order.getLastCount()
    doc.count = count + 1
    doc._id += doc.count.toString()
  }
  next()
})


const Order = mongoose.model("Order", orderSchema);

module.exports = Order