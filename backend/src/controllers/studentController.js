// controllers/studentController.js
const mongoose = require("mongoose");
const User = require("../models/userModel");
const Student = require("../models/studentModel");

const getMyProfile = async (req, res) => {
    try {
        // middleware дээр populate хийсэн байгаа
        const user = req.user;

        res.json({
            success: true,
            user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

const updateStudentProfile = async (req, res) => {
    try {
        const userId = req.user._id;

        const { firstName, lastName, image, major, year, studentCode } =
            req.body;

        // 🔹 USER update object
        const userUpdate = {};
        if (firstName !== undefined) userUpdate.firstName = firstName;
        if (lastName !== undefined) userUpdate.lastName = lastName;
        if (image !== undefined) userUpdate.image = image;

        // 🔹 STUDENT update object
        const studentUpdate = {};
        if (major !== undefined) studentUpdate.major = major;
        if (year !== undefined) studentUpdate.year = year;
        if (studentCode !== undefined) studentUpdate.studentCode = studentCode;

        // 🔥 1. Update User
        const updatedUser = await User.findByIdAndUpdate(userId, userUpdate, {
            new: true,
        }).select("-password");

        // 🔥 2. Update Student
        const updatedStudent = await Student.findOneAndUpdate(
            { user: userId },
            studentUpdate,
            { new: true },
        );

        if (!updatedUser || !updatedStudent) {
            return res.status(404).json({
                success: false,
                message: "User or Student not found",
            });
        }

        return res.json({
            success: true,
            message: "Profile updated successfully",
            user: {
                ...updatedUser.toObject(),
                studentProfile: updatedStudent,
            },
        });
    } catch (error) {
        console.error("UPDATE PROFILE ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

module.exports = {
    getMyProfile,
    updateStudentProfile,
};
