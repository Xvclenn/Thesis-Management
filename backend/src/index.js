require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const testRoutes = require("./routes/testRoutes");
const testDataRoutes = require("./routes/testDataRoutes");
const thesisRoutes = require("./routes/thesisRoutes");
const authRoutes = require("./routes/AuthRoutes/authRoutes");

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// ✅ CORS middleware (ЭНЭ МАШ ЧУХАЛ)
const allowedOrigins = [
    "http://localhost:3000",
    "https://thesis-management-one.vercel.app",
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("CORS not allowed"));
            }
        },
        credentials: true,
    }),
);

app.get("/", (req, res) => {
    res.json({ message: "Server is running" });
});

// Routes ----------------------------------------------------------
// Test routes
app.use("/api/test", testRoutes);
app.use("/api/testData", testDataRoutes);

// Thesis routes
app.use("/api/thesis", thesisRoutes);

// Auth routes
app.use("/api/auth", authRoutes);

// 404
app.use((req, res) => {
    res.status(404).json({ status: "error", message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        status: "error",
        message: err.message,
    });
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
