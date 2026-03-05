const express = require("express");
const {
    getTest,
    createTest,
    editTest,
    deleteTest,
    getTestById,
} = require("../controllers/testController");
const router = express.Router();

router.get("/getTestById/:id", getTestById);
router.get("/getTest", getTest);
router.post("/createTest", createTest);
router.put("/editTest/:id", editTest);
router.delete("/deleteTest/:id", deleteTest);

module.exports = router;
