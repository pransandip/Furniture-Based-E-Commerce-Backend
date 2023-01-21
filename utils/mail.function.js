const config = require('../config/config')
const nodeMailer = require('nodemailer')

const sendEmail = async (otp, to) => {
    let transporter = nodeMailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        auth: {
            user: config.EMAIL,
            pass: config.PASS,
        }
    });

    let mailOptions = {
        from: '"Ecomm" claymindsolutions10@outlook.com',
        to: to,
        subject: "Verify Your Email",
        html: `<p>Enter <b>${otp}</b> in the app to verify your email address and complete the process</p>
        <p>This code will <b>expire in 1 hour</b>.</p>`
    };

    console.log(mailOptions)
    
    transporter.sendMail(mailOptions, (err, results) => {
        if (err) {
            return res.status(400).send({ message: `${err}` });
        }
    })
};

module.exports = { sendEmail }