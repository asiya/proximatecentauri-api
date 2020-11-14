const router = require('express').Router();
import {get,post} from './dashboardController'
router.route('/additionaldetails').post(post);
router.route('/').get(get);

module.exports = router;