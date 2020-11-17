const router = require("express").Router();
const auth = require("../middleware/auth");
const Event = require("../models/eventModel");

router.post("/add", auth, async (req, res) => {
    try{
        let {title, type, startTime, endTime, priority, description, courseID} = req.body;
        console.log(req.user);
        const userID = req.user;
        if (!title || !priority) {
            return res.status(400).json({ msg: "Not all fields have been entered." });
        }
        if (!type) {
            type = "uncategorized";
        }
        if (!startTime||!endTime) {
            startTime = Date.now();
            endTime = Date.now();
        }
        if (!description) {
            description = "";
        }
        if (!courseID) {
            courseID = null;
        }
        const newEvent = new Event({title, type, startTime, endTime, 
            priority, description, courseID, userID});
        const savedEvent = await newEvent.save();
        res.json(savedEvent);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/all", auth, async (req, res) => {
    const event = await Event.find({userID: req.user});
    res.json(event);
})

router.delete('/:id', auth, async (req, res) => {
    try {
        const event = await Event.findOne({ userID: req.user, _id: req.params.id});
        if (!event) {
            return res.status(400).json({msg: "No event found in this id"});
        }
        const deleteEvent = await Event.findByIdAndDelete(req.params.id);
        res.json(deleteEvent);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
})

module.exports = router;