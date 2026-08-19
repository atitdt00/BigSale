import multer from "multer"

const uploadError= (uploadMiddleware)=>{
    return (req, res, next)=>{
        uploadMiddleware(req, res, (error)=>{
            if(error.code === "LIMIT_FILE_SIZE"){
                if(error instanceof multer.MulterError){

                    return res.status(400).json({
                        success: false,
                        message: "Image size must be less than 3 MB",
                })
            }
            return res.status(400).json({
                success: false,
                message: error.message,
            })
        }
            if(error){
                return res.status(500).json({
                    success: false,
                    message: error.message,
                })
            }
            next();
        })
    }
}

export default uploadError;