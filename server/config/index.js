const env = process.env.NODE_ENV || 'development';

const baseConfig = {
    env,
    isDev:env === 'development',

}


let envConfig = {};

switch (env){
    case 'dev':
    case 'development':
        envConfig = require('./dev').config;
        break;
    default:
        envConfig = require('./prod').config;
}


let  config = {...baseConfig,...envConfig};

export default config;