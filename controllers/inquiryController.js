import Inquiry from "../models/inquiry.js";

export async function  addInquiry(req,res) {
    if(req.user == null){
        res.status(401).json({
            message : "please login to the system and try again"
        })
        return;
    }
    const data = req.body;

    data.email = req.user.email;
    try{
        const newInquiry = new Inquiry(data);
        await newInquiry.save();
    }catch(error){
        console.error("Error adding inquiry:", error);
        res.status(500).json({ message: "Inquiry addition failed", error: error.message });
    }
}