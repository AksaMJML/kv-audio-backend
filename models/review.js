import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        email : {
            type : String,
            required : true,
            unique : true
        },
        name : {
            type : String,
            required : true
        },
        description : {
            type : String,
            required : true
        },
        date : {
            type : Date,
            required :true,
            default : Date.now
        },
        rating: {
            type: Number,
            required: true,
            min: 1, max: 5 
        },
        isApproved : {
            type : Boolean,
            required : true,
            default : false
        },
        profilePicture : {
            type : String,
            required : true,
            default : "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png"
        }
    }
)

const Review = new mongoose.model("Review",reviewSchema);
export default Review;