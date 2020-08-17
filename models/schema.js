const mongoose = require('mongoose')
const notesSchema = mongoose.Schema({
    note : {
        type : String ,
        required : true
    } ,
    date : {
        type : Date ,
        default : Date.now
    }  
})

module.exports = mongoose.model('Notes', notesSchema)