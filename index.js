const express = require('express');
const app = express();

require('./src/config/db');

const authroutes = require('./src/controllers/authcontroller');
const notesroutes = require('./src/controllers/notescontroller');

const PORT = 4000 || 5000;

app.use(express.json());
app.use('/auth',authroutes);
app.use('/note',notesroutes);

app.listen(PORT,()=>{
    console.log(`Server is running on PORT = ${PORT}`);
});
