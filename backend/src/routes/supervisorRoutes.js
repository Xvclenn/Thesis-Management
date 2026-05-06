//routes/supervisorRoutes.js
const express = require("express");
const { authorize, protect } = require("../middleware/authMiddleware");
const {
    updateSupervisorProfile,
    getMyProfile,
} = require("../controllers/supervisorController");
const router = express.Router();

// 🔹 GET /supervisor/me → өөрийн profile авах
router.get("/me", protect, authorize("supervisor"), getMyProfile);
// 🔹 PUT /supervisor/profile → profile update
router.put(
    "/profile",
    protect,
    authorize("supervisor"),
    updateSupervisorProfile,
);

module.exports = router;
