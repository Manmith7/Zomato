export const verifyRestaurantRole =  (req,res,next)=>{
    console.log('====================================');
    console.log(req.role);
    console.log('====================================');
    if(req.role !== 'restaurant'){
        return res.status(400).json({success:false,message:"Unauthorized role"})
    }
    next();
}