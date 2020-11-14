const router = require('express').Router();
import {get,post} from './contactController'
router.route('/').get(get);
router.route('/').post(post);


module.exports = router;