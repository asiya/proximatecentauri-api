import db from './../../../db.js'

export function get(req,res,next){
    displayUser(req,res).then((resp)=>{
        res.status(200).send(resp);
    }).catch((err)=>{
        res.status(500).send(err);
    });   
}
function displayUser(req,res){
    return new Promise((resolve,reject)=>{
        let getQuery = `SELECT email, interest FROM seekersusers`;
        db.query(getQuery,(err,result)=>{
            if(err){
                reject(err);
            }
            resolve(result);
        });

    });
}

export function post(req,res,next){
    createUser(req).then((resp)=>{
        res.status(200).send(resp);
    }).catch((err)=>{
        res.status(500).send(err);
    });
}


function createUser(req){
    return new Promise((resolve,reject)=>{
        let {email, password,interest} = req.body;
        let postquery = `INSERT INTO seekersusers (interest, email, password)
        VALUES ('${interest}','${email}','${password}');`;
        db.query(postquery,(err,result)=>{
            if(err){
                reject(err);
            }
            resolve(result);
        });
    });
}