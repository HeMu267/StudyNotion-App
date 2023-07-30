const { all } = require("express/lib/application");
const Course=require("../models/Course");
const Category=require("../models/Category");
const User=require("../models/User");
const uploadImageToCloudinary=require("../utils/ImageUploader");
exports.createCourse=async(req,res)=>{
    try{
        const {courseName,courseDescription,whatYouWillLearn,price,category}=req.body;
        const thumbnail=req.files.thumbnailImage;
        if(!courseName || !courseDescription ||!whatYouWillLearn ||!price || !category || !thumbnail)
        {
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            });
        }
        const categoryDetails=await Category.findById(category);
        if(!categoryDetails)
        {
            return res.status(404).json({
                success:true,
                message:"category not found"
            })
        }
        const thumbnailImage=await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);
        const newCourse=await Course.create({
            courseName,
            courseDescription,
            instructor:req.user._id,
            whatYouWillLearn,
            price,
            category:categoryDetails._id,
            thumbnail:thumbnailImage.secure_url
        })
        await User.findByIdAndUpdate(
            {
                _id:req.user._id
            },{
                $push:{
                    courses:newCourse._id
                }
            },{
                new:true
            }
        )
        await Category.findByIdAndUpdate(
            {
                _id:categoryDetails._id
            },
            {
                $push:{
                    course:newCourse._id
                }
            }
        )
        return res.status(200).json({
            success:true,
            message:"Course Created successfully",
            data:newCourse,
        });
    }  
    catch(err)
    {
        console.log(err);
        return res.status(404).json({
            success:false,
            message:"Failed to create course",
            error:err.message
        })
    }

};
exports.showAllCourses=async(req,res)=>{
    try{
        const allCourses=await Course.find({});
        return res.status(200).json({
            success:true,
            message:"Data of all courses is fetched successfully",
            data:allCourses
        })
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Cannot fetch course data",
            error:err.message
        })
    }
}
exports.getCourseDetails=async(req,res)=>{
    try{
        const {courseID}=req.body;
        const courseDetails=await Course.find({_id:courseID}).populate({
            path:"instructor",
            populate:{
                path:"additionalDetails"
            }
        }).populate("category").populate("ratingAndReviews").populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        }).exec();
        if(!courseDetails)
        {
            return res.status(400).json({
                success:false,
                message:`Could not find any course with id ${courseID}`
            });
        }
        return res.status(200).json({
            success:true,
            message:"Course details fetched successfully",
            data:courseDetails
        })
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({
            success:false,
            message:err.message  
        })
    }
}
