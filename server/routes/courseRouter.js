const router = require("express").Router();
const auth = require("../middleware/auth");
const Course = require("../models/courseModel");

router.post("/add",auth,async (req, res) => {
    try{

        let {courseName,professor} = req.body;
        console.log(req.user);
        const userID = req.user;
        if (!courseName) {
            return res.status(400).json({ msg: "No courseName entered." });
        }
        const existingCourse = await Course.findOne({ courseName: courseName });
        if (existingCourse)
            return res
                .status(400)
                .json({ msg: "This course already exists." });

        if (!professor) {
            professor = "professor";
        }
        const newCourse = new Course({courseName,professor,userID});
        const savedCourse = await newCourse.save();
        res.json(savedCourse);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get("/all", auth,async (req, res) => {
    const course = await Course.find({userID: req.user});
    res.json(course);
})

router.get("/:name", auth,async (req, res) => {
    try {
        const course = await Course.findOne({userID: req.user, courseName: req.params.name});
        res.json(course._id);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
})

/*router.delete('/:id',  auth, async (req, res) => {
    try {
        const events= await Event.find({ userID: req.user, CourseID: req.params.id});
        if (!events) {
            return res.status(400).json({msg: "No event found in this course"});
        }
        const deleteEvents = await Event.deleteMany( { userID: req.user,"courseID" : req.params.id } );
        res.json(deleteEvents);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
})*/

router.delete('/:name',  auth, async (req, res) => {
    try {
        const course = await Course.findOne({ userID: req.user, courseName: req.params.name});
        if (!course) {
            return res.status(400).json({msg: "No course found for the user"});
        }
        const events= await Event.find({ userID: req.user, courseName: req.params.name});
        if (!events) {
            return res.status(400).json({msg: "No event found in this course"});
        }
        const deleteEvents = await Event.deleteMany( { userID: req.user,"courseName" : req.params.name } );
        const deleteCourse = await Course.deleteMany({ userID: req.user,"courseName" : req.params.name});
        res.json(deleteCourse);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
})


module.exports = router;