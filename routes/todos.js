const express = require("express")
const router = express.Router()
const {createTodo,updateTodo,deleteTodo,getTodoById,getAllTodos} = require("../controllers/todos")
const {checkUserRights} = require("../middleware/checkUserRights")

router.route('/create').post(createTodo)
router.route('/update').put(checkUserRights,updateTodo)
router.route('/delete').delete(checkUserRights,deleteTodo)
router.route('/getById').get(checkUserRights,getTodoById)
router.route('/getAll').get(getAllTodos)


module.exports = router



