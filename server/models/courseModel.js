const mongoose = require('mongoose');
const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    professor: {
        type: String
    },
    userID: { type : mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;