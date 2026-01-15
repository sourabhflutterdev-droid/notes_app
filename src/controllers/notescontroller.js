const express = require('express');
const notesmodel = require('../models/notesmodel');


const app = express();


app.post('/addnotes',async(req,res)=>{

    try{

        const {title,desc} = req.body;
        if(!title || !desc){
            return res.status(401).json({
                message : "enter required field's"
            });
        }

        const notes = new notesmodel({
            title : title,
            desc : desc
        });

        const response = await notes.save();

        return res.status(201).json({
            message : "Notes save successfully",
            notes : response
        });

    }
    catch(e){
        return res.status(500).json({
            message : "internal server error"
        });
    }

});

app.get('/getnotes',async(req,res)=>{

    try{

        const notesData = await notesmodel.find();

        if(!notesData){
             return res.status(400).json({
            message : "Notes not found",
        });
        }

        return res.status(200).json({
            message : "data fetched",
            notes : notesData
        });

    }catch(e){
        console.log(e);
        return res.status(500).json({
            message : "internal server error"
        });
    }

});


module.exports = app;