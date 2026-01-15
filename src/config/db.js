
const mongoose = require('mongoose');

const connection = mongoose.connect('mongodb+srv://sourabhflutterdev_db_user:v4Dcg3U1x9rxEMl5@cluster0.hsjybcz.mongodb.net/nodenotesapp?appName=Cluster0').then((value)=>{
    console.log('DB is connected!!');
});

module.exports = connection; 