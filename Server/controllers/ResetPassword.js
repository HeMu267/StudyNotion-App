const User=require("../models/User");
const mailSender=require("../utils/Mailsender");
const bcrypt=require("bcrypt");
const crypto=require("crypto");
exports.resetPasswordToken=async(req,res)=>{
    try{
        
        const email=req.body.email;
        const user=await User.findOne({email});
        if(!user){
            return res.json({
                success:false,
                message:"Your email is not registered with us"
            })
        }
        const token=crypto.randomUUID();
        const updatedDetails=await User.findOneAndUpdate({email},{
            token:token,
            resetPasswordToken:Date.now() + 5*60*1000
        })
        const url=`https"//localhost:3000/update-password/${token}`;
        await mailSender(email,"Password Reset Link",`Password Reset link is ${url}`);
        return res.json({
            success:true,
            message:"email is sent successfully please check and change password"
        })
    }
    catch(err)
    {
        console.log(err);
        console.log(err.message);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while reseting password"
        })
    }
}
exports.resetPassword=async(req,res)=>{
    try{

        const {password,confirmPassword,token}=req.body;
        if(password!=confirmPassword){
            return res.json({
                success:false,
                message:"Password not matching"
            })
        }
        const userDetails=await User.findOne({token});
        if(!userDetails)
        {
            return res.json({
                success:false,
                message:"token is invalid"
            })
        }
        if(userDetails.resetPasswordExpires < Date.now())
        {
            return res.json({
                success:false,
                message:"token is expired,please generate your token"
            });
        }
        const hashedPassword=await bcrypt.hash(password,10);
        await User.findOneAndUpdate({token},
            {password:hashedPassword},
            {new:true}
        );
        return res.status(200).json({
            success:true,
            message:"password reset successful"
        }
        )
    }
    catch(err)
    {
        console.log(err);
        console.log(err.message);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while reseting password"
        })
    }
}
