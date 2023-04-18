const Todo = require('../models/Todos')



const createTodo = async(req,res) => {
    const {userId} = req.user
    req.body.createdBy = userId
    try {
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
        const todo = await Todo.findByIdAndUpdate(
            id,
            {...req.body},
            {new:true}
        )
        if(!todo){
            return res.status(404).json({ message: 'Todo not found', error: '' }); 
        }
        return res.status(200).json(todo)
    } catch (error) {
        res.status(400).json({
            message: 'Error getting article',
            error: JSON.stringify(error),
          });
    }
}

const deleteTodo = async(req,res) => {
    try {
        const {id} = req.query
        const todo = await Todo.findByIdAndRemove(
            id
        )
        if(!todo){
            return res.status(404).json({ message: 'Todo not found', error: '' }); 
        }
        return res.status(200).json(todo)
    } catch (error) {
        res.status(400).json({
            message: 'Error getting article',
            error: JSON.stringify(error),
          });
    }
}


const getTodoById = async(req,res) => {
    try {
        const {id} = req.query
        const todo = await Todo.findById(
            id
        )
        if(!todo){
            return res.status(404).json({ message: 'Todo not found', error: '' }); 
        }
        return res.status(200).json(todo)
    } catch (error) {
        res.status(400).json({
            message: 'Error getting article',
            error: JSON.stringify(error),
          });
    }
}


const getAllTodos = async(req,res) => {
    try {
        const page= Number(req.query?.page) || 1
        const limit = Number(req.query?.limit) || 5
        const skip = (page - 1)*limit
        const todo = await Todo.find().skip(skip).limit(limit)
        return res.status(200).json(todo)
    } catch (error) {
        res.status(400).json({
            message: 'Error getting todo',
            error: JSON.stringify(error),
          });
    }
}




module.exports = {createTodo,updateTodo,deleteTodo,getTodoById,getAllTodos}