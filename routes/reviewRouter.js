import express from "express";
import { addReview,approveReview,deleteReview,getReviews } from "../controllers/reviewController.js";

const reviewRouter = express.Router();
reviewRouter.post("/",addReview);
reviewRouter.get("/",getReviews);
reviewRouter.delete("/:email",deleteReview);
reviewRouter.put("/approve/:email",approveReview);

// reviewRouter.get("/:email",
//     (req,res)=>{
//         console.log("This is email route")
//     }
// )

// reviewRouter.get("/approved",
//     (req,res)=>{
//         console.log("This is approved route") 
//     }
// )



export default reviewRouter;