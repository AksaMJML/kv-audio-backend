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
        // image : {
        //     type : String,

        // },
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