
const router = require('express-promise-router')();

// common controller
const controller = require('./product.controller');


router.post('/', controller.add);
router.get('/list/:warehouseId', controller.list);

module.exports = router;