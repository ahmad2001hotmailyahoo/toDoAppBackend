const express = require('express')
const cors = require('cors')

const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const router = require('./router')

mongoose.connect('mongodb+srv://db_user_ahmad:db_user_ahmad_password@cluster0.8m2bd.mongodb.net/my_db')
.then(()=>{
    console.log("connected")
})
.catch( (err) => {
    console.log(err,"error while connecting")
})


app.use(bodyParser.json())
app.use(cors({ origin: '*' }))
app.use('/',router)

app.listen(5001, () => {
    console.log("server is runing at 5001")
})
