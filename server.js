const express =require("express");
const connectDB=require("./config/db")

connectDB();
const app = express();

//connext a database

//INIT middleware
app.use(express.json({extended:false}));

app.get("/",(req,res)=>{
    res.json({
        msg:"success"
    });
});

// app.get

// app.use("/api/auth",require("./routes/auth"))
app.use("/api/users",require("./routes/users"))
app.use("/api/contacts",require("./routes/contacts"))
const PORT=process.env.PORT || 6000;

app.listen(PORT,()=>{
    console.log("server started on 5000")
})