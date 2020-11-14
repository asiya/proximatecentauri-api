const router = require('express').Router();
import {get,post} from './loginController';
import {forgotPassword,resetPassword,passwordreset,changePassword} from './lostPasswordCtrl';
router.route('/').post(post);
router.route('/forgotpassword').get(forgotPassword);
router.route('/resetpassword').post(resetPassword);
router.route('/passwordreset/:token').get(passwordreset);
router.route('/changepassword').post(changePassword);

module.exports = router;