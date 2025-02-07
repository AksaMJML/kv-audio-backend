import express from "express";
import { addInquiry, deleteInquiry, getInquiry } from "../controllers/inquiryController.js";


const inquiryRouter = express.Router();
inquiryRouter.post("/",addInquiry);
inquiryRouter.get("/",getInquiry);
inquiryRouter.delete("/:key",deleteInquiry);
export default inquiryRouter;