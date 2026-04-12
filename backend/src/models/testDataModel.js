const mongoose = require("mongoose");

const testDataSchema = new mongoose.Schema({
    mongolian: { type: String, required: true },
    english: { type: String, required: true },
    addedDate: { type: Date, default: Date.now },
    editedDate: { type: Date, default: Date.now },
    status: {
        type: String,
        enum: ["Илгээсэн", "Баталсан", "Татгалсан"],
        default: "Илгээсэн",
    },
    test: String,
    test1: String,
    test2: String,
    test3: String,
    test4: String,
    test5: String,
    test6: String,
    test7: String,
    test8: String,
    test9: String,
    test10: String,
});

module.exports = mongoose.model("TestData", testDataSchema);
