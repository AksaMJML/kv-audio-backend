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
            type : date,
            required :true,
            default : date.now()
        },
        rating: {
            type: Number,
            required: true,
            min: 1, max: 5 
        },
        images: [String]
    }
)

const Review = new mongoose.model("Review",reviewSchema);
export default Review;