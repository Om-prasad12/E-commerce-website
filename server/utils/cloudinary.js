const cloudinary = require('cloudinary').v2;
const fs = require('fs'); // ✅ Good ol' reliable


cloudinary.config({ 
        cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET 
    });

const upLoadOnCloudinary = async (filePath) => {
    try {
        if(!filePath) {
            throw new Error('File path is required');
        }
        //upload the file on cloudinary
        const uploadResult=await cloudinary.uploader.upload(filePath,{
              resource_type: 'auto',
              folder: 'ecommerce',
        })
        console.log('File uploaded successfully', uploadResult.url);
        return uploadResult;
    } catch (error) {
        fs.unlinkSync(filePath); // Delete the file from local storage
        return null;
    }
};

module.exports={ upLoadOnCloudinary };
