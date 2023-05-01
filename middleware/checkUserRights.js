const Todo = require('../models/Todos')

const checkUserRights = async function(req,res,next) {
    const {id} = req.query
    if(!id){
       next()
       return
    }
    try {
        const todo = await Todo.findById(id)
        if(!todo){
            return res.status(404).json({ message: 'Todo not found', error: '' }); 
        }
        if(todo.createdBy != req.user.userId){
            return res.status(401).send('You dont have permission to operate this todo !');
        }else {
            next()
        }
    } catch (error) {
        return res.status(404).json({ error }); 
    }

}

module.exports = {checkUserRights}