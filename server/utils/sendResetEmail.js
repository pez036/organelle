const nodemailer = require('nodemailer');

function sendResetEmail(email, id) {
    try {
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'organelleplanner@gmail.com',
                pass: 'organelle110'
            }
        });
        const url = process.env.NODE_ENV === "production"?
        "http://organelle.pzny.xyz" : "http://localhost:3000"
        let message = `Click this link to reset your password: ${url}/reset/${id}`;
        transporter.sendMail({
            from: 'organelleplanner',
            to: email,
            subject: 'Organelle: your reset password link',
            text: message
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports = sendResetEmail;