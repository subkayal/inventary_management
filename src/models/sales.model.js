// node modules
const mongoose = require('mongoose');
const { Schema } = mongoose;

const salesSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    warehouseId: { type: Schema.Types.ObjectId, ref: 'Warehouse' },
    supplierId: { type: Schema.Types.ObjectId, ref: 'Supplier' },
    qty: { type: Number, default: '' },
    status: { type: String, enum: ['inward', 'outward'], default: 'inward' },
  },{ timestamps: true },
);

module.exports = mongoose.model('Sales', salesSchema);