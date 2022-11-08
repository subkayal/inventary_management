const _ = require('lodash');

const SalesModel = require('../../models/sales.model');
const StockModel = require('../../models/stock.model');
const commonService = require('../../service/common.service');

module.exports = {
  /**
   * @method inward
   * @description "This method for inward product"
   * @api "POST /inward"
   *
   */

  inward: async (req, res) => {
    try {
      const { body } = req;
      if (body.productId === '' && body.warehouseId === '' && body.supplierId === '' && body.qty === '') {
        return res.status(209).json({
          success: false,
          message: 'Please check the details',
        });
      }
      const salesData = {
        productId: body.productId,
        warehouseId: body.warehouseId,
        supplierId: body.supplierId,
        qty: +body.qty,
        status: 'inward',
      };
      let saveSales = await commonService.save(SalesModel, salesData);
      if (saveSales) {
        const checkStocks = await commonService.findOneByFields(StockModel, {
          productId: saveSales.productId,
          warehouseId: saveSales.warehouseId,
        });
        if (_.isEmpty(checkStocks)) {
          await commonService.save(StockModel, {
            productId: saveSales.productId,
            warehouseId: saveSales.warehouseId,
            qty: saveSales.qty,
          });
          return res.status(201).json({
            success: true,
            message: 'Product inward successfully',
          });
        }
        await commonService.updateById(StockModel, checkStocks._id, { qty: parseInt(saveSales.qty + checkStocks.qty) });
        return res.status(201).json({
          success: true,
          message: 'Product inward successfully',
        });
      }
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },

  /**
   * @method outward
   * @description "This method for outward product"
   * @api "POST /outward"
   *
   */

  outward: async (req, res) => {
    try {
      const { body } = req;
      if (body.productId === '' && body.warehouseId === '' && body.supplierId === '' && body.qty === '') {
        return res.status(209).json({
          success: false,
          message: 'Please check the details',
        });
      }
      const checkStocks = await commonService.findOneByFields(StockModel, {
        productId: body.productId,
        warehouseId: body.warehouseId,
      });
      if (!_.isEmpty(checkStocks)) {
        if (checkStocks.qty < parseInt(body.qty)) {
          return res.status(209).json({
            success: false,
            message: 'In this warehouse no enough stock of this product.',
          });
        }
        const salesData = {
          productId: body.productId,
          warehouseId: body.warehouseId,
          supplierId: body.supplierId,
          qty: +body.qty,
          status: 'outward',
        };
        let saveSales = await commonService.save(SalesModel, salesData);
        if (saveSales) {
          let stockCount = parseInt(checkStocks.qty) - parseInt(saveSales.qty);
          await commonService.updateById(StockModel, checkStocks._id, { qty: parseInt(stockCount) });
          return res.status(201).json({
            success: true,
            message: 'Product outward successfully',
          });
        }
      }
      return res.status(209).json({
        success: false,
        message: 'The following Product from you Selected is out of stock.',
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },
};
