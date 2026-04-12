const express = require("express");
const {
    createTestData,
    createTestDataBulk,
    getTestData,
} = require("../controllers/testDataController");
const router = express.Router();

// POST create test
router.post("/createTestData", createTestData);
// Bulk create
router.post("/createTestDataBulk", createTestDataBulk);
// GET all tests
router.get("/getTestData", getTestData);

module.exports = router;
