const express = require("express");
const { authorize, protect } = require("../middleware/authMiddleware");
const {
    updateStudentProfile,
    getMyProfile,
} = require("../controllers/studentController");
const router = express.Router();

// 🔹 GET /student/me → өөрийн profile авах
router.get("/me", protect, authorize("student"), getMyProfile);
// 🔹 PUT /student/profile → profile update
router.put("/profile", protect, authorize("student"), updateStudentProfile);

module.exports = router;
