const express = require('express');
const user = require('../models/usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

app.post('/signup',async(req,res)=>{

    try{
        const {email,password,username,mobile} = req.body;
        if(!email || !password || !username || !mobile){
            return res.status(401).json({
                message : "All fields are required"
            });
        }
        const checkemail = await user.findOne({email});
        if(checkemail){
            return res.status(400).json({
                message : `User already exist with this email = ${email}`
            });
        }
        const hashpassword = await bcrypt.hash(password,10);
        const data = new user({
            email : email,
            password : hashpassword,
            username : username,
            mobile : mobile
        });
        const response = await data.save();
        return res.status(201).json({
            status : true,
            message : 'User created',
            userData : response
        });

    }catch(e){
        return res.status(500).json({
            status : false,
            message : "internal server error"
        });
    }

});

app.post('/signin',async(req,res)=>{

    try{

        const {email,password} = req.body;
        if(!email || !password){
            return res.status(401).json({
                message : "enter required field's"
            });
        }
        const existuser = await user.findOne({email});
        if(!existuser){
            return res.status(400).json({
                message : "email not verified"
            });
        }

        const isMatch = await bcrypt.compare(password,existuser.password);
        if(!isMatch){
            return res.status(400).json({
                message : "Enter wrong password"
            });
        }

        const token = await jwt.sign({id : existuser._id},'hgjgguyujgjguytugjguguggj',{expiresIn : '90d'});

        return res.status(201).json({
            message : 'Sign in Success',
            response : existuser,
            token : token
        });



    }catch(e){
        return res.status(500).json({
            status : false,
            message : "internal server error"
        });
    }

   

});


module.exports = app;