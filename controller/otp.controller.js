const bcrypt = require('bcrypt')
const Otp = require('../models/Otp')
const User = require('../models/User')
const { checkOtp } = require('../utils/utility.function')
const { sendOtpEmail } = require('../utils/mail.function')


const sendOTPVerificationEmail = async (req, res) => {
    const { email } = req.body
    try {
        const randomOTP = `${Math.floor(1000 + Math.random() * 9000)}`;

        console.log(randomOTP)

        const hashedOTP = await bcrypt.hash(randomOTP, 10)

        await Otp.create({
            userId: req.user._id,
            otp: hashedOTP,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000,
        })
        await sendOtpEmail(randomOTP, email)
        res.status(200).send({
            akg: 0,
            status: "PENDING",
            message: `Verification otp mail sent successfully`,
            data: {
                userId: req.user._id,
                email: email,
            }
        });
    } catch (err) {
        res.status(500).send({
            status: "FAILED",
            message: `Error ${err}`,
        });

    }
}



const verifyOtp = async (req, res) => {
    const { email, otp } = req.body

    try {
        if (!email || !otp) {
            res.status(400).send({ message: 'Empty otp details are not allowed' })

        } else {
            const userOtpRecords = await Otp.find({ userId: req.user._id });

            console.log(userOtpRecords)

            if (userOtpRecords.length <= 0) {
                // no record found
                res.status(400).send({ message: `Account record doesn't exist or has been verified already. please sign up or log in.` })
            } else {
                // user otp record exist
                const { expiresAt } = userOtpRecords[0]
                const hashedOTP = userOtpRecords[0].otp

                if (expiresAt < Date.now()) {
                    // user otp has expired
                    await Otp.deleteMany({ userId: req.user._id });
                    res.status(200).send({ message: 'Code has expired. Please requiest again.' })

                } else {
                    const validOTP = await checkOtp(otp, hashedOTP);
                    if (!validOTP) {
                        // suplied otp is wrong
                        res.status(400).send({ message: 'Invalid code passed. Check your inbox.' })
                    } else {
                        // success
                        await User.updateOne({ _id: req.user._id }, { verified: true });
                        await Otp.deleteMany({ userId: req.user._id });
                        res.status(201).send({
                            akg: 1,
                            status: "VERIFIED",
                            message: `User email verified successfully`,
                        });
                    }
                }

            }

        }

    } catch (err) {
        res.status(500).send({
            status: "FAILED",
            message: `Error ${err}`,
        });

    }

}

module.exports = { sendOTPVerificationEmail, verifyOtp }
