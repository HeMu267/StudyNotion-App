const Section=require("../models/Section");
const Course=require("../models/Course");
const SubSection=require("../models/SubSection");
exports.createSection=async(req,res)=>{
    try{
        const {sectionName,courseID}=req.body;
        if(!sectionName || !courseID)
        {
            return res.status(400).json({
                success:false,
                message:"Missing properties"
            }); 
        }
        const newSection=await Section.create({sectionName});
        const updatedCourse=await Course.findByIdAndUpdate(courseID,{
            $push:{
                courseContent:newSection._id
            }
        },//[] populate
        {new:true}).populate([
            {
                path:"courseContent",
                model:"Section",
                populate:{
                    path:"subSection",
                    model:"SubSection"
                }
            }
        ]).exec();
        return res.status(200).json({
            success:true,
            message:"Section created successfully",
            updatedCourse 
        })
    }
    catch(error)
    {
        return res.status(500).json({
            success:false,
            message:"Unable to create section,please try again",
            error:error.message
        });
    }
}
exports.updateSection=async(req,res)=>{
    try{
        const {sectionName,sectionId}=req.body;
        if(!sectionName || !sectionId)
        {
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            });
        }
        const section=await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true});
        return res.status(200).json({
            success:true,
            message:"Section updated",
            section
        });
    }
    catch(err)
    {
        return res.status(500).json({
            success:false,
            message:"Unable to update section",
            error:err.message
        });
    }
}
exports.deleteSection=async(req,res)=>{
    try{
        const {sectionId}=req.body;
        if(!sectionId)
        {
            return res.status(400).json({
                success:false,
                message:"Section Id not found"
            });
        }
        await Section.findByIdAndDelete(sectionId);
        return res.status(200).json({
            success:true,
            message:"Section deleted",
        });
    }
    catch(err)
    {
        return res.status(500).json({
            success:false,
            message:"Unable to delete section",
            error:err.message
        });
    }
}