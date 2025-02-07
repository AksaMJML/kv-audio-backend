import { response } from "express";
import Inquiry from "../models/inquiry.js";
import { isItAdmin, isItCustomer } from "./userController.js";

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

export async function getInquiry(req,res){
    try{
        if(isItCustomer(req)){
            const inquiries = await Inquiry.find({email:req.user.email});
            res.json(inquiries);
            return;
        }else if(isItAdmin(req)){
            const inquiries = await Inquiry .find();
            res.json(inquiries);
            return;
        }else{
            res.status(403).json({
                message : "You are not authorized to perform this action"
            })
            return;
        }
    }catch(error){
        console.error("Error view inquiry:", error);
        res.status(500).json({ message: "Inquiry getting failed", error: error.message });
    }
}

export async function deleteInquiry(req,res){
    try{
        if(isItAdmin(req)){
            const key = req.params.key;
            await Inquiry.deleteOne({key:key})
            res.json({
                message : "Inquiry deleted successfully"
            })
            return;
        }else if(isItCustomer(req)){
            const key = req.params.key;

            const inquiry = await Inquiry.findOne({key:key})
            if(inquiry == null){
                res.status(404).json({
                    message : "Inquiry Not Found"
                })
                return;
            }else{
                if(inquiry.email == req.user.email){
                    await Inquiry.deleteOne({key:key})
                    res.json({
                        message : "Inquiry deleted successfully"
                    })
                    return;
                }
            }
        }else{
            res.status(403).json({
                message : "You are not authorized to perform this action"
            })
            return;
        }
    }catch(error){
        console.error("Error delete inquiry:", error);
        res.status(500).json({ message: "Inquiry deleting failed", error: error.message });
    }
}