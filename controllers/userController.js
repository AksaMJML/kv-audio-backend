import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; 
import dotenv from "dotenv";

dotenv.config();

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
                const isPasswordCorrect = bcrypt.compareSync(data.password, user.password);

                if (isPasswordCorrect) {
                    const token = jwt.sign({
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        role: user.role,
                        profilePicture : user.profilePicture
                    }, process.env.JWT_SECRET);
                    res.json({
                        message: "login successful",
                        token: token,
                    });
                }else {
                    res.status(404).json({
                        error: "login failed"
                    });
                } }
        }
    );

}

// import User from "../models/user.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";


// export function registerUser(req, res) {
//   const userData = req.body;

//   userData.password = bcrypt.hashSync(userData.password, 10);

//   const newUser = new User(userData);

//   newUser
//     .save()
//     .then((result) => {
//       res.status(201).json({
//         message: "User Registred Successfully",
//         result: result,
//       });
//     })
//     .catch((error) => {
//       res.status(400).json({
//         message: "User registration error",
//         error: error.message || error,
//       });
//     });
// }

// export function loginUser(req, res) {
//   const userData = req.body;

//   User.findOne({ email: userData.email }).then((user) => {
//     if (user == null) {
//       res.status(404).json({
//         error: "User Not Found",
//       });
//     } else {
//       const isPasswordCorrect = bcrypt.compareSync(
//         userData.password,
//         user.password
//       );

//       if (isPasswordCorrect) {
//         const token = jwt.sign(
//           {
//             firstName: user.firstName,
//             lastName: user.lastName,
//             email: user.email,
//             role: user.role,
//             profilePicture: user.profilePicture,
//           },
//           "kv-secret-89!"
//         );

//         res.json({ message: "Login Successfull", token: token });
//       } else {
//         res.json({ error: "Login Failed" });
//       }
//     }
//   });
// }

// export function isItAdmin(req){
//     let isAdmin = false;
    
//     if(req.user == null){
//         if(req.user.role == "admin"){
//             isAdmin = true;
//         }
//     }
//     return isAdmin;
// }

export function isItAdmin(req) {
    // Check if req.user exists
    if (!req.user) {
        return false; // No user, not an admin
    }

    // Check if the user's role is "admin"
    return req.user.role === "admin";
}

export function isItCustomer(req) {
    // Check if req.user exists
    if (!req.user) {
        return false; // No user, not a customer
    }

    // Check if the user's role is "customer"
    return req.user.role === "customer";
}
