// controllers/authController.js
const User = require("../../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Student = require("../../models/studentModel");
const Supervisor = require("../../models/supervisorModel");
const cloudinary = require("../../utils/cloudinary");

// JWT secret
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// 🔹 Login function
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 🔹 Profile-тай нь хамт авах
        const user = await User.findOne({ email })
            .populate("studentProfile")
            .populate("supervisorProfile");

        if (!user) {
            return res.status(401).json({ message: "Хэрэглэгч олдсонгүй" });
        }

        // Password check
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Нууц үг буруу" });
        }

        // Token үүсгэх
        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
            expiresIn: "5h",
        });

        res.json({
            status: "success",
            message: "Амжилттай нэвтэрлээ",
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                firstName: user.firstName,
                lastName: user.lastName,
                image: user.image,
                // 🔹 Profile-ууд
                studentProfile: user.studentProfile,
                supervisorProfile: user.supervisorProfile,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// 🔹 Protected route example
const getProfile = async (req, res) => {
    const user = await User.findById(req.user.id);
    res.json(user);
};

const getAllUsers = async (req, res) => {
    try {
        // User-ийг profile-тай нь хамтад нь авна
        const users = await User.find()
            .select("-password")
            .populate({
                path: "studentProfile", // studentProfile гэж virtual or ref байх ёстой
            })
            .populate({
                path: "supervisorProfile", // supervisorProfile
            });

        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

const getAllStudents = async (req, res) => {
    try {
        const students = await User.find({
            role: { $in: ["student"] },
        })
            .select("-password")
            .populate("studentProfile");

        res.status(200).json({
            success: true,
            data: students,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

const getAllTeachers = async (req, res) => {
    try {
        const teachers = await User.find({
            role: { $in: ["supervisor"] },
        })
            .select("-password")
            .populate("supervisorProfile");

        res.status(200).json({
            success: true,
            data: teachers,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

// 🔹 Admin only register function
const register = async (req, res) => {
    try {
        const { email, password, firstName, lastName, role } = req.body;

        // 🔹 Only Admin allowed
        // if (!req.user.role.includes("admin")) {
        //     return res.status(403).json({
        //         message: "Зөвхөн Admin эрхтэй хэрэглэгч бүртгэж болно",
        //     });
        // }

        // User check
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res
                .status(400)
                .json({ message: "Email аль хэдийн бүртгэгдсэн" });

        // Password hash
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // User create
        const newUser = await User.create({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            role, // array эсвэл string
        });

        let profile;

        // Role бүрээр profile үүсгэх
        if (role.includes("student")) {
            profile = await Student.create({
                user: newUser._id,
                studentCode: "",
                major: "",
                year: 1,
            });
        }

        if (role.includes("supervisor")) {
            profile = await Supervisor.create({
                user: newUser._id,
                supervisorCode: "",
                department: "",
                position: "",
            });
        }

        res.status(201).json({
            success: true,
            message: "Амжилттай бүртгэгдлээ",
            user: {
                id: newUser._id,
                email: newUser.email,
                role: newUser.role,
            },
            profile,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// 📌 Upload profile image
const uploadProfileImage = async (req, res) => {
    try {
        if (!req.file) {
            return res
                .status(400)
                .json({ success: false, message: "No file uploaded" });
        }

        // Cloudinary руу upload
        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: "profiles", resource_type: "image" },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                },
            );
            stream.end(req.file.buffer);
        });

        // MongoDB-д хадгалах
        req.user.image = result.secure_url;
        await req.user.save();

        res.status(200).json({ success: true, image: result.secure_url });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports = {
    login,
    getProfile,
    register,
    getAllUsers,
    uploadProfileImage,
    getAllStudents,
    getAllTeachers,
};
