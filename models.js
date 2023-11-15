const moongoose = require('mongoose')
const { Schema, model } = moongoose

const toDoListSchema = new Schema({
    id:String,
    description: String,
    status: String,
})

const ToDoList = model('ToDoList', toDoListSchema)

module.exports = {
    ToDoList
}