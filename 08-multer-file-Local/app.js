import express from "express";
import fileRouter from "./routes/fileRoutes.js";

const app=express();

app.use(express.json())

app.use("/file",fileRouter)

app.get("/",(req,res)=>{
    res.status(200).json("hello from server")
})

const port = 5000

app.listen(port,()=>{
    console.log("server running on port",port)
})