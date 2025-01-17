import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email : {
            type : String,
            required : true,
            unique : true
        },

        password : {
            type : String,
            required : true
        },
        role : {
            type : String,
            required : true,
            default : "customer"
        },
        firstName :{
            type : String,
            required : true
        },
        lastName : {
            type : String,
            required : true
        },
        address : {
            type : String,
            required : true
        },
        phoneNumber : {
            type : String,
            required : true
        },
        profilePicture : {
            type : String,
            required : true,
            default : "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png"
        }
    }
);
    
const User = new mongoose.model("user",userSchema);
export default User;
