import express from "express"
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import reviewRouter from "./routes/reviewRouter.js";
import inquiryRouter from "./routes/inquiryRoute.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors(
    {
        origin : 
    }
));
app.use(express.json());

app.use(bodyParser.json());

app.use((req,res,next)=>{
    let token = req.header
    ("Authorization")

    if(token != null){
        token = token.replace("Bearer ", "")
        jwt.verify(token, process.env.JWT_SECRET,
            (err,decoded)=>{
                if(!err){
                    req.user = decoded;           
                }
            }
        );
    }
        next();
});

let mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl)

let connection = mongoose.connection
connection.once("open", ()=>{
    console.log("mongoDB connection stablished successfully")
})

app.use("/api/users",userRouter);
app.use("/api/Products",productRouter);
app.use("/api/reviews",reviewRouter);
app.use("/api/inquiry",inquiryRouter);

app.listen(3000,()=>{
    console.log("server is running on port 3000")
}); 