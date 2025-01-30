import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        key : {
            type : String,
            required : true,
            unique : true
        },
        name : {
            type : String,
            required : true
        },
        price : {
            type : Number,
            required : true
        },
        image : {
            type : [String],
            required : true,
            default : ["https://via.placeholder.com/300?text=No+Image+Available"]
        },
        category : {
            type : String,
            require : true,
            default : "uncatogorized"
        },
        dimensions : {
            type : String,
            required : true
        },
        description : {
            type : String,
            required : true
        }
        ,
        isAvailable : {
            type : Boolean,
            required : true,
            default : true
        } 
    }
);

const Product = new mongoose.model("Product",productSchema);
export default Product;