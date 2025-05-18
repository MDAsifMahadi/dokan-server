import express from "express";
import dotenv from "dotenv";
import userRputes from "./routes/userRutes.js";
import mongoose from "mongoose";
import productRputes from "./routes/productRoutes.js";
import cors from "cors";
const app = express();
dotenv.config();
const PORT =process.env.PORT || 4001;

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("DB connected");
    } catch (error) {
        console.log("DB connection falild");
    }
}

connectDB()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(userRputes);
app.use(productRputes);


app.get("/", (req, res)=> {
    res.json({
        message: "hellodsfdsfs "
    })
})
app.listen(PORT, ()=> {
    console.log(`server is runing at http://localhost:${PORT}`)
})