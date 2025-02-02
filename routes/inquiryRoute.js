import express from "express";
import { addInquiry, getInquiry } from "../controllers/inquiryController.js";


const inquiryRouter = express.Router();
inquiryRouter.post("/",addInquiry);
inquiryRouter.get("/",getInquiry);
export default inquiryRouter;