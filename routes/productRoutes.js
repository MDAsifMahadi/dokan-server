import { Router } from "express";
import upload from "../middlewares/multer.js";
import productHandler from "../handlers/productHandler.js";
import chackLogin from "../middlewares/chackLogin.js";

const productRputes = Router();


productRputes.post("/api/createproduct", chackLogin, productHandler.createProduct);

productRputes.post("/api/editproduct/:id",chackLogin, productHandler.editProduct);

productRputes.get("/api/getproduct",chackLogin, productHandler.getProduct);

productRputes.get("/api/getoneproduct/:id",chackLogin, productHandler.getOneProduct);

productRputes.delete("/api/deleteproduct/:id",chackLogin, productHandler.deleteProduct);



productRputes.post("/api/imguploader",chackLogin, upload.single('photo'), productHandler.imgUploader);

productRputes.delete("/api/imgdeleter/:id",chackLogin, productHandler.imgDeleter);

export default productRputes;
