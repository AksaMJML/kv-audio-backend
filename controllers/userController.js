import User from "../models/user.js";

export function registerUser(req,res){
   
    const newUser = new User(req.body)

    newUser.save().then(()=>
    {
        res.json ({
            message : "user added successfully"
        }).catch((error)=>{
            res.status(500).json({error : "user registration failed"})
        })
    }
    )
};