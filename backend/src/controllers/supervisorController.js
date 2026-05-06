// controllers/supervisorController.js
const mongoose = require("mongoose");
const User = require("../models/userModel");
const Supervisor = require("../models/supervisorModel");

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

const updateSupervisorProfile = async (req, res) => {
    try {
        const userId = req.user._id;

        const {
            firstName,
            lastName,
            image,
            department,
            position,
            supervisorCode,
        } = req.body;

        // 🔹 USER update object
        const userUpdate = {};
        if (firstName !== undefined) userUpdate.firstName = firstName;
        if (lastName !== undefined) userUpdate.lastName = lastName;
        if (image !== undefined) userUpdate.image = image;

        // 🔹 Supervisor update object
        const supervisorUpdate = {};
        if (department !== undefined) supervisorUpdate.department = department;
        if (position !== undefined) supervisorUpdate.position = position;
        if (supervisorCode !== undefined)
            supervisorUpdate.supervisorCode = supervisorCode;

        // 🔥 1. Update User
        const updatedUser = await User.findByIdAndUpdate(userId, userUpdate, {
            new: true,
        }).select("-password");

        // 🔥 2. Update Supervisor
        const updatedSupervisor = await Supervisor.findOneAndUpdate(
            { user: userId },
            supervisorUpdate,
            { new: true },
        );

        if (!updatedUser || !updatedSupervisor) {
            return res.status(404).json({
                success: false,
                message: "User or Supervisor not found",
            });
        }

        return res.json({
            success: true,
            message: "Profile updated successfully",
            user: {
                ...updatedUser.toObject(),
                supervisorProfile: updatedSupervisor,
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
    updateSupervisorProfile,
};
