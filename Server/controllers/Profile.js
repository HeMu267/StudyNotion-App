const Course=require("../models/Course");
const Profile=require("../models/Profile");
const User=require("../models/User");
const mongoose = require("mongoose")
const {uploadImageToCloudinary} = require("../utils/ImageUploader");
const {DeleteImage}=require("../utils/DeleteImage");
const { convertSecondsToDuration } = require("../utils/secToDuration")
const CourseProgress=require("../models/CourseProgress")
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
      let userDetails = await User.findOne({
        _id: userId,
      })
        .populate({
          path: "courses",
          populate: {
            path: "courseContent",
            populate: {
              path: "subSection",
            },
          },
        })
        .exec()
      userDetails = userDetails.toObject()
      var SubsectionLength = 0
      for (var i = 0; i < userDetails.courses.length; i++) {
        let totalDurationInSeconds = 0
        SubsectionLength = 0
        for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
          totalDurationInSeconds += userDetails.courses[i].courseContent[
            j
          ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
          userDetails.courses[i].totalDuration = convertSecondsToDuration(
            totalDurationInSeconds
          )
          SubsectionLength +=
            userDetails.courses[i].courseContent[j].subSection.length
        }
        let courseProgressCount = await CourseProgress.findOne({
          courseID: userDetails.courses[i]._id,
          userId: userId,
        })
        courseProgressCount = courseProgressCount?.completedVideos.length
        if (SubsectionLength === 0) {
          userDetails.courses[i].progressPercentage = 100
        } else {
          // To make it up to 2 decimal point
          const multiplier = Math.pow(10, 2)
          userDetails.courses[i].progressPercentage =
            Math.round(
              (courseProgressCount / SubsectionLength) * 100 * multiplier
            ) / multiplier
        }
      }
  
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
  }
  
  exports.instructorDashboard = async (req, res) => {
    try {
      const courseDetails = await Course.find({ instructor: req.user.id })
  
      const courseData = courseDetails.map((course) => {
        const totalStudentsEnrolled = course.studentsEnrolled.length
        const totalAmountGenerated = totalStudentsEnrolled * course.price
  
        // Create a new object with the additional fields
        const courseDataWithStats = {
          _id: course._id,
          courseName: course.courseName,
          courseDescription: course.courseDescription,
          // Include other course properties as needed
          totalStudentsEnrolled,
          totalAmountGenerated,
        }
  
        return courseDataWithStats
      })
  
      res.status(200).json({ courses: courseData })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Server Error" })
    }
  }