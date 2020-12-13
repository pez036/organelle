const router = require("express").Router();
const auth = require("../middleware/auth");
const Event = require("../models/eventModel");
const nodemailer = require("nodemailer");
const moment = require("moment");

router.post("/add",auth,async (req, res) => {
    try{
        let {title, type, startTime, endTime, priority, description, courseName, canvasID} = req.body;
        const userID = req.user;
        if (!title || !priority) {
            return res.status(400).json({ msg: "Please fill out all required fields indicated by an asterik (*)." });
        }
        if (!type) {
            type = "uncategorized";
        }
        if (!startTime||!endTime) {
            startTime = moment(Date.now()).startOf("day").toISOString();
            endTime = Date.now();
        }
        if (!description) {
            description = "";
        }
        if (!courseName) {
            courseName = null;
        }
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
router.post("/emailstart",auth, async (req, res) => {
    try{
        console.log("HERE");
        // var emailTask = cron.schedule('* * * * *', () => {
            console.log(req.body)
            const event1 = await Event.find({startTime: moment().startOf("day"), userID: req.user});
            const event2 = await Event.find({startTime: moment().add(1, "day").startOf("day"), userID: req.user});
            const event3 = await Event.find({startTime: moment().add(2, "day").startOf("day"), userID: req.user});
            console.log(event1);
            var transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'organelleplanner@gmail.com',
                    pass: 'organelle110'
                }
            });
            //send email only if events exist
            let message = "Hope you're having a fantastic day! Here are your deadline reminders for the next three days: \n\n";
            if(event1.length != 0){
                event1.forEach(e => message = message + e.title + "due at " + e.endTime + "\n");
                console.log(message);
            }
            else{
                message = message + "\nHorray! You have nothing due today!\n\n";
            }
            if(event2.length != 0){
                event2.forEach(e => message = message + e.title + "due at " + e.endTime + "\n");
                console.log(message);
            }
            else{
                message = message + "\nHorray! You have nothing due tomorrow!\n\n";
            }
            if(event3.length != 0){
                event3.forEach(e => message = message + e.title + "due at " + e.endTime + "\n");
                console.log(message);
            }
            else{
                message = message + "\nHorray! You have nothing due two days from now!\n\n";
            }
            
            transporter.sendMail({
            from: 'organelleplanner',
                to: req.body.email,
                subject: 'Deadline Reminder',
                text: message
            });
        // });
        // emailTask.start();
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
})




module.exports = router;
