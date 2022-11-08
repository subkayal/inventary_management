const _ = require('lodash');

const ProductModel = require('../../models/product.model');
const commonService = require('../../service/common.service');
const warehouseService = require('../../service/warehouse.service');

module.exports = {

    /**
     * @method add
     * @description "This method for add product"
     * @api "POST /"
     * 
     */

  add: async (req, res) => {
    try {
      const { body } = req;
      if(body.name === ''){
        return res.status(209).json({
          success: false,
          message: 'Please check the product name',
        });
      }
      const checkProduct = await commonService.findOneByFields(ProductModel, {name:  { $regex: body.name, $options: 'i' }});
      if(!_.isEmpty(checkProduct)){
        return res.status(209).json({
          success: false,
          message: 'Product alresdy exist',
        });
      }
      await commonService.save(ProductModel, body);
      return res.status(201).json({
        success: true,
        message: 'Product save successfully',
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },

  /**
     * @method list
     * @description "This method for add product"
     * @api "POST /list"
     * 
     */
  list: async (req, res) => {
    try{
      const { warehouseId } = req.params
      const productList = await warehouseService.list(warehouseId);
      if(_.isEmpty(productList)){
        return res.status(404).json({
          success: true,
          data: [],
          message: 'Products not found',
        });
      }
      productList.products = _.sortBy(productList.products, 'name')
      return res.status(200).json({
        success: true,
        data: productList,
        message: 'Products fetch successfully',
      });
    }catch(err){
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }

}