const Todo = require('../models/Todos')

const checkUserRights = async function(req,res,next) {
    const {id} = req.query
    if(req.originalUrl == '/api/v1/todo/create' || req.originalUrl == '/api/v1/todo/getAll' ){
        next()
        return
    }
    if(!id){
        return res.status(404).send('Please provide todo id!'); 
    }
    const todo = await Todo.findById(id)
    if(!todo){
        return res.status(404).json({ message: 'Todo not found', error: '' }); 
    }
    if(todo.createdBy != req.user.userId){
        return res.status(401).send('You dont have permission to operate this todo !');
    }else {
        next()
    }
}

module.exports = {checkUserRights}