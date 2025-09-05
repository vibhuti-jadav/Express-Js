import express , { urlencoded }from "express"
import {fileURLToPath} from "url";
import path from "path"
import cors from "cors"


const app = express()
app.use(express.urlencoded({extended:true}))

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename)

app.use(express.static(path.join(__dirname,"/public")))

app.use(cors());

app.set("view engine","ejs");

let tasks = []
let idCounter = 1;


app.post("/add", (req, res) => {
    const taskName = req.body.newTask;
    if (taskName.trim()) {
        tasks.push({ id: idCounter++, name: taskName });
    }
    res.redirect("/");
});




app.post("/delete", (req, res) => {
    const taskId = parseInt(req.body.id);
    tasks = tasks.filter(task => task.id !== taskId);
    res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(task => task.id === taskId);
    if (!task) {
        return res.redirect("/");
    }
    res.render("edit", { task });
});


app.post("/edit/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    const updatedName = req.body.updatedTask;
    const task = tasks.find(task => task.id === taskId);
    if (task && updatedName.trim()) {
        task.name = updatedName;
    }
    res.redirect("/");
});

app.get("/",(req,res)=>{
    res.render("index",{tasks})
})

const port = 5000

app.listen(port,()=>{
    console.log("server running on port",port)
})