const mongoose = require("mongoose");

const thesisRequestSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student", // Student model-д холбох
            required: true,
        },
        supervisor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Supervisor", // Баталдаг багш, optional
            required: true,
        },
        description: {
            type: String,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model("ThesisRequest", thesisRequestSchema);
