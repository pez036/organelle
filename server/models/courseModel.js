const mongoose = require('mongoose');
const courseSchema = new mongoose.Schema({
    userID: { 
        type : mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    courseName: {
        type: String,
        required: true,
        trim: true,
    },
    professor: {
        type: String
    },
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;