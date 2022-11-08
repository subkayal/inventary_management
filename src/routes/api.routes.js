
const express = require('express');
const app = express();

const productRoutes = require('../modules/product');
const supplierRoutes = require('../modules/supplier');
const warehouseRoutes = require('../modules/warehouse');
const salesRoutes = require('../modules/sales');


app.use('/product', productRoutes);
app.use('/supplier', supplierRoutes);
app.use('/warehouse', warehouseRoutes);
app.use('/sales', salesRoutes);



module.exports = app;
 