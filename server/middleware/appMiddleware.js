const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require("cors");

module.exports = (app)=>{
    
    app.use(morgan('dev'))
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    
    var corsOptions = {
        origin: "http://localhost:3001"
    };
    app.use(cors(corsOptions));
}