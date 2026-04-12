const express = require("express");
const {
    login,
    getProfile,
    register,
    getAllUsers,
    uploadProfileImage,
    getAllStudents,
    getAllTeachers,
} = require("../../controllers/Auth/authController");
const { protect } = require("../../middleware/authMiddleware");
const upload = require("../../middleware/upload");
const router = express.Router();

// Login route
router.post("/login", login);
router.post("/register", register);
router.get("/getProfile", protect, getProfile);
router.get("/getAllUsers", getAllUsers);
router.get("/getAllStudents", getAllStudents);
router.get("/getAllTeachers", getAllTeachers);
router.post(
    "/upload-profile",
    protect,
    upload.single("image"),
    uploadProfileImage,
);

module.exports = router;
