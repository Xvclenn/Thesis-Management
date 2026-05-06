//routes/adminRoutes.js
const express = require("express");
const { protect, authorize } = require("../middleware/authMiddleware");
const { updateTeacher } = require("../controllers/adminController");

const router = express.Router();

// 🔥 Admin only update teacher
router.put("/teacher/:id", protect, authorize("admin"), updateTeacher);

module.exports = router;
