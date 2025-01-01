import User from "../models/user.js";
import bcrypt from "bcrypt";

export function registerUser(req,res){
   
    const data = req.body;

    data.password = bcrypt.hashSync(data.password,10)

    const newUser = new User(data);

    newUser.save().then(()=>
    {
        res.json ({
            message : "user added successfully"
        })
    }).catch((error)=>{
            res.status(500).json({error : "user registration failed"})
        
    }
    )
};

export function loginUser(req,res){

    const data = req.body;

    User.findOne({
        email : data.email   
    }).then(
        (user)=>{
            if(user == null){
                res.status(404).json({
                    error : "user not found"
                });
            }else{
                res.json({
                    message : "user found" , user : user
                });
            }
        }
    )

}