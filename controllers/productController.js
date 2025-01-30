import Product from "../models/products.js";
import { isItAdmin } from "./userController.js";

export async function addProduct(req,res){
    console.log(req.user)

if(req.user == null){
    res.status(401).json({
        message : "please login to the system and try again"
    })
    
    return;
}

    if(req.user.role != "admin"){
        res.status(403).json({
            message : "You are not authorized to perform this action"
        })
        return
    }
    const data = req.body;
    const newProduct = new Product(data);

    try {
        await newProduct.save();
        res.status(201).json({ message: "Product added successfully", product: newProduct });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ message: "Product addition failed", error: error.message });
    }
}

//     const data = req.body;
//     const newProduct = new Product(data);
//     try{
//         await newProduct.save();
//         res.json({message : "Product added successfully"})
//     }catch(error){
//         res.status(500).json({message : "Product added failed"});
//     }
// } 
    // newProduct.save().then(()=>{
    //      res.json({
    //         message : "Product added successfully"
    //      });
    // }).catch((error)=>{
    //     res.status(404).json({
    //         error : "Product not added "
    //     });
    // })


export async function getProducts(req,res){
    // let isAdmin = isItAdmin(req)
    // if(req.user = null){
    //     if(req.user.role == "admin"){
    //         isAdmin = true;
    //     }
    // }
    try{
        if(req.user.role == "admin"){
            const products = await Product.find();
            res.json(products);
        }else{
            const products = await Product.find({isAvailable : true});
            res.json(products);
        }
    }catch(error){
        console.error("Error fetching all products:", error);
        res.status(500).json({message: "Failed to fetch all products."});
    }
}

export async function updateProduct(req,res){
    try{
        if(isItAdmin(req)){
            const key = req.params.key;
            const data = req.body;
            await Product.updateOne({key:key},data);
            res.status(200).json({
                message : "Product Details Updated Successfully"
            })
            return;
        }else{
            res.status(500).json({
                message : "You Are Not Authorized To Perform This Action"
            })
        }
    }catch(error){
        console.error("Error occured in update:", error);
        res.status(500).json({message: "Failed to update."});
    }
}

// export async function deleteProduct(req,res){
//     try{
//         if(isItAdmin(req)){
//             const key = req.params.key;
//             await Product.deleteOne({key:key});
//             res.status(200).json({
//                 message : "Product Deleted Successfully"
//             })
//         }else{
//             res.status(403).json({
//                 message : "You Are Not Authorized To Perform This ActionY"
//             })
//             return;
//         }
//     }catch(error){
//         console.error("Error occured:", error);
//         res.status(500).json({message: "Failed to delete."});
//     }
// }


export async function deleteProduct(req, res) {
    try {
        // Check if the user is an admin
        if (!isItAdmin(req)) {
            return res.status(403).json({ message: "You are not authorized to perform this action." });
        }

        const key = req.params.key;

        // Attempt to delete the product
        const deletedProduct = await Product.deleteOne({ key: key });

        // Check if a product was actually deleted
        if (deletedProduct.deletedCount === 0) {
            return res.status(404).json({ message: "Product not found. No deletion occurred." });
        }

        res.status(200).json({ message: "Product deleted successfully." });
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ message: "Failed to delete product.", error: error.message });
    }
}
