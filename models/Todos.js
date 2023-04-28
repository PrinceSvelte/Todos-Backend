const mongoose = require("mongoose")
const User = require("../models/User")
const TodoSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        required:true
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true,'Please provide user']
    }
},
{timestamps:true})

TodoSchema.pre('findByIdAndUpdate',function(req) {
    console.log(this.createdBy,req,"req......")
    return this.createdBy == req.user.userId
})
TodoSchema.methods.checkUserRights = function(userId) {
    console.log(this.createdBy,"userd",userId)
   return this.createdBy == userId
}

module.exports = mongoose.model('Todo',TodoSchema)