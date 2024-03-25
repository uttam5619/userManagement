import multer from "multer";
import path from "path";

const upload =multer({
    dest:'uploads/',
    limits: {fileSize: 20*1024*1024},

    storage: multer.diskStorage({
        destination: 'uploads/',
        filename: (req,file,cb)=>{
            cb(null, file.originalname)
        }
    }),

    fileFilter:(req, file, cb)=>{
        const extension = path.extname(file.originalname)
        if(extension!=='.png' && extension !=='.jpg' && extension !=='.jpeg' && extension !=='.webp'){
            cb(null, false)
            return
        }
        cb(null, true)
    }
})

export default upload