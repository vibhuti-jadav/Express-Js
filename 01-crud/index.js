import express from "express"

const app = express()

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("hello from server")
});


const port= process.env.PORT || 5000;

app.listen(port,(err)=>{
    if(err){
        console.log(err)
        return
    }

    console.log(`server running on port ${port}`)
});