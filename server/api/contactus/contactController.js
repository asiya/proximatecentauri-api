import db from '../../db.js';
var nodemailer = require('nodemailer');

export function post(req,res,next){  
    console.log(req.body);
    let {name,email,phno,msg} = req.body;    
    sendemail(req.body);
    sendemailtouser(req.body);
    let postquery = `INSERT INTO contact (Name, Email, PhoneNo, Message)
    VALUES ('${name}','${email}','${phno}', '${msg}');`;
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


export function get(req,res,next){  
  console.log(req.user)
  let useremail = req.user;

  console.log(useremail);  
    let postquery = `Select id from  contact;`;
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

function sendemail(contactdata){
  // create transporter object with smtp server details
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
      user: 'shaikhasiya448@gmail.com',
      pass: 'Godzilla@00'
  }
});

 transporter.sendMail({
  from: 'shaikhasiya448@gmail.com',
  to: 'asiyas420@gmail.com',
  subject: 'Proximate Centauri Contact',
  html: '<h2>Greetings Proximate Centauri!!!</h2>'+
        
        '<h3>Someone is interested in talking to you</h3>'+
        
        '<table style="border:1px solid black"><thead><th style="border:1px solid black">Name</th><th style="border:1px solid black">Phone No</th><th style="border:1px solid black">Email</th><th style="border:1px solid black">Message</th><thead><tbody><tr><td style="border:1px solid black">'+contactdata.fullName+'</td><td style="border:1px solid black">'+contactdata.phno+'</td><td style="border:1px solid black">'+contactdata.email+'</td><td style="border:1px solid black">'+contactdata.msg+'</td></tr></tbody></table>'
});
}

function sendemailtouser(contactdata){
  // create transporter object with smtp server details
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
      user: 'shaikhasiya448@gmail.com',
      pass: 'Godzilla@00'
  }
});

 transporter.sendMail({
  from: 'shaikhasiya448@gmail.com',
  to: contactdata.email,
  subject: 'Thank you',
  html: '<h3>Hi '+contactdata.fullName+'</h3>'+
        
       '<p>Thank you for contacting <b>Proximate Centauri</b>. We will get in touch with you shortly</p>' +
       '<p style="color:grey;font-size:12px;">Regards,<br/>Proximate Centauri<br/>Plot No-66, Near Mantri Heights, Daund, Dist-Pune</p>' 
 });
}