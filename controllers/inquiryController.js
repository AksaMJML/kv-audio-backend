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
        
        // if(isItAdmin(req)){
            
        //     const inquiry = await Inquiry.findOne({ key: key });
        //     if (!inquiry) {
        //         res.status(404).json({ message: "Inquiry Not Found" });
        //         return;
        //     }
        //     res.json({
        //         message : "Inquiry deleted successfully"
        //     })
        //     return;
        if (isItAdmin(req)) {
            const key = req.params.key;
            const inquiry = await Inquiry.findOne({ key: key });
        
            if (!inquiry) {
                res.status(404).json({ message: "Inquiry Not Found" });
                return;
            }
        
            // Perform delete operation
            const deleteResult = await Inquiry.deleteOne({ key: key });
            console.log("Delete result:", deleteResult);
        
            if (deleteResult.deletedCount === 0) {
                res.status(500).json({ message: "Failed to delete inquiry" });
                return;
            }
        
            res.json({ message: "Inquiry deleted successfully" });
            return;
        }else if (isItCustomer(req)) {
            // Customer can only delete their own inquiry
            const key = req.params.key;
            const inquiry = await Inquiry.findOne({ key: key });

            if (!inquiry) {
                res.status(404).json({ message: "Inquiry Not Found" });
                return;
            } 
            else {
                if (!req.user || !req.user.email) {
                    console.log("User object missing or incomplete");
                    res.status(403).json({ message: "Invalid user authentication" });
                    return;
                }

                if (inquiry.email === req.user.email) {
                    await Inquiry.deleteOne({ key: key });
                    res.json({ message: "Inquiry deleted successfully" });
                    return;
                } 
                else {
                    console.log("Unauthorized user trying to delete someone else's inquiry");
                    res.status(403).json({ message: "You are not authorized to delete this inquiry" });
                    return;
                }
            }
        } 
        else {
            console.log("Unauthorized access detected");
            res.status(403).json({ message: "You are not authorized to perform this action" });
            return;
        }
    }catch(error){
        console.error("Error delete inquiry:", error);
        res.status(500).json({ message: "Inquiry deleting failed", error: error.message });
    }
}

// export async function updateInquiry(req,res) {
//     try{
//         if(isItAdmin(req)){
//             const key = req.params.key;
//             const data = req.body;

//             await Inquiry.updateOne({key:key},data);
//             res.json({
//                 message : "Inquiry updated successfully"
//             })
//             return;
//         }else if (isItCustomer(req)) {
//             // Customer can only delete their own inquiry
//             const key = req.params.key;
//             const inquiry = await Inquiry.findOne({ key: key });

//             if (!inquiry) {
//                 res.status(404).json({ message: "Inquiry Not Found" });
//                 return;
//             } 
//             else {
//                 if (!req.user || !req.user.email) {
//                     console.log("User object missing or incomplete");
//                     res.status(403).json({ message: "Invalid user authentication" });
//                     return;
//                 }

//                 if (inquiry.email === req.user.email) {
//                     await Inquiry.updateOne({ key: key },{message : data.message});
//                     res.json({ message: "Inquiry updated successfully" });
//                     return;
//                 } 
//                 else {
//                     console.log("Unauthorized user trying to update someone else's inquiry");
//                     res.status(403).json({ message: "You are not authorized to update this inquiry" });
//                     return;
//                 }
//             }
//         } 
//         else {
//             console.log("Unauthorized access detected");
//             res.status(403).json({ message: "You are not authorized to perform this action" });
//             return;
//         }
//     }catch(error){
//         res.status(500).json({
//             message : "Inquiry updating failed", error: error.message
//         })
//     }
// }
export async function updateInquiry(req, res) {
    try {
        const key = req.params.key;
        const data = req.body;

        if (!key) {
            return res.status(400).json({ message: "Inquiry key is required" });
        }

        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({ message: "Update data is required" });
        }

        const inquiry = await Inquiry.findOne({ key: key });

        if (!inquiry) {
            return res.status(404).json({ message: "Inquiry not found" });
        }

        if (isItAdmin(req)) {
            // Admins can update any field
            await Inquiry.updateOne({ key: key }, data);
            return res.json({ message: "Inquiry updated successfully" });
        }

        if (isItCustomer(req)) {
            // Customers can only update their own inquiries
            if (!req.user || !req.user.email) {
                console.log("User object missing or incomplete");
                return res.status(403).json({ message: "Invalid user authentication" });
            }

            if (inquiry.email === req.user.email) {
                await Inquiry.updateOne({ key: key }, { message: data.message });
                return res.json({ message: "Inquiry updated successfully" });
            } else {
                console.log("Unauthorized user attempting to update another user's inquiry");
                return res.status(403).json({ message: "You are not authorized to update this inquiry" });
            }
        }

        console.log("Unauthorized access detected");
        return res.status(403).json({ message: "You are not authorized to perform this action" });

    } catch (error) {
        console.error("Error updating inquiry:", error);
        return res.status(500).json({ message: "Inquiry update failed", error: error.message });
    }
}
