const { addToList, getToDoList, deleteToDoList, updateListStatus, getToDoListById, deleteToDoListByStatus } = require('./controller')
const express = require('express')
const router = express.Router();

router.get('',(req, res)=>{
    res.status(200).json({msg: 'deployment sucessfully'})
})
router.post('/ToDoList',addToList)
router.get('/ToDoList',getToDoList)
router.delete('/ToDoList/:id',deleteToDoList)
router.put('/ToDoList/:id',updateListStatus)
router.get('/ToDoList/:id',getToDoListById)
router.delete('/ToDoListByStatus/:status',deleteToDoListByStatus)
module.exports = router
