const mongoose = require("mongoose");

const thesisSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student", // Student model-д холбох
            required: true,
        },
        supervisor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Supervisor", // Баталдаг багш, optional
        },
        mongolian: { type: String, required: true },
        english: { type: String, required: true },
        description: { type: String },
        addedDate: { type: Date, default: Date.now },
        editedDate: { type: Date, default: Date.now },
        status: {
            type: String,
            enum: ["Хүлээгдэж байгаа", "Баталсан", "Татгалсан"],
            default: "Хүлээгдэж байгаа",
        },
        attachments: [
            {
                filename: String,
                url: String,
            },
        ],
        feedback: [
            {
                supervisor: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Supervisor",
                },
                comment: String,
                date: { type: Date, default: Date.now },
            },
        ],
    },
    { timestamps: true },
);

module.exports = mongoose.model("Thesis", thesisSchema);
