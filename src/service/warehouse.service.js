const mongoose = require('mongoose');

const warehouseModel = require('../models/warehouse.model');

const warehouseService = {
  list: async (warehouseId) => {
    try {
      const products = await warehouseModel.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(warehouseId) } },
        {
          $lookup: {
            from: 'stocks',
            localField: '_id',
            foreignField: 'warehouseId',
            as: 'stockDetails',
          },
        },
        {
          $unwind: {
            path: '$stockDetails',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: 'products',
            let: { productId: '$stockDetails.productId', qty: '$stockDetails.qty' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [{ $or: [{ $eq: ['$_id', '$$productId'] }] }],
                  },
                },
              },
              {
                $group: {
                  _id: '$_id',
                  name: { $first: '$name' },
                  qty: { $first: '$$qty' },
                },
              },
              {
                $addFields: {
                  status: {
                    $cond: { if: { $gte: ['$qty', 20] }, then: 'Stock', else: 'Stock is Low' },
                  },
                },
              },
            ],
            as: 'productdetails',
          },
        },
        {
          $unwind: {
            path: '$productdetails',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $group: {
            _id: '$_id',
            warehouseName: { $first: '$name' },
            products: { $addToSet: '$productdetails' },
          },
        },
      ]);
      if (!products) {
        return [];
      }
      return products[0];
    } catch (err) {
      return err;
    }
  },
};

module.exports = warehouseService;
