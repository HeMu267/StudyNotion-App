const User=require("../models/User");
const OTP=require("../models/OTP");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const otpGenerator=require("otp-generator");
const Profile=require("../models/Profile");
const passwordUpdated=require("../Mails/Templates/passwordUpdate");
const mailSender=require("../utils/Mailsender");
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
        return res.status(200).json({
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
exports.refreshToken=async(req,res)=>{
    try{
        const refreshToken=req.body.refreshToken;
        const userID=jwt.verify(refreshToken,process.env.JWT_REFRESH_SECRET);
        const userID1=userID.id
        const user=await User.findById(userID1);
        const payload={
            email:user.email,
            id:user._id,
            role:user.accountType
        }
        const token=jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:"1d"
        });
        user.token=token;
        user.refreshToken=refreshToken;
        user.password=undefined;
        const options={
                expires:new Date(Date.now()+ 10*24*60*60*1000),
                httpOnly:true
        }
        res.cookie("token",token,options);
        res.cookie("resfresh",refreshToken,options);
        res.status(200).json({
                success:true,
                token,
                refreshToken,
                user,
                message:"refresh token send successfully"
        })
    }
    catch(err)
    {
        console.error('Error refreshing token:', err.message);
        res.status(401).json({ message: 'Invalid refresh token' });
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
                accountType:user.accountType
            }
            const token=jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"1d"
            });
            const payload1={
                id:user._id
            }
            const refreshToken=jwt.sign(payload1,process.env.JWT_REFRESH_SECRET,{
                expiresIn:"10d"
            });
            user.token=token;
            user.refreshToken=refreshToken;
            user.password=undefined;
            const options={
                expires:new Date(Date.now()+ 3*24*60*60*1000),
                httpOnly:true
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                refreshToken,
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
		const userDetails = await User.findById(req.user.id);
        const {oldPassword,newPassword}=req.body;
        if(!oldPassword || !newPassword ){
            return res.status(401).json({
                success:false,
                message:"All fields are required,Please try again"
            });
        }
        console.log(oldPassword);
        if(await bcrypt.compare(oldPassword,userDetails.password)){
            const encryptedPassword = await bcrypt.hash(newPassword, 10);
            await User.findByIdAndUpdate(userDetails._id,{
                password:encryptedPassword
            });
            const body=passwordUpdated(userDetails.email);
            let mailResponse=await mailSender(userDetails.email,"Password Reset Succesful",body);
            return res.status(200).json({
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