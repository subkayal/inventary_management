// node modules
const mongoose = require('mongoose');
const { Schema } = mongoose;

const supplierSchema = new Schema(
  {
    name: { type: String, default: '' },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  },{ timestamps: true },
);

module.exports = mongoose.model('Supplier', supplierSchema);
