//userModel.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        firstName: { type: String, default: "" },
        lastName: { type: String, default: "" },
        image: { type: String, default: "" },
        role: {
            type: [String],
            enum: [
                "student",
                "supervisor",
                "admin",
                "commission",
                "headofdepartment",
            ],
            required: true,
            default: "student",
        },
    },
    { timestamps: true },
);

userSchema.virtual("studentProfile", {
    ref: "Student",
    localField: "_id",
    foreignField: "user",
    justOne: true,
});

userSchema.virtual("supervisorProfile", {
    ref: "Supervisor",
    localField: "_id",
    foreignField: "user",
    justOne: true,
});

// Virtual-ийг JSON / Object-д гаргах
userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("User", userSchema);
