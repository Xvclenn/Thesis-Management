const Thesis = require("../models/thesisModel");
const User = require("../models/userModel");
const Student = require("../models/studentModel");
const ThesisRequest = require("../models/thesisRequestModel");
const Supervisor = require("../models/supervisorModel");

// 📌 Create Thesis (Student submit)
const createThesis = async (req, res) => {
    try {
        // Auth middleware-аас user-г авах
        const userId = req.user?._id;

        // studentProfile-г populate хийх
        const user = await User.findById(userId).populate("studentProfile");

        if (!user?.studentProfile) {
            return res.status(401).json({
                success: false,
                message: "Student profile required",
            });
        }

        const studentId = user.studentProfile._id;

        console.log("Request body:", req.body);
        console.log("Creating thesis for student ID:", studentId);

        const newThesis = new Thesis({
            ...req.body,
            student: studentId, // student автоматаар оруулна
        });

        const savedThesis = await newThesis.save();
        res.status(201).json({
            success: true,
            data: savedThesis,
            message: "Сэдэв амжилттай хадгалагдлаа.",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// 📌 Bulk create (Admin/Teacher use)
const createThesisBulk = async (req, res) => {
    try {
        if (!Array.isArray(req.body)) {
            return res
                .status(400)
                .json({ success: false, message: "Array expected" });
        }

        const savedTheses = await Thesis.insertMany(req.body);
        res.status(201).json({
            success: true,
            data: savedTheses,
            count: savedTheses.length,
            message: "Create request successful",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// 📌 Get all Thesis (Role-д тохирсон)
const getThesis = async (req, res) => {
    try {
        const filter = {};

        // query-ээр шүүх (status)
        if (req.query.status) {
            filter.status = req.query.status;
        }

        // Auth middleware-аас user-г авч, studentProfile-г populate
        const userId = req.user?._id;
        const user = await User.findById(userId).populate("studentProfile");

        // Student зөвхөн өөрийнхөө сэдвүүдийг харна
        if (user.role.includes("student")) {
            if (!user.studentProfile) {
                return res.status(401).json({
                    success: false,
                    message: "Student profile required",
                });
            }
            filter.student = user.studentProfile._id;
        }

        const theses = await Thesis.find(filter)
            .populate("student", "studentCode firstName lastName")
            .populate("supervisor", "supervisorCode firstName lastName")
            .sort({ addedDate: -1 });

        res.status(200).json({
            success: true,
            data: theses,
            count: theses.length,
            message: "GET request successful",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// 📌 Get Thesis by ID
const getThesisById = async (req, res) => {
    try {
        const { id } = req.params;

        // Thesis-ийг student, supervisor талын мэдээлэлтэй хамт авах
        const thesis = await Thesis.findById(id)
            .populate("student", "studentCode firstName lastName")
            .populate("supervisor", "supervisorCode firstName lastName");

        if (!thesis) {
            return res
                .status(404)
                .json({ success: false, message: "Thesis not found" });
        }

        // ❗ Хандалтын хяналт
        if (req.user.role.includes("student")) {
            const studentId = req.user.studentProfile?._id?.toString();
            if (!studentId || thesis.student._id.toString() !== studentId) {
                return res
                    .status(403)
                    .json({ success: false, message: "Access denied" });
            }
        }

        res.status(200).json({ success: true, data: thesis });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// 📌 Edit Thesis by ID
const editThesis = async (req, res) => {
    try {
        const thesis = await Thesis.findById(req.params.id);
        if (!thesis) {
            return res
                .status(404)
                .json({ success: false, message: "Thesis not found" });
        }

        // ❗ Хандалтын хяналт
        if (req.user.role.includes("student")) {
            const studentId = req.user.studentProfile?._id?.toString();
            if (!studentId || thesis.student.toString() !== studentId) {
                return res
                    .status(403)
                    .json({ success: false, message: "Access denied" });
            }
        }

        const updatedThesis = await Thesis.findByIdAndUpdate(
            req.params.id,
            {
                ...req.body,
                editedDate: Date.now(), // шинэчилсэн огноо
            },
            {
                new: true,
            },
        );

        res.status(200).json({
            success: true,
            data: updatedThesis,
            message: "Сэдэв амжилттай засварлалаа.",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// 📌 Delete Thesis by ID
const deleteThesis = async (req, res) => {
    try {
        const thesis = await Thesis.findById(req.params.id);
        if (!thesis) {
            return res
                .status(404)
                .json({ success: false, message: "Thesis not found" });
        }

        // ❗ Хандалтын хяналт
        if (req.user.role.includes("student")) {
            const studentId = req.user.studentProfile?._id?.toString();
            if (!studentId || thesis.student.toString() !== studentId) {
                return res
                    .status(403)
                    .json({ success: false, message: "Access denied" });
            }
        }

        const deletedThesis = await Thesis.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            data: deletedThesis,
            message: "Сэдэв амжилттай устгалаа.",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

const createThesisRequest = async (req, res) => {
    try {
        const { supervisorId, description } = req.body;

        // console.log("TEST", supervisorId, description);

        // Логин хийсэн хэрэглэгчийн Student profile-ийг олох
        const student = await Student.findOne({ user: req.user._id });
        if (!student) {
            return res
                .status(404)
                .json({ message: "Student profile олдсонгүй" });
        }

        // console.log("STUDENT", student);

        // Supervisor байгаа эсэхийг шалгах
        const supervisor = await Supervisor.findById(supervisorId);
        if (!supervisor) {
            return res.status(404).json({ message: "Supervisor олдсонгүй" });
        }

        // console.log("SUPERVISOR", supervisor);

        // Давхар хүсэлт илгээсэн эсэхийг шалгах
        const existing = await ThesisRequest.findOne({
            student: student._id,
            supervisor: supervisorId,
        });
        if (existing) {
            return res.status(400).json({
                message: "Та энэ багшид аль хэдийн хүсэлт илгээсэн байна",
            });
        }

        const request = await ThesisRequest.create({
            student: student._id,
            supervisor: supervisorId,
            description,
        });

        console.log("REQ", request);

        res.status(201).json({
            message: "Хүсэлт амжилттай илгээгдлээ",
            data: request,
        });
    } catch (err) {
        res.status(500).json({
            message: "Серверийн алдаа",
            error: err.message,
        });
    }
};

// 🔹 Багш өөрт ирсэн хүсэлтүүдийг харах
// GET /api/thesis-requests/incoming
const getIncomingRequests = async (req, res) => {
    try {
        // Логин хийсэн хэрэглэгчийн Supervisor profile-ийг олох
        const supervisor = await Supervisor.findOne({ user: req.user._id });
        if (!supervisor) {
            return res
                .status(404)
                .json({ message: "Supervisor profile олдсонгүй" });
        }

        // console.log("SUPERVISOR", supervisor);

        const requests = await ThesisRequest.find({
            supervisor: supervisor._id,
        })
            .populate({
                path: "student",
                populate: {
                    path: "user",
                    select: "firstName lastName email image",
                },
            })
            .sort({ createdAt: -1 });

        // console.log("REQ", requests);
        res.status(200).json({
            success: true,
            data: requests,
            count: requests.length,
            message: "GET request successful",
        });
    } catch (err) {
        res.status(500).json({
            message: "Серверийн алдаа",
            error: err.message,
        });
    }
};

const getThesisByStudentId = async (req, res) => {
    try {
        const { studentId } = req.params;

        const theses = await Thesis.find({ student: studentId })
            .populate({
                path: "student",
                populate: {
                    path: "user",
                    select: "firstName lastName email",
                },
            })
            .populate({
                path: "supervisor",
                populate: {
                    path: "user",
                    select: "firstName lastName email",
                },
            })
            .sort({ addedDate: -1 });

        res.status(200).json({
            success: true,
            data: theses,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

module.exports = {
    createThesis,
    createThesisBulk,
    getThesis,
    getThesisById,
    editThesis,
    deleteThesis,
    createThesisRequest,
    getIncomingRequests,
    getThesisByStudentId,
};
