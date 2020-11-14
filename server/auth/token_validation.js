import {verify} from 'jsonwebtoken';
export function checkToken(req,res,next){
    console.log("---------")
    let token = req.get("authorization");
    if(token){
        token = token.slice(7);
        verify(token, process.env.JWT_KEY,(err,decoded)=>{
            if(err){
                res.json({
                    message:"invalid token"
                });
            }else{
                req.user = decoded.result[0].email;
                next();
            }
        });
    }else{
        res.json({
            message:"UnAuthorized user!!!!"
        });
    }
}