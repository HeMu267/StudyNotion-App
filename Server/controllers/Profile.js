const Course=require("../models/Course");
const Profile=require("../models/Profile");
const User=require("../models/User");
const {uploadImageToCloudinary} = require("../utils/ImageUploader");
const {DeleteImage}=require("../utils/DeleteImage");
exports.updateProfile=async(req,res)=>{
    try{
        const {dateOfBirth="",about="",contactNumber,gender}=req.body;
        const id=req.user.id;
        if(!contactNumber || !gender || !id)
        {
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        const userDetails=await User.findById(id);
        const profileID=userDetails.additionalDetails;
        const profile=await Profile.findByIdAndUpdate(profileID,{
            dateOfBirth:dateOfBirth,
            contactNumber:contactNumber,
            about:about,
            gender:gender
        })
        return res.status(200).json({
            success:false,
            message:"Profile updated",
            profile
        })
    }
    catch(err)
    {
        console.log(err)
        return res.status(500).json({
            success:false,
            message:"error updating profile"
        })
    }
}
exports.deleteAccount=async(req,res)=>{
    try{
        const id=req.user.id;
        const userDetails=await User.findById(id);
        if(!userDetails)
        {
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
        const User=await User.findById(id);
        const AllCourses=User.courses;
        await Course.find({
            '_id':{
                $in:AllCourses
            }
        },{
            $pull:{
                studentsEnrolled:id
            }
        });
        await User.findByIdAndDelete({_id:id});
        return res.status(200).json({
            success:true,
            message:"User is deleted successfully"
        })
    }
    catch(err)
    {
        console.log(err)
        return res.status(500).json({
            success:false,
            message:"error deleting profile"
        }) 
    }
}
exports.getAllUserDetails=async(req,res)=>{
    try{
        const id=req.user.id;
        const userDetails=await User.findById(id).populate("additionalDetails").exec();
        return res.status(200).json({
            success:true,
            message:"user data fetched successfully",
            userDetails
        })
    }
    catch(err)
    {
        console.log(err)
        return res.status(500).json({
            success:false,
            message:"error retrieving profile details"
        }) 
    }
}
exports.updateDisplayPicture=async(req,res)=>{
    try{
        const displayPicture=req.files.displayPicture;
        const userID=req.user.id;
        const image=await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        );
        console.log(image);
        const user=await User.findById(userID);
        const deleteResult=await DeleteImage(user.image);
        console.log(deleteResult);
        const updatedProfile = await User.findByIdAndUpdate(
            { _id: userID },
            { image: image.secure_url },
            { new: true }
        )
        res.send({
            success: true,
            message: `Image Updated successfully`,
            data: updatedProfile,
        })
    }catch(err)
    {
        return res.status(500).json({
            success: false,
            message: err.message,
          })
    }
}
exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      const userDetails = await User.findOne({
        _id: userId,
      })
        .populate("courses")
        .exec()
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};