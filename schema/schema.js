import {Schema, model} from "mongoose";

const userSchema = Schema({
    userName : {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
    },
    password : {
        type: String,
        required: true,
    }
});

const productSchema = Schema({
    title : {
        type : String,
        required : true
    },
    productDetails : {
        type : String,
        required : true,
    },
    imageURL : {
        type : [{
            url : {
                required : true,
                type : String
            },
            public_id : {
                type : String,
                required : true
            }
        }],
        required : true
    },
    additionalInfo : {
        type: [
            {
                type: String
            }
        ]
    }
})

export const productInfo = model("productInfo", productSchema);
export const userModel = model("users", userSchema);

