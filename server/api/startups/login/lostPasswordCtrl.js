import db from './../../../db.js';
import jwt from 'jsonwebtoken';
import { genSaltSync, hashSync } from 'bcrypt';
const mailgun = require("mailgun-js");

export function forgotPassword(req,res){
    res.send(`<form action="/api/login/resetpassword" method="POST">
        <input type="email" name="email" value="" placeholder="Enter your email address..." />
        <input type="submit" value="Reset Password" />
    </form>`);
} 
export function resetPassword(req,res){

    const {email} = req.body;
    if(email != undefined){
        const emailAddess = email;
        let result = {
            password:undefined,
            email:emailAddess
        }
        var token = jwt.sign({result:result}, process.env.JWT_KEY,{
            expiresIn:"24h"
        });
        const DOMAIN = "sandbox0dad9538e830487aaf5159861fc6996f.mailgun.org";
        const mg = mailgun({apiKey: "**********************", domain: DOMAIN});
        const data = {
            from: "Mailgun Sandbox <postmaster@sandbox0dad9538e830487aaf5159861fc6996f.mailgun.org>",
            to: "ashishhsharma1990@gmail.com",
            subject: "Hello",
            html: `<a href=http://localhost:3000/api/login/passwordreset/${token}>Reset password</a>`
        };
        mg.messages().send(data, function (error, body) {
            console.log(body);
        });
        res.send(`<a href=/api/login/passwordreset/${token}>Reset password</a>`);
        // res.send("Email sent!!")
    }
}

export function passwordreset(req,res){
    let {token} = req.params;
    if(token){
        jwt.verify(token, process.env.JWT_KEY,(err,decoded)=>{
            if(err){
                console.log(err);
                res.json({
                    message:"invalid token"
                });
            }else{
                res.send(`<form action="/api/login/changePassword" method="POST">
                <input type="hidden" name="token" value="${req.params.token}" />
                <input type="password" name="password" value="" placeholder="Enter your new password..." />
                <input type="submit" value="Reset Password" />
            </form>`)
            }
        });
    }else{
        res.json({
            message:"UnAuthorized user!!!!"
        });
    }
}

export function changePassword(req,res){
    let {token,password} = req.body;
    jwt.verify(token, process.env.JWT_KEY,(err,decoded)=>{
        if(err){
            console.log(err);
            res.json({
                message:"invalid token"
            });
        }else{
            
            const salt = genSaltSync(10);
            password = hashSync(password,salt);

            let query = `Update users SET password = '${password}' WHERE email = '${decoded.result.email}'`;
            db.query(query,(err,result)=>{
                if(err){
                    reject(err);
                }
                if(result){
                    res.send("password changed successfully")
                }
            });
        }
    })
}   
