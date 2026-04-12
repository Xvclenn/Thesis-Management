// models/Teacher.js
const mongoose = require("mongoose");

const supervisorSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        supervisorCode: String,
        department: String,
        departmentCode: String,
        position: String,
    },
    { timestamps: true },
);

module.exports = mongoose.model("Supervisor", supervisorSchema);
