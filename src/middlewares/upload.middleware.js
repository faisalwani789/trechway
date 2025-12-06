import multer from 'multer'
import { CloudinaryStorage }  from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js"

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "myapp_uploads",       // Cloudinary folder
    allowed_formats: ["jpg", "png", "jpeg", "webp"], 
    transformation: [{ width: 800, height: 800, crop: "limit" }] // optional
  },
});

const upload = multer({ storage });

module.exports = upload;
