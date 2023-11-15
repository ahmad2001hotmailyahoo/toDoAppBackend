const { addToList, getToDoList, deleteToDoList, updateListStatus, getToDoListById, deleteToDoListByStatus } = require('./controller')
const express = require('express')
const router = express.Router();

router.post('/ToDoList',addToList)
router.get('/ToDoList',getToDoList)
router.delete('/ToDoList/:id',deleteToDoList)
router.put('/ToDoList/:id',updateListStatus)
router.get('/ToDoList/:id',getToDoListById)
router.delete('/ToDoListByStatus/:status',deleteToDoListByStatus)
module.exports = router
