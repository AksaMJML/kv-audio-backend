import Review from "../models/review.js";

export function addReview(req,res){
    if(req.user == null){
        res.status(401).json({
            message : "please login to the system and try again"
        })
        return;
    }
    
    const data = req.body;

    const newReview = new Review(data);
    data.email = req.user.email;
    data.name = req.user.firstName + " " + req.user.lastName;
    data.profilePicture = req.user.profilePicture;
    

    newReview.save().then(()=>{
        res.json({
            message : "Review added succesfully"
        });
    }).catch((error)=>{
        console.log(error)
        res.status(500).json({
            message : "Review not added"
        });
    })
}

// "email": "user@domain.com",
//     "password": "password123", customer

// "email": "aksa@gmail.com",
//     "password": "123",
//     "role": "admin",