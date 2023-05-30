const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = (req,res,next)=>{
    let token = req.headers.authorization;
    try {
        if(token){
            jwt.verify(token, process.env.KEY, (err, decoded)=>{
                if(decoded){
                    console.log(decoded)
                    next()
                }else{
                    console.log(err)
                    res.send("JWT MALFORMED")
                }
              });
        }else{
            res.send("Invalid token")
        }
    } catch (error) {
        console.log(error)
        res.send("Something went wrong while authenticating the user")
    }
}

module.exports = {
    authenticate
}