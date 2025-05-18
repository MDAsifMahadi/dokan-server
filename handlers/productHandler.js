import cloudinary from "../config/cloudinary.js";
import { productInfo } from "../schema/schema.js";
const productHandler = {};

productHandler.createProduct = async (req, res) => {
    try {
        const {title, productDetails, additionalInfo, imgInfo} = req.body;
        
        if(productDetails?.length > 0  && imgInfo?.length > 0) {
            const newProductInfo = new productInfo({
                title,
                productDetails,
                imageURL : imgInfo,
                additionalInfo
            });
            await newProductInfo.save();
            res.status(200).json({
            message : "Detail was saved successfully."
            });
            return;
        }
        res.status(401).json({
            message : "Please add an image and write the product detail."
        })
    } catch (error) {

        res.status(500).json({
            message : "There was an error in server side."
        })
    }
}

productHandler.editProduct = async (req, res) => {
 try {
        const {id} = req.params;
        const {title, productDetails, additionalInfo, imgInfo} = req.body;
        if(productDetails?.length > 0  && imgInfo?.length > 0) {
            const newProductInfo = {
                title,
                productDetails,
                imageURL : imgInfo,
                additionalInfo
            };
            await productInfo.findByIdAndUpdate(id, newProductInfo)
            res.status(200).json({
            message : "Detail was updated successfully."
            });
            return;
        }
        res.status(401).json({
            message : "Please add an image and write the product detail."
        })
    } catch (error) {

        res.status(500).json({
            message : "There was an error in server side."
        })
    }
}

productHandler.getProduct = async (req, res) => {
    try {
        const result = await productInfo.find();
        res.status(200).json({
            data : result,
            message : "Detail was saved successfully."
        });
        
    } catch (error) {
        res.status(500).json({
            message : "There was an error in server side."
        })
    }
}

productHandler.getOneProduct = async (req, res) => {
    const {id} = req.params;
    try {
        const result = await productInfo.findById(id);
        res.status(200).json({
            data : result,
            message : "Detail was saved successfully."
        });
        
    } catch (error) {
        res.status(500).json({
            message : "There was an error in server side."
        })
    }
}

productHandler.deleteProduct = async (req, res) => {
    const {id} = req.params;
    
    try {
        const result = await productInfo.findById(id);
        result.imageURL.forEach(async ele => {
            await cloudinary.uploader.destroy(ele.public_id);
        });
        await productInfo.findByIdAndDelete(id);
        res.status(200).json({
            message : "Detail was deleted successfully."
        });
        
    } catch (error) {
        res.status(500).json({
            message : "There was an error in server side."
        })
    }
}

productHandler.imgUploader = async (req, res) => {
    try {
        const file = req.file;
        const result = await cloudinary.uploader.upload(file.path)
        const { secure_url, public_id} = result;
        res.status(200).json({
            message : "Image uploaded successfully.",
            data : {
                url : secure_url,
                public_id
            }
        })
    } catch (error) {
        res.status(500).json({
            message : "There was an error in server side."
        })
    }
}

productHandler.imgDeleter = async (req, res) => {
    try {
        const {id} = req.params;
        await cloudinary.uploader.destroy(id);
        res.status(200).json({
            message : "Image was deleted successfully.",
        })
    } catch (error) {
        res.status(500).json({
            message : "There was an error in server side."
        })
    }
}
export default productHandler;