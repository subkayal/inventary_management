// node modules
const mongoose = require('mongoose');
const { Schema } = mongoose;

const stockSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    warehouseId: { type: Schema.Types.ObjectId, ref: 'Warehouse' },
    qty: { type: Number, default: '' }
  },{ timestamps: true },
);

module.exports = mongoose.model('Stock', stockSchema);
