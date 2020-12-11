const mongoose = require ('mongoose');

const todoSchema = new mongoose.Schema({
    task:String,
    done:Boolean,
    creationTime:Date,
    userId:mongoose.Schema.Types.ObjectId
})

const task=mongoose.model('task',todoSchema)
module.exports=task;