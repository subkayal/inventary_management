const _ = require('lodash');

const SupplierModel = require('../../models/supplier.model');
const commonService = require('../../service/common.service');

module.exports = {

    /**
     * @method add
     * @description "This method for add supplier"
     * @api "POST /"
     * 
     */

  add: async (req, res) => {
    try {
      const { body } = req;
      if(body.name === ''){
        return res.status(209).json({
          success: false,
          message: 'Please check the supplier name',
        });
      }
      const checkProduct = await commonService.findOneByFields(SupplierModel, {name:  { $regex: body.name, $options: 'i' }});
      if(!_.isEmpty(checkProduct)){
        return res.status(209).json({
          success: false,
          message: 'Supplier alresdy exist',
        });
      }
      await commonService.save(SupplierModel, body);
      return res.status(201).json({
        success: true,
        message: 'Supplier save successfully',
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },
  
}