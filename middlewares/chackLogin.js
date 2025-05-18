import jwt from "jsonwebtoken";
import { userModel } from "../schema/schema.js";
const chackLogin = async (req, res, next) => {
    try {
        const token = req.headers.token;
        if(!token) {
            res.status(401).json({
                message : "Please, login first."
            });
            return;
        }
        const verifyedUser = await jwt.verify(token, process.env.JWT);
        const user = await userModel.findById(verifyedUser.id);
        if(user) {
            req.user = user;
            next();
            return;
        }
        res.status(401).json({
                message : "Please, login first."
        });
    } catch (error) {
        res.status(500).json({
            message : "There was an error in server side."
        })
    }
}

export default chackLogin;