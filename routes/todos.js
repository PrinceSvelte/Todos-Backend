const express = require("express")
const router = express.Router()
const {createTodo,updateTodo,deleteTodo,getTodoById,getAllTodos} = require("../controllers/todos")

router.route('/create').post(createTodo)
router.route('/update').put(updateTodo)
router.route('/delete').delete(deleteTodo)
router.route('/getById').get(getTodoById)
router.route('/getAll').get(getAllTodos)


module.exports = router



