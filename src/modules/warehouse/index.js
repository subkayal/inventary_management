
const router = require('express-promise-router')();

// common controller
const controller = require('./warehouse.controller');


router.post('/', controller.add);

module.exports = router;