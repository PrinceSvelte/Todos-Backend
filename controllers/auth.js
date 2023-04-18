const User = require("../models/User")
const {StatusCodes} = require("http-status-codes")


const register = async(req,res) => {
    const {name,email,password} = req.body
    try {
        if(!name || !email || !password){
            return res.status(StatusCodes.BAD_REQUEST).json({msg:"Please provide name,email and password !"})
         }
         const user = await User.create({...req.body});
         const token = user.createJWT()
         res.status(StatusCodes.CREATED).json({data:{name:user.name,token}}) 
    } catch (error) {
        let msg = error.message
        if(error.code === 11000){
            msg = "Duplicate Entry Not Allowed"
        }
        res.status(StatusCodes.BAD_REQUEST).json({msg}) 
    }

}

const login = async(req,res) => {
    const {email,password} = req.body
    try {
       if(!email || !password){
        return res.status(StatusCodes.BAD_REQUEST).send("Please provide email and password!")
       }
       const user = await User.findOne({email})
       if(!user){
        return res.status(StatusCodes.BAD_REQUEST).send({msg:'User with this email do not exist'});
       }
       const isPasswordCorrect = await user.comparePassword(password) 
       if(!isPasswordCorrect){
        return res.status(StatusCodes.UNAUTHORIZED).send({msg:'Invalid Credentials!'});
       }
       const token = user.createJWT()
       return res.status(StatusCodes.OK).json({data:{
        email:user.email,name:user.name,token
    }});
    } catch (error) {
        res.status(400).send(error)
    }
}
module.exports = {register,login}