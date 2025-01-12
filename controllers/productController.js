import Product from "../models/products.js";

export function addProduct(req,res){
    console.log(req.user)

if(req.user == null){
    res.status(401).json({
        message : "please login to the system and try again"
    })
    
    return;
}

    const data = req.body;
    const newProduct = new Product(data);
    newProduct.save().then(()=>{
         res.json({
            message : "Product added successfully"
         });
    }).catch((error)=>{
        res.status(404).json({
            error : "Product not added "
        });
    })
} 
