// import sql from 'mysql';
import db from './../../../db.js';
import { genSaltSync, hashSync } from 'bcrypt';

export function post(req,res,next){
 let {name,email,phno,org,size,password,} = req.body;
 const salt = genSaltSync(10);
 password = hashSync(password,salt);
let usePromise = new Promise((resolve,reject)=>{
  let userQuery = `SELECT email FROM users WHERE email = '${email}'` 
  db.query(userQuery,(err,resp)=>{
    if(err){
      reject(err);
    }else{
      resolve(resp);
    }
  });
});
usePromise.then((resp)=>{
  if(resp.length !=0){
    if(resp[0].email == email ){
      res.send({message:"Email already registered"})
    }
    
  }else{
    createUsers();
  }
}).catch((err)=>{
  res.send(err);
});

  function createUsers(){
    let postquery = `INSERT INTO users (name, email, phno, org, size, password)
    VALUES ('${name}','${email}','${phno}', '${org}', '${size}', '${password}');`;
      let data =  new Promise((resolve,reject)=>{
        db.query(postquery,(err,result)=>{
          if(err){
              reject(err);
          }
          resolve(result);
        });
      })
      data.then((result)=>{
       res.send({message:"Email registered successfully"})
      }).catch((err)=>{
        res.send(err);
      })
  }
}
