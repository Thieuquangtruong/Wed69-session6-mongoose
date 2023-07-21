const readFile = require("../utils/readFile")
const jwt = require("jsonwebtoken")

const authentication = (req ,res, next) => {
const bearerToken = req.headers.authorization


if(!bearerToken){
    return res.status(401).json({messga: "dang nhap that bai"})
    
}
const token = bearerToken.split(" ")[1]

const verify_token = jwt.verify(token, process.env.SECRET_KEY)

if(!verify_token){
    return res.status(401).json({messga: "ban chua dang nhap"})
}

const userId = verify_token.userId

 const result = readFile('user.json')

 const checkUser = result.find(item => item.userId == userId)

 if(checkUser){
    next()
 }

 return res.status(401).json({messgae: "ban chua dang nhap"})
}
module.exports = authentication