const mongoose = require("mongoose");

const testSchema = new mongoose.Schema(
    {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            auto: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        pass: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            default: "",
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model("Test", testSchema);
