//controllers/adminController.js
const User = require("../models/userModel");
const Supervisor = require("../models/supervisorModel");

const updateTeacher = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            firstName,
            lastName,
            image,
            department,
            position,
            supervisorCode,
            role,
        } = req.body;

        // 🔹 1. USER update
        const userUpdate = {};

        if (firstName !== undefined) userUpdate.firstName = firstName;
        if (lastName !== undefined) userUpdate.lastName = lastName;
        if (image !== undefined) userUpdate.image = image;
        if (role !== undefined) userUpdate.role = role; // 🔥 ROLE UPDATE

        const updatedUser = await User.findByIdAndUpdate(id, userUpdate, {
            new: true,
        }).select("-password");

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // 🔹 2. SUPERVISOR update
        const supervisorUpdate = {};

        if (department !== undefined) supervisorUpdate.department = department;
        if (position !== undefined) supervisorUpdate.position = position;
        if (supervisorCode !== undefined)
            supervisorUpdate.supervisorCode = supervisorCode;

        const updatedSupervisor = await Supervisor.findOneAndUpdate(
            { user: id },
            supervisorUpdate,
            { new: true },
        );

        return res.json({
            success: true,
            message: "Teacher updated successfully",
            user: {
                ...updatedUser.toObject(),
                supervisorProfile: updatedSupervisor,
            },
        });
    } catch (error) {
        console.error("UPDATE TEACHER ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

module.exports = {
    updateTeacher,
};
