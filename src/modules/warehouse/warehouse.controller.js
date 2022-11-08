const _ = require('lodash');

const WarehouseModel = require('../../models/warehouse.model');
const commonService = require('../../service/common.service');

module.exports = {

    /**
     * @method add
     * @description "This method for add ware house"
     * @api "POST /"
     * 
     */

  add: async (req, res) => {
    try {
      const { body } = req;
      if(body.name === ''){
        return res.status(209).json({
          success: false,
          message: 'Please check the warehouse name',
        });
      }
      const checkProduct = await commonService.findOneByFields(WarehouseModel, {name:  { $regex: body.name, $options: 'i' }});
      if(!_.isEmpty(checkProduct)){
        return res.status(209).json({
          success: false,
          message: 'Warehouse alresdy exist',
        });
      }
      await commonService.save(WarehouseModel, body);
      return res.status(201).json({
        success: true,
        message: 'Warehouse save successfully',
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },
}