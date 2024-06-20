const mongoose = require("mongoose");

// Function to establish a connection to the MongoDB database
exports.databaseconnection = () => {
    const URL = `mongodb+srv://mutyalakalyani211:ytLc6WR1fnXKUzyf@room.jkwe5qa.mongodb.net/WhatsappClone`; // MongoDB connection URL
    mongoose.connect(URL, {useNewUrlParser: true },{ useUnifiedTopology: true })

   var dbconnect = mongoose.connection

    dbconnect.on('error' , ()=>{
    console.log(`Mongo DB Connection Failed`);
   })

dbconnect.on('connected' , ()=>{
    console.log(`Mongo DB Connection Successfull`);
})
    
};
