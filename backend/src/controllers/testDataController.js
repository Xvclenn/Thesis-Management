const TestData = require("../models/testDataModel");

// POST /api/test/createTest
exports.createTestData = async (req, res) => {
    try {
        const newTest = new TestData(req.body);
        const savedTest = await newTest.save();
        res.status(201).json({ success: true, data: savedTest });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Bulk create
exports.createTestDataBulk = async (req, res) => {
    try {
        if (!Array.isArray(req.body)) {
            return res
                .status(400)
                .json({ success: false, message: "Array expected" });
        }

        const savedTests = await TestData.insertMany(req.body);
        res.status(201).json({ success: true, data: savedTests });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Get all tests
exports.getTestData = async (req, res) => {
    try {
        // Хүссэн query параметрээр шүүх боломжтой (жишээ: status)
        const filter = {};
        if (req.query.status) {
            filter.status = req.query.status; // ?status=Илгээсэн
        }

        const tests = await TestData.find(filter).sort({ addedDate: -1 }); // хамгийн сүүлд нэмсэнээс эхлэн
        res.status(200).json({ success: true, data: tests });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
