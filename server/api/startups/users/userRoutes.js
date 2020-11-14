const router = require('express').Router();
import {get,post} from './userController'
// router.route('/').get(get);
router.route('/').post(post);


module.exports = router;