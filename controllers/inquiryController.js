import { response } from "express";
import Inquiry from "../models/inquiry.js";
import { isItCustomer } from "./userController.js";

export async function  addInquiry(req,res) {
    if(req.user == null){
        res.status(401).json({
            message : "please login to the system and try again"
        })
        return;
    }
    
    try{
        if(isItCustomer(req)){
            const data = req.body;
            data.email = req.user.email;
            data.phoneNumber = req.user.phoneNumber;

            let key = 0;
            const inquiries = await Inquiry.find().sort({key:-1}).limit(1);

            if(inquiries.length == 0){
                key = 1;
            }else{
                key = inquiries[0].key+1; 
            }

            data.key = key;

        const newInquiry = new Inquiry(data);
        const response = await newInquiry.save();
        res.json({
            message : "Inquiry added successfully",
            key : response.key
        })
    }
    }catch(error){
        console.error("Error adding inquiry:", error);
        res.status(500).json({ message: "Inquiry addition failed", error: error.message });
    }
}