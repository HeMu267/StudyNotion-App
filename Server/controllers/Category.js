const Category=require("../models/Category");
exports.createCategory=async(req,res)=>{
    try{
        const {name,description}=req.body;
        if(!name || !description)
        {
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            });
        }
        await Category.create({
            name:name,
            description:description
        })
        return res.status(200).json({
            success:false,
            message:"Category created successfully"
        });
    }
    catch(err)
    {
        return res.status(500).json({
            success:false,
            message:err.message
        });
    }
}
exports.showAllCategories=async(req,res)=>{
    try{
        const allCategories=await Category.find({},{name:true,description:true});
        res.status(200).json({
            success:true,
            message:"All categories returned successfully",
            allCategories
        });
    }
    catch(err)
    {
        return res.status(500).json({
            success:false,
            message:err.message
        });
    }
}
exports.categoryPageDetails=async(req,res)=>{
    try{
        const {categoryID}=req.body;
        const selectedCategory=await Category.findById(categoryID)
                                            .populate("courses")
                                            .exec();
        if(!selectedCategory)
        {
            return res.status(404).json({
                success:false,
                message:"Data not found"
            });
        }
        let selectedCourses=selectedCategory.course;
        let differentCourses=[];
        const differentCategories=await Category.find({
            _id:{$ne:categoryID}
        });
        for(const category in differentCategories)
        {
            differentCourses.push(...category.courses);
        }
        const allCategories = await Category.find().populate("courses");
		const allCourses = allCategories.flatMap((category) => category.courses);
		const mostSellingCourses = allCourses
			.sort((a, b) => b.studentsEnrolled.length - a.studentsEnrolled.length)
			.slice(0, 10);

        return res.status(200).json({
            success:true,
            data:{
                selectedCourse:selectedCourses,
                differentCourses:differentCourses,
                mostSellingCourses:mostSellingCourses
            }
        });
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