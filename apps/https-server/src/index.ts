import express from "express"
import {prisma} from "@repo/db"
const app=express()
app.use(express.json())
app.get("/",async (req,res)=>{
 res.send("this is express server")
})
app.post("/signup",async (req,res)=>{
    try{
      const username=req.body.username;
      const password=req.body.password;
      await prisma.user.create({data:{
        username,password}});
        res.send("created user ")
    }
    catch(err){
        res.json({err})}
})
app.listen(4242)