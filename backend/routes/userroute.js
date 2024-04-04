const express=require("express")
const user=require("../models/userModel");
const router=express.Router()

router.get("/",async(req,res)=>{
    res.send("<h1>Hello</h1>")
})

router.get("/getalluser",async(req,res)=>{
    const allusers=await user.find()
    try{
        res.status(201).json(allusers)
    }catch(err){
        res.status(500).json({error:err.message})
    }
})

router.post("/post",async(req,res)=>{
    //console.log(req.body)
    const {name,email,age}=req.body;
    try{
        const userdata=await user.create({
            name:name,
            email:email,
            age:age
        })
        res.status(201).json(userdata)
    }catch(err){
        res.status(400).json({error:err.message})
    }
   
})

router.get("/singleuser/:id",async(req,res)=>{
   // console.log(req.params)
    const {id}=req.params
    try{
        const singleuser=await user.findById(id)
        res.status(201).json(singleuser)
    }catch(err){
        res.status(400).json({error:err.message})
    }
   
})

router.delete("/deleteuser/:id",async(req,res)=>{
    //console.log(req.params)
    const {id}=req.params
    try{
        const deleteuser=await user.findByIdAndDelete(id)
        res.status(200).json(deleteuser)
    }catch(err){
        res.status(400).json({error:err.message})
    }
   
})
router.post("/updateuser/:id",async(req,res)=>{
    //console.log(req.body)
    const {id}=req.params
    const {name,email,age}=req.body
    try{
        const updateduser=await user.findByIdAndUpdate(id,{
            name:name,
            email:email,
            age:age
        },{new:true})
        res.status(201).json(updateduser)
    }catch(err){
        res.status(400).json({error:err.message})
    }
   
})

module.exports=router