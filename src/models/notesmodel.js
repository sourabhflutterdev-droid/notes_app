const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    }
},{timestamps : true,timeseries:true});

const notes =  mongoose.model('notes',notesSchema);

module.exports = notes;