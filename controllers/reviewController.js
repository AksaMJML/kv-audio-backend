import Review from "../models/review.js";


export function addReview(req,res){
    if(req.user == null){
        res.status(401).json({
            message : "please login to the system and try again"
        })
        return;
    }
    
    const data = req.body;

    data.email = req.user.email;
    data.name = req.user.firstName + " " + req.user.lastName;
    data.profilePicture = req.user.profilePicture;
    
    const newReview = new Review(data);
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

export function getReviews(req,res){

    const user = req.user;

    if(user == null || user.role != "admin"){
        Review.find({isApproved : true }).then((reviews)=>{
            res.json(reviews);
        })
        .catch((error) => res.status(500).json({ message: "Failed to fetch reviews", error }));
    return;
    }
    if (user.role === "admin") {
        Review.find()
          .then((reviews) => {
            res.json(reviews);
          })
          .catch((error) => {
            console.error("Error fetching all reviews:", error);
            res.status(500).json({ message: "Failed to fetch all reviews." });
          });
    }
}

export function deleteReview(req,res){
    const email = req.params.email;

        if(req.user == null){
            res.status(404).json({
                message: "No review found with the given email",
            })
            return;
        }

        if(req.user == "admin"){
            Review.deleteOne({ email: email })
            .then((result) => {
                res.json({
                    message: "Review deleted successfully",
                  });
                })
                .catch((error) => {
                  console.error("Error deleting review:", error);
                  res.status(500).json({
                    message: "Failed to delete review",
                    error,
                  });
                });
                return;
        }

        if(req.user == "customer"){
            if(req.user.email == email){
                Review.deleteOne({ email: email })
            .then((result) => {
                res.json({
                    message: "Review deleted successfully",
                  });
                })
                .catch((error) => {
                  console.error("Error deleting review:", error);
                  res.status(500).json({
                    message: "Failed to delete review",
                    error,
                  });
                });
            }else{
                res.status(404).json({
                    message : "You are not authorized to do this change"
                })
            }   
        }
    }

    export function approveReview(req, res) {
      const email = req.params.email;
    
      if (!req.user) {
        return res.status(401).json({ message: "Please login and try again" });
      }
    
      if (req.user.role === "admin") {
        Review.updateOne(
          { email: email }, // Find document by email
          { isApproved: true } // Update isApproved field
        )
          .then((result) => {
            if (result.matchedCount === 0) {
              return res.status(404).json({
                message: "No review found with the provided email.",
              });
            }
    
            if (result.modifiedCount === 0) {
              return res.status(400).json({
                message: "Review was not updated. It might already be approved.",
              });
            }
    
            res.json({ message: "Review approved successfully" });
          })
          .catch((error) => {
            console.error("Error approving review:", error);
            res.status(500).json({ message: "Review approval failed" });
          });
      } else {
        res
          .status(403)
          .json({ message: "Only admins can approve the reviews." });
      }
    }
    

      
//approve review we coded in class
//     export function approveReview(req,res){
//         const email = req.params.email;
    
//         if(req.user == null){
//             res.status(401).json({
//                 message : "please login and try again"
//             });
//             return;
//         }
    
//         if(req.user.role == "admin"){
//             Review.updateOne(
//                 {
//                     email : email
//                 },
//                 {
//                     isApproved : true
//                 }
//             ).then(()=>{
//                 res.json({
//                     message : "Review Updated Successfully"
//                 });
//             }).catch(()=>{
//                     res.json({
//                         message : "Review Approval Failed"
//                     });
//                 });
//         }else{
//             res.status(404).json({
//                 message : "You Are Not Admin. Only Admin Can Approve The Reviews"
//             });
//         }
// }


//     Review.deleteOne({ email: email })
//       .then((result) => {
//         if (result.deletedCount === 0) {
//           // No review was found with the given email
//           return res.status(404).json({
//             message: "No review found with the given email",
//           });
//         }}

  

// "email": "user@domain.com",
//     "password": "password123", customer

// "email": "aksa@gmail.com",
//     "password": "123",
//     "role": "admin",