import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {userModel} from "../schema/schema.js";
const userHandler = {};

userHandler.createUser = async (req, res) => {
    try {
        const {userName, email, password} = req.body;
        const findUserByEmail = await userModel.findOne({email})
        const findUserByUserName = await userModel.findOne({userName})

        if(!findUserByEmail && !findUserByUserName) {
            const newUser = new userModel({
                userName,
                email,
                password : await bcrypt.hash(password,10)
            });
            await newUser.save();
            res.status(201).json({
                message : "User was created successfully."
            })
            return;
        }
        res.status(400).json({
            message : "User was not created."
        })
      
    } catch (error) {

        res.status(500).json({
            message : "There was an error in server side."
        })
    }
}

userHandler.login = async (req, res) => {
    try {
        const {userName, email, password} = req.body;
        const user = await userModel.findOne({email});
        const chackPassword = await bcrypt.compare(password, user.password);
        if(chackPassword && userName === user.userName) {
            const token = jwt.sign({
                userName : user.userName,
                id : user._id
            },
            process.env.JWT,
            {
                expiresIn : "30d"
            }
            )
            res.status(201).json({
                message : "Login successfully.",
                token
            })
            return;
        }
        res.status(400).json({
            message : "Authentication failed."
        })
      
    } catch (error) {

        res.status(500).json({
            message : "There was an error in server side."
        })
    }
}

userHandler.chackLogin = async (req, res) => {
    try {
            const token = req.headers.token;
            if(!token) {
                res.status(401).json({
                    message : "Please login",
                    isLogin : false
                });
                return;
            }
            const verifyedUser = await jwt.verify(token, process.env.JWT);
            const user = await userModel.findById(verifyedUser.id);
            if(user) {
                res.status(200).json({
                    isLogin : true
                })
                return;
            }
            res.status(401).json({
                    message : "Please login",
                    isLogin : false
            });
        } catch (error) {
            res.status(500).json({
                message : "There was an error in server side."
            })
        }
}

export default userHandler;