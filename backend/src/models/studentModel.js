// models/Student.js
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        studentCode: String,
        major: String,
        year: Number,

        // 🔹 Нэг оюутан нэг багштай холбогдох
        supervisor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Supervisor",
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model("Student", studentSchema);
