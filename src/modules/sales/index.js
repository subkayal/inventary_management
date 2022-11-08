
const router = require('express-promise-router')();

// common controller
const controller = require('./sales.controller');


router.post('/inward', controller.inward);
router.post('/outward', controller.outward);

module.exports = router;