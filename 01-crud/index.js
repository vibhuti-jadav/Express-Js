import express from "express"

const app = express()

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("hello from server")
});

const students =[
    {
        id:1,
        name:"vibhuti",
    },
    {
        id:2,
        name:"nihali",
    },
];

app.get("/student",(req,res)=>{
    if(students.length === 0){
        res.send("no student found");
    }
    res.json(students);
});

app.get("/student/:id",(req,res)=>{
    const id=parseInt(req.params.id);
    console.log("id",id);

    const students = students.find((std)=>std.id === id);

    if(!students){
        res.json("id not found");
        return;
    }

    res.json({message:"student data found",students});

})

const port= process.env.PORT || 5000;

app.listen(port,(err)=>{
    if(err){
        console.log(err)
        return
    }

    console.log(`server running on port ${port}`)
});