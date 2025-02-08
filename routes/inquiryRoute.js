import express from "express";
import { addInquiry, deleteInquiry, getInquiry, updateInquiry } from "../controllers/inquiryController.js";


const inquiryRouter = express.Router();
inquiryRouter.post("/",addInquiry);
inquiryRouter.get("/",getInquiry);
inquiryRouter.delete("/:key",deleteInquiry);
inquiryRouter.put("/:key",updateInquiry);
export default inquiryRouter;