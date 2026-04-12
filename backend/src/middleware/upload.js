// middleware/upload.js
const multer = require("multer");

const storage = multer.memoryStorage(); // memory-д хадгалж Cloudinary руу илгээх
const upload = multer({ storage });

module.exports = upload;
