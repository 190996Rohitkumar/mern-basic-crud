const express=require("express")
const app=express()
app.use(express.json())
const mongoose=require("mongoose")
const dotenv=require("dotenv")
const cors=require("cors")
app.use(cors())
dotenv.config()
const userroutes=require("./routes/userroute")
mongoose
    .connect(process.env.URI).then(()=>{
        console.log("connected")
    })
    .catch((error)=>{
        console.log("not connected",error)
    })

app.use(userroutes)
app.listen(process.env.PORT)
