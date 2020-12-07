const router = require("express").Router();
const auth = require("../middleware/auth");
const Event = require("../models/eventModel");
//const Axios = require("axios");

router.post("/add",auth,async (req, res) => {
    try{
        let {title, type, startTime, endTime, priority, description, courseName, canvasID} = req.body;
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
        if (!courseName) {
            courseName = null;
        }
        //if (!userID) {
            //userID = null;
        //}
        console.log(canvasID);
        if (canvasID) {
            const canvasEvent = await Event.findOne({canvasID: canvasID});
            if (canvasEvent) {
                return res
                .status(400)
                .json({ msg: "An event with this canvasID already exists." });
            }
        }
        const newEvent = new Event({title, type, startTime, endTime,
            priority, description, courseName, userID, canvasID});
        const savedEvent = await newEvent.save();
        res.json(savedEvent);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
})


router.get("/all",auth,async (req, res) => {
    const event = await Event.find({userID: req.user});
    res.json(event);
})

router.get('/time/:startTime', auth, async(req, res) => {
  try {
    //console.log(req.params.startTime);
    const event = await Event.find({startTime: req.params.startTime, userID: req.user});
    res.json(event);


  }
  catch (err) {
      res.status(500).json({ error: err.message });
  }

})

router.get("/:id", auth,async (req, res) => {
    const event = await Event.findOne({_id: req.params.id});
    res.json(event);
})


router.put('/:id', auth, async (req,res) => {
    try {
        const eventID = req.params.id;
        const userID = req.user;
        const event = Event.findOne({_id:eventID});
        if (!event) {
            return res.status(400).json({msg: "No event found by this id"})
        }
        let updated = await Event.findOneAndUpdate({_id : req.params.id}, {
            title: req.body.title,
            type: req.body.type,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            priority: req.body.priority,
            description: req.body.description,
            courseName: req.body.courseName
        });

        res.json(updated);
        /*Event.findByIdAndUpdate(req.params.id, req.body)
        res.json({msg:"Edit successfully"})*/
    }
    catch (err) {
        res.status(500).json({error: err.message})
    }
})

router.delete('/:id',  auth, async (req, res) => {
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
