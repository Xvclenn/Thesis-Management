const express = require("express");
const {
    createThesis,
    createThesisBulk,
    getThesis,
    deleteThesis,
    editThesis,
    getThesisById,
    createThesisRequest,
    getIncomingRequests,
    getThesisByStudentId,
} = require("../controllers/thesisController");
const router = express.Router();
const { protect, authorize } = require("../middleware/authMiddleware");

// ✅ Create Thesis (Student only)
router.post("/createThesis", protect, authorize("student"), createThesis);

// ✅ Bulk create (Admin only)
router.post("/createThesisBulk", protect, authorize("admin"), createThesisBulk);

// ✅ Get all Thesis (Admin, Supervisor, Student)
router.get("/", protect, getThesis);

// ✅ Get Thesis by ID
router.get("/:id", protect, getThesisById);

// ✅ Edit Thesis (Admin, Supervisor, Student)
router.put("/:id", protect, editThesis);

// ✅ Delete Thesis (Admin, Supervisor, Student)
router.delete("/:id", protect, deleteThesis);

// ✅ Create Thesis Request (Student only)
router.post("/request", protect, authorize("student"), createThesisRequest);

// ✅ Get incoming Thesis Requests (Supervisor only)
router.get(
    "/requests/incoming",
    protect,
    authorize("supervisor"),
    getIncomingRequests,
);

//
router.get("/student/:studentId", protect, getThesisByStudentId);

module.exports = router;
