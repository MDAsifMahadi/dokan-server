import cloudinary from "cloudinary";
import env from "dotenv";
env.config();
cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
});


export default cloudinary;