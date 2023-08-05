const User=require("../models/User");
const OTP=require("../models/OTP");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const otpGenerator=require("otp-generator");
const Profile=require("../models/Profile");
require("dotenv").config();
exports.sendOTP=async(req,res)=>{
    try{
        const {email}=req.body;
        const checkUserPresent=await User.findOne({email});
        if(checkUserPresent)
        {
            return res.status(401).json({
                success:false,
                message:"User already exist"
            })
        }
        var otp=otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        })
        console.log("OTP generated",otp);
        var result=await OTP.findOne({otp:otp});
        while(result){
            otp=otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false
            })
            result=await OTP.findOne({otp:otp});
        }
        await OTP.create({email,otp});
        res.status(200).json({
            success:true,
            message:"OTP sent successfully",
            otp:otp
        })

    }
    catch(err)
    {
        console.log("Error in sending OTP");
        console.log(err);
        console.log(err.message);
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}
exports.signUp=async(req,res)=>{
    try{
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp
        }=req.body;
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return res.status(403).json({
                success:false,
                message:"All fields are required"
            });
        }
        if(password!==confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password and ConfirmPassword should be same"
            });
        }
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User is already registered please login"
            });
        } 
        const recentOTP=await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log(recentOTP);
        if(recentOTP.length===0)
        {
            return res.status(400).json({
                success:false,
                message:"OTP not found"
            })
        }else if(otp!==recentOTP[0].otp){
            return res.status(400).json({
                success:false,
                message:"Invalid otp"
            })
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const profileDetails=await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null
        })

        const user=await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password:hashedPassword,
            accountType,
            additionalDetails:profileDetails._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })
        return res.status(403).json({
            success:true,
            message:"User is registered",
            user
        })
    }
    catch(err)
    {
        console.log("Error in signing in");
        console.log(err);
        console.log(err.message);
        return res.status(500).json({
            success:false,
            message:"User cannot be registered"
        })
    }
}
exports.login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"Please fill all details"
            })
        }
        const user=await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"user not present"
            });
        }
        
        if(await bcrypt.compare(password,user.password)){
            const payload={
                email:user.email,
                id:user._id,
                role:user.accountType
            }
            const token=jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h"
            });
            user.token=token;
            user.password=undefined;
            const options={
                expires:new Date(Date.now()+ 3*24*60*60*1000),
                httpOnly:true
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"Logged in successfully"
            })
        }
        else{
            return res.status(401).json({
                success:false,
                message:"Password is incorrect"
            })
        }
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Login failure,please try again"
        })

    }
}
exports.changePassword=async(req,res)=>{
    try{
        const {email,oldPassword,newPassword,confirmNewPassword}=req.body;
        if(!oldPassword || !newPassword || !confirmNewPassword || !email){
            return res.status(401).json({
                success:false,
                message:"All fields are required,Please try again"
            });
        }
        const user=await User.findOne({email});
        if(newPassword==confirmNewPassword || await bcrypt.compare(oldPassword,user.password)){
            await User.findByIdAndUpdate(user._id,{
                password:newPassword
            });
            let mailResponse=await mailSender(email,"Password Reset Succesful","Your password has been reseted");
            return res.status(401).json({
                success:true,
                message:"Your password has been reset",
                mailResponse
            });
        }
        else{
            return res.status(401).json({
                success:false,
                message:"Password does not match"
            })
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Error changing password"
        });
    }
}