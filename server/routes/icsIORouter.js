const router = require("express").Router();
const auth = require("../middleware/auth");
const Event = require("../models/eventModel");
const multer = require("multer");
const ics = require("ics"); // parser
const ical = require("node-ical"); // loader
const fs = require("fs")

var upload = multer({ 
    dest: 'uploads/', 
    fileFilter: function (req, file, cb) {
        if (file.mimetype !== 'text/calendar') {
            req.fileValidationError = 'File not recognized.';
            return cb(null, false, new Error('File not recognized.'));
        }
        cb(null, true);
    }
})

router.get("/get", auth, async (req, res) => {
    const events = await Event.find({ userID: req.user });
    var arr = [];
    for (var i = 0; i < events.length; i++) {
        var event = events[i];
        var startDate = new Date(event.startTime);
        var endDate = new Date(event.endTime);
        function f(date) {
            return [date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes()];
        }
        var st = f(startDate);
        var ed = f(endDate);
        var evics = {
            title: event.title,
            description: event.description,
            categories: ["organelle"],
            start: st,
            end: ed,
        }
        arr.push(evics);
    }
    var str = ics.createEvents(arr).value.toString();
    fs.writeFileSync("temp/temp.ics", str, "utf8");
    res.download("temp/temp.ics");
})


router.post("/load", upload.single('file'), auth, async (req, res) => {
    if(req.fileValidationError) {
        return res.status(400).json({msg: req.fileValidationError});
    }

    ical.parseFile(req.file.path, function(err, data) {
        if(err) {
            return res.status(500).json({msg: err});
        }
        var evCount = 0;
        // --
        var userID = req.user;
        try{

            for(let k in data) {
                if (data.hasOwnProperty(k)) {
                    const ev = data[k];
                    if (data[k].type == 'VEVENT') {
                        var startTime = Date.parse(ev.start);
                        var endTime = Date.parse(ev.end);
                        var title = ev.summary;
                        var description = ev.description;
                        if(ev.categories) {
                            var type = ev.categories[0];
                        }
                        var priority = 2;
                        var courseName = null;
                        var canvasID = null;
                        const newEvent = new Event({title, type, startTime, endTime,
                            priority, description, courseName, userID, canvasID});
                        newEvent.save();
                        evCount += 1;
                    }
                }
            }
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({msg: err});
        }
        res.status(200).json({msg: evCount + " event(s) loaded"});
    });
})

module.exports = router;