// Import the required modules
const express = require("express")
const router = express.Router()

const { capturePayment, verifyPayment } = require("../controllers/Payments")
const { auth, IsInstructor, IsStudent, IsAdmin } = require("../middlewares/auth")
router.post("/capturePayment", auth, IsStudent, capturePayment)
router.post("/verifyPayment",auth,IsStudent,verifyPayment)
module.exports = router