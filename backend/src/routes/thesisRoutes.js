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
    getMyRequestedTeachers,
    rejectThesisRequest,
    approveThesisRequest,
    getApprovedStudents,
    sendMessage,
    getMessages,
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
router.get("/approved", protect, authorize("supervisor"), getApprovedStudents);
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

router.get(
    "/requests/my-teachers",
    protect,
    authorize("student"),
    getMyRequestedTeachers,
);

router.put(
    "/request/:id/reject",
    protect,
    authorize("supervisor"),
    rejectThesisRequest,
);

router.put(
    "/request/:id/approve",
    protect,
    authorize("supervisor"),
    approveThesisRequest,
);
router.post("/message", protect, sendMessage);
router.get("/messages/:id", protect, getMessages);

//
router.get("/student/:studentId", protect, getThesisByStudentId);

module.exports = router;
