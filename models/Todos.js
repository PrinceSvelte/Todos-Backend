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

module.exports = mongoose.model('Todo',TodoSchema)