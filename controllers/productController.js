import Product from "../models/products.js";

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
    try{
        await newProduct.save();
        res.json({message : "Product added successfully"})
    }catch(error){
        res.status(500).json({message : "Product added failed"});
    }
    // newProduct.save().then(()=>{
    //      res.json({
    //         message : "Product added successfully"
    //      });
    // }).catch((error)=>{
    //     res.status(404).json({
    //         error : "Product not added "
    //     });
    // })
} 

export async function getProducts(req,res){

    const products = req.products;
    try{
        if(user.role == "admin"){
            const products = await Product.find(products);
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
