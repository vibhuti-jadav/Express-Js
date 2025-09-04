import express from "express"
import {fileURLToPath} from "url"
import path from "path"
import httpError from "./middleware/errorHandler.js";
import cors from "cors"

const app = express()

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

console.log("file", __filename);

console.log("folder", __dirname);

app.use(express.static(path.join(__dirname,"/public")));

app.use(cors());

app.set("view engine","ejs")



app.get("/",(req,res)=>{
    res.render("index")

})

app.use((req,res,next)=>{
    const error = new httpError("requsted route not found ",500);
})

app.use((req,res,error,next)=>{
    if(res.headerSent){
        next(error)
    }

    res.status(error.statusCode || 500).json({message:error.message || "somthing went wrong try again later"});
})



const port = 5000

app.listen(port,()=>{
    console.log("serve listen from on ",port)
})