const Test = require("../models/testModel");

// 🔹 Get Test By ID
const getTestById = async (req, res) => {
    try {
        const { id } = req.params;
        const test = await Test.findById(id);
        if (!test) {
            return res.status(404).json({ message: "Test not found" });
        }
        res.status(200).json({
            test,
            message: "GET request successful",
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 🔹 Get TEST
const getTest = async (req, res) => {
    try {
        const tests = await Test.find();
        const count = tests.length;
        res.status(200).json({
            tests,
            count,
            message: "GET request successful",
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 🔹 Create TEST
const createTest = async (req, res) => {
    try {
        const { name, pass, description } = req.body;
        const newTest = new Test({ name, pass, description });
        await newTest.save();
        res.status(201).json({
            newTest,
            message: "Test created successfully",
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 🔹 Edit TEST
const editTest = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, pass, description } = req.body;

        console.log(id, name, pass, description); // Debugging log

        const updatedTest = await Test.findByIdAndUpdate(
            id,
            { name, pass, description },
            { new: true },
        );

        console.log("updatedTest:", updatedTest); // Debugging log

        if (!updatedTest) {
            return res.status(404).json({ message: "Test not found" });
        }

        res.status(200).json({
            updatedTest,
            message: "Test updated successfully",
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 🔹 Delete TEST
const deleteTest = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTest = await Test.findByIdAndDelete(id);
        if (!deletedTest) {
            return res.status(404).json({ message: "Test not found" });
        }

        res.status(200).json({
            deletedTest,
            message: "Test deleted successfully",
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getTest, createTest, editTest, deleteTest, getTestById };
