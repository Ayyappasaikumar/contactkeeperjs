const mongoose =require("mongoose");
const config =require("config");
// const { connect } = require("http2");
const db =config.get("mongoURI");


const connectDB =()=>{
 console.log(db);
  
 mongoose.connect(db,{
        useNewUrlParser:true,
       
        useUnifiedTopology:true

    }).then(console.log("MongoDB connected"))
    

    .catch(err => console.log(err))
  }
module.exports=connectDB;