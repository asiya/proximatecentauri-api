import express from 'express';
const app = express();
import api from './api/api';
// import config from './config/index';
require('./middleware/appMiddleware')(app);

app.use('/api/proximatecentauri/',api);

 module.exports = app;