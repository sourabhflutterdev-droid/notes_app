const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
      email:{
        type:String,
        required:true,
        unique:true
    },
    password : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true
    },
    mobile : {
        type : String,
        required : true
    }
},{timestamps : true,timeseries : true});

const user = mongoose.model('users',userSchema);

module.exports = user;