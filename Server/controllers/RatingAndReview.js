const RatingAndReview=require("../models/RatingAndReview");
const Course=require("../models/Course");
exports.createRating=async(req,res)=>{
    try{
        const userID=req.user.id;
        const {rating,review,courseId}=req.body;
        const courseDetails=await Course.findOne({
            _id:courseId,
            studentsEnrolled:{$elemMatch:{
                $eq:userID 
            }}
        });
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"Student is not enrolled in the course"
            })
        }
        const alreadyReviewed=await RatingAndReview.findOne({
            user:userID,
            course:courseId
        });
        if(alreadyReviewed)
        {
            return res.status(403).json({
                success:false,
                message:"this course is already reviews and rated by you"
            });
        }
        const ratingReview=await RatingAndReview.create({
            rating,review,course:courseId,
            user:userID
        })
        const updatedCourse=await Course.findByIdAndUpdate(courseId,{
                $push:{ratingAndReviews:ratingReview._id}
        },{new:true}
        )
        return res.status(200).json({
            success:true,
            message:"Rating and Review created successfully",
            ratingReview
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
exports.getAverageRating=async(res,req)=>{
    try{
        const courseID=req.body.courseId;
        const result=await RatingAndReview.aggregate([
            {
                $match:{
                    course:new mongoose.Types.ObjectId(courseID)
                }
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg:"$rating"}
                }
            }
        ]);
        if(result.length>0)
        {
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating
            })
        }
        return res.status(200).json({
            success:true,
            message:"Average rating is 0, no rating given",
            averageRating:0
        })
    }
    catch(err)
    {
        console.log(err);
        return res.status.json({
            success:false,
            message:"Unable to retrieve avg rating",
            error:err.message
        })
    }
}
exports.getAllRating=async(req,res)=>{
    try{
        const allReviews=await RatingAndReview.find({}).sort({rating:"desc"}).
        populate({
            path:"user",
            select:"firstName lastName email image",
        }).populate({
            path:"course",
            select:"courseName"
        }).exec();
        return res.status(200).json({
            success:true,
            message:"all reviews fetched successfully",
            data:allReviews 
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