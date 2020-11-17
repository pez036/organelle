const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    type: {type: String},
    startTime: { type : Date, default: Date.now()},
    endTime: { type : Date, default: Date.now()},
    priority: {type: Number},
    description: {type: String},
    courseID: { type : mongoose.Schema.Types.ObjectId, ref: 'Course' },
    userID: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required : true
    }
});

module.exports = Event = mongoose.model("Event", eventSchema);