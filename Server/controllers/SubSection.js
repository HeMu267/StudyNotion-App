const SubSection=require("../models/SubSection");
const Section=require("../models/Section");
const {uploadImageToCloudinary}=require("../utils/ImageUploader");
exports.createSubSection=async(req,res)=>{
    try{    
        const {sectionId,title,timeDuration,description}=req.body;
        const video=req.files.videoFile;
        if(!sectionId || !title || !timeDuration || !description)
        {
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            });
        }
        const uploadDetails=await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
        const subSectionDetails=await SubSection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl:uploadDetails.secure_url
        });
        const updateSection=await Section.findByIdAndUpdate({_id:sectionId},
            {
                $push:{
                    subSection:subSectionDetails._id
                }
            },
            {new:true}
        ).populate("subSection").exec();
        return res.status(200).json({
            success:false,
            message:"SubSection created successfully"
        })
    }
    catch(err)
    {
        return res.status(500).json({
            success:false,
            message:"Unable to create subsection,please try again",
            error:err.message
        });
    }
}
exports.updateSubSection=async(req,res)=>{
    try{
        const {subSectionName,subSectionID}=req.body;
        if(!subSectionName || !subSectionID)
        {
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            });
        }
        const subSection=await SubSection.findByIdAndUpdate(subSectionID,{subSectionName},{new:true});
        return res.status(200).json({
            success:true,
            message:"Section updated",
        });
    }
    catch(err)
    {
        return res.status(500).json({
            success:false,
            message:"Unable to update subsection,please try again",
            error:err.message
        });
    }
}
exports.deleteSubSection=async(req,res)=>{
    try{
        const {subSectionID}=req.body;
        if(!subSectionID)
        {
            return res.status(400).json({
                success:false,
                message:"Section Id not found"
            });
        }
        await Section.findByIdAndDelete(subSectionID);
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