const Todo = require('../models/Todos')

const createTodo = async(req,res) => {
    const {userId} = req.user
    req.body.createdBy = userId
    const {name,description,status} = req.body
    try {
        if(!name || !description || typeof(status) !== "boolean"){
            return res.status(404).send("Please provide name,description and status!")
        }
        const todo = await Todo.create({
          ...req.body,
        });
        res.status(200).json(todo);
      } catch (error) {
        res.status(400).json({ message: 'Error adding todo', error: error });
      }
};

const updateTodo = async(req,res) => {
    try {
        const {id} = req.query
        let todo = await Todo.findById(
            id
        )
        const {name,description,status} = req.body
        todo.name = name,
        todo.description = description
        todo.status = status
        const updatedTodo = await todo.save()
        return res.status(200).json(updatedTodo)
    } catch (error) {
        res.status(400).json({
            message: 'Error getting todo',
            error: JSON.stringify(error),
          });   
    }
}

const deleteTodo = async(req,res) => {
    try {
        const {id} = req.query
        const deletedTodo = await Todo.findByIdAndRemove(id)
        console.log(deleteTodo,"deleted")
        return res.status(200).json(deletedTodo)
    } catch (error) {
        res.status(400).json({
            message: 'Error getting todo',
            error: JSON.stringify(error),
          });
    }
}


const getTodoById = async(req,res) => {
    try {
        const {id} = req.query
        if(!id){
            return res.status(404).json({ message: 'Please provide todo id'  }); 
        }
        const todo = await Todo.findById(id)
        return res.status(200).json(todo)
    } catch (error) {
        console.log(error,"errro")
        res.status(400).json({
            message: 'Error getting Todo',
            error: JSON.stringify(error),
          });
    }
}


const getAllTodos = async(req,res) => {
    function escapeRegex(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    };
    try {
        const page= Number(req.query?.page) || 1
        const limit = Number(req.query?.limit) || 5
        const skip = (page - 1)*limit
        const search = req.query?.search
        if(search){
            const regex = new RegExp(escapeRegex(search,'gi'))
            const todos = await Todo.find({createdBy:req.user.userId,name:regex,description:regex})
            return res.status(200).json(todos)
        }
        const todo = await Todo.find({createdBy:req.user.userId}).skip(skip).limit(limit)
        return res.status(200).json(todo)
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: 'Error getting todo',
            error: JSON.stringify(error),
          });
    }
}




module.exports = {createTodo,updateTodo,deleteTodo,getTodoById,getAllTodos}