require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const testRoutes = require("./routes/testRoutes");

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// ✅ CORS middleware (ЭНЭ МАШ ЧУХАЛ)
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    }),
);

app.get("/", (req, res) => {
    res.json({ message: "Server is running" });
});

// Routes ----------------------------------------------------------
// Test routes
app.use("/api/test", testRoutes);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
