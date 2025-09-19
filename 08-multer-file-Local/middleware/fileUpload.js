import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"uploads/")
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+path.extname(file.originalname ))
    }
})

const uploads = multer({
    storage,
    limits:{filesize: 2 *1024 *1024},
    fileFilter:function(req,file,cb){
        const allowfile = ["image/jpg","image/png","image/jpeg"]

        if(!allowfile.includes(file.mimetype)){
            return cb(new Error("file type not allowed"))
        }
        cb(null,true)
    }
});

export default uploads; 