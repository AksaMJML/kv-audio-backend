import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema({
    key : {
        type : Number,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    message : {
        type : String,
        required : true
    },
    phoneNumber : {
        type : Number,
        required : true
    },
    date : {
        type : Date,
        required : true,
        default : Date.now()
    },
    response : {
        type : String,
        required : false,
        default : ""
    },
    isResolved : {
        type : Boolean,
        required : true,
        default : false
    }
})

const Inquiry = new mongoose.model("Inquiry",inquirySchema);
export default Inquiry;