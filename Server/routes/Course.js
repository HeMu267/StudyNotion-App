// Import the required modules
const express = require("express");
const router = express.Router();

// Import the Controllers

// Course Controllers Import
const {
  createCourse,
  showAllCourses,
  getCourseDetails,
} = require("../controllers/Course");


// Categories Controllers Import
const {
  showAllCategories,
  createCategory,
  categoryPageDetails,
} = require("../controllers/Category");

// Sections Controllers Import
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section");

// Sub-Sections Controllers Import
const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/SubSection");

// Rating Controllers Import
const {
  createRating,
  getAverageRating,
  getAllRating,
} = require("../controllers/RatingAndReview")

// Importing Middlewares
const { auth, IsInstructor, IsStudent, IsAdmin } = require("../middlewares/auth")

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Courses can Only be Created by Instructors
router.post("/createCourse", auth, IsInstructor, createCourse)
//Add a Section to a Course
router.post("/addSection", auth, IsInstructor, createSection)
// Update a Section
router.post("/updateSection", auth, IsInstructor, updateSection)
// Delete a Section
router.post("/deleteSection", auth, IsInstructor, deleteSection)
// Edit Sub Section
router.post("/updateSubSection", auth, IsInstructor, updateSubSection)
// Delete Sub Section
router.post("/deleteSubSection", auth, IsInstructor, deleteSubSection)
// Add a Sub Section to a Section
router.post("/addSubSection", auth, IsInstructor, createSubSection)
// Get all Registered Courses
router.get("/getAllCourses", showAllCourses)
// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails)

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here
router.post("/createCategory", auth, IsAdmin, createCategory)
router.get("/showAllCategories", showAllCategories)
router.post("/getCategoryPageDetails", categoryPageDetails)

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, IsStudent, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRating)

module.exports = router