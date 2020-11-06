const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Err'+err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const courses = req.body.courses;

    const newUser = new User({username, email, courses});
    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Err'+err));
});

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Err'+err));
});

router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User deleted'))
    .catch(err => res.status(400).json('Err'+err));
});

//TODO, not efficient, can improve with update()
router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id)
    .then(user => {
        user.username = req.body.username.length > 0 ? req.body.username : user.username ;
        user.email = req.body.email.length > 0 ? req.body.email : user.email;

        user.save()
        .then(() => res.json('user updated'))
        .catch(err => res.status(400).json('Err'+err));
    })
    .catch(err => res.status(400).json('Err'+err));
});

router.route('/updateusername/:id').post((req, res) => {
    User.update({"_id": req.params.id},
        {"username": req.body.username})
    .then(() => res.json('username updated'))
    .catch(err => res.status(400).json('Err'+err));
});

router.route('/updateemail/:id').post((req, res) => {
    User.update({"_id": req.params.id},
        {"email": req.body.email})
    .then(() => res.json('email updated'))
    .catch(err => res.status(400).json('Err'+err));
});

module.exports = router;