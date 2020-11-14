var router = require('express').Router();
//import {checkToken} from './../auth/token_validation';

// router.use('/startups/users',require('./startups/users/userRoutes'));
// router.use('/startups/login',require('./startups/login/loginRoutes'));
// router.use('/startups/dashboard',checkToken,require('./startups/dashboard/dashboardRoutes'));


//routes for startups

//router.use('/seekers/users',require('./seekers/users/usersRoute'));

router.use('/contactus',require('./contactus/contactRoute'));



module.exports = router;