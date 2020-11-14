import db from './../../../db.js';
export function post(req,res,next){
  console.log("------------")
  console.log(req.user);
  let useremail = req.user; 
  let {proname,prodesc,price,comments,address} = req.body;
  let id = `SELECT id FROM users WHERE email = "${useremail}"`;

    let postquery = `delimiter //
    CREATE PROCEDURE additional_details(IN proname varchar(100),IN prodesc varchar(100),IN price int(20),IN comments varchar(100),IN address varchar(100), IN id int(11))
        BEGIN
        INSERT INTO product (proname, prodesc, price,comments, id)
        VALUES (proname, prodesc, price,comments, id);
        UPDATE users SET address=address where users.id = id;       
        END//`
    let data =  new Promise((resolve,reject)=>{
      db.query(id,(err,result)=>{
        console.log("result[0].id",result[0].id);
        db.query( `CALL additional_details('${proname}', '${prodesc}', '${price}','${comments}','${address}','${result[0].id}');`,(err,result)=>{
          console.log("---------")
          if(err){
              console.log(err)
              throw err;
          }
          console.log(result);
          res.send(result)
        });
      });
  })
  data.then((result)=>{
    res.send(result)
  }).catch((err)=>{
    res.send(err);
  })
}


export function get(req,res,next){  
  console.log(req.user)
  let useremail = req.user;

  console.log(useremail);  
    let postquery = `Select id from users where users.email = '${useremail}';`;
      let data =  new Promise((resolve,reject)=>{
        db.query(postquery,(err,result)=>{
          if(err){
              reject(err);
          }
          resolve(result);
        });
      })
      data.then((result)=>{        
        res.send(result)
      }).catch((err)=>{
        res.send(err);
      })   
}

