
const router = require('express-promise-router')();

// common controller
const controller = require('./supplier.controller');


router.post('/', controller.add);

module.exports = router;