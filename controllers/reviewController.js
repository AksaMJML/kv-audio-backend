export function addReview(req,res){
    if(req.user == null){
        res.status(401).json({
            message : "please login to the system and try again"
        })
        return;
    }
    
    const data = req.body;

    const newReview = new Review(data);

    data.name = req.user.firstName + " " + req.user.lastName;
    data.profilePicture = req.user.profilePicture;
    data.email = req.user.emaile;

    newReview.save().then(()=>{
        res.json({
            message : "Review added succesfully"
        })
    }).catch(()=>{
        res.status(500).json({
            message : "Review not added"
        })
    })
}