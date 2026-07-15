import multer from 'multer';
import {CloudinaryStorage} from "multer-storage-cloudinary";
import cloudinary from '../Config/cloudinary.js';


const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "BigSale",
        allowed_formats: ["jpg", "jpeg", "png", "webp"]
    }
});

const upload= multer({storage: storage, limits: {fileSize: 1024 * 1024 * 2}})

export default upload;