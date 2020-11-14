import db from './../../../db.js';
import { compareSync } from 'bcrypt';
import {sign} from 'jsonwebtoken';

export function post(req,res,next){
    let {email,password} = req.body;
    let postQuery = `select email,password from users where email = '${email}'`;
    new Promise((resolve,reject)=>{
        db.query(postQuery,(err,result)=>{
            if(err){
                reject(err);
            }else{
                resolve(result)
            }
     
          });
      
    }).then((result)=>{
        if(result.length){
            const passwordCheck = compareSync(password,result[0].password)
             if(passwordCheck){
                 result[0].password = undefined;
                 const jsontoken = sign({result:result}, process.env.JWT_KEY,{
                     expiresIn:"24h"
                 });
                 res.json({
                     message:"login successfully",
                     token:jsontoken
                 });                 
             }else{
                 res.status(404).send({
                     message:"Invalid username or password"
                 });
                
             }
 
        }else{
            res.status(404).send({
                message:"Invalid username or password"
            })
            
        }

    }).catch((err)=>{
        res.send(err);
    }) ;
 
     
}