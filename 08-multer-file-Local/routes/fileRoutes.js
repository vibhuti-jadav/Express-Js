import express from "express";

import uploads from "../middleware/fileUpload.js";

const router=express.Router()

router.post("/add",uploads.single("file"),(req,res,error)=>{
    try {
        if(error){
            if(error.code === "LIMIT_FILE_SIZE"){
                return res.status(400).json({error:"file size is too large"})
            }
        }

        res.status(201).json({message:"file uploaded successfully",file:req.file})
    } catch (error) {
        console.log(error)
    }
})

export default router;