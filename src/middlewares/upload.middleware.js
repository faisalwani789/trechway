import multer from 'multer'
import { CloudinaryStorage }  from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js"

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "trechway_uploads",       // Cloudinary folder
    allowed_formats: ["jpg", "png", "jpeg", "webp"], 
    // public_id:(req,file)=>`${Date.now()}-${Math.round()*1e9}-${file.originalname.split('.'[0])}`,
    transformation: [
      { width: 1000, height: 1000, crop: "limit" },
      {quality:'auto'},
      {fetch_format:'auto'}
    ] // optional
  },
});

const storage1=multer.diskStorage({
  destination:(req,file,cb)=>{

  }
  ,
  filename:(req,file,cb)=>{

  }
})
const upload = multer({ 
  storage,
  limits:{fileSize:5*1024*1024},
  fileFilter:(req,file,cb)=>{
    if(file.mimetype.startsWith('image/')) cb(null,true)
    else cb(new Error("only images are allowed"),false)
  }
 });

export default upload
