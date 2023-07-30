const mongoose=require("mongoose");
const mailSender = require("../utils/Mailsender");
const otpSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60
    }
});
    
async function sendVerificationEmail(email,otp){
    try{
        let mailResponse=await mailSender(email,"Verification Email from StudyNotion",otp);
        console.log("Email sent successfully",mailResponse);
    }
    catch(err)
    {
        console.log("error in sending mail");
        console.log(err);
        console.log(err.message);
    }
}

otpSchema.pre("save",async function(next){
    await sendVerificationEmail(this.email,this.otp);
    next();
})
module.exports=mongoose.model("OTP",otpSchema);