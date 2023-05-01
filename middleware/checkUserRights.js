const Todo = require('../models/Todos')

const checkUserRights = async function(req,res,next) {
    const {id} = req.query
    if(!id){
        return res.status(404).send('Please provide todo id !');
    }
    try{
    if(id){
    const todo = await Todo.findById(id)
    if(todo?.createdBy != req.user.userId){
        return res.status(401).send('You dont have permission to operate this todo !');
    }
}
    }catch(err){
        return res.status(404).send('Not Found !');
    }
}

module.exports = {checkUserRights}