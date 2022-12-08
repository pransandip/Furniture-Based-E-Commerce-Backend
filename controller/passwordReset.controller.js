const bcrypt = require('bcrypt')
const User = require('../models/User')
const PasswordReset = require('../models/Password')
const { sendResetPasswordEmail } = require('../utils/mail.function')
const { checkResetString } = require('../utils/utility.function')
const { v4: uuidv4 } = require('uuid');

const forgotPassword = async (req, res) => {
    const { email } = req.body
    try {
        // check if email exist
        const exist = await User.findOne({ email: email })
        if (!exist) {
            return res.status(401).send({ message: 'No account with the supplied email exists!' });
        }

        //converting objectId to string
        const _id = exist._id.toString()

        // check if user is verified 
        if (!exist.verified) {
            return res.status(401).send({ message: `Email hasn't been verified yet.` });
        } else {
            // unique string
            const resetString = uuidv4() + _id;

            // First, we clear all the existing reset records
            await PasswordReset.deleteMany({ userId: _id })

            //hash the reset string
            const hashedResetString = await bcrypt.hash(resetString, 10)

            await PasswordReset.create({
                userId: _id,
                resetString: hashedResetString,
                createdAt: Date.now(),
                expiresAt: Date.now() + 3600000,
            })
            await sendResetPasswordEmail(resetString, email)
            res.status(200).send({
                akg: 0,
                status: "PENDING",
                message: `Password reset mail sent successfully`,
            });

        }

    } catch (err) {
        res.status(500).send({
            status: "FAILED",
            message: `Error ${err}`,
        });
    }
}


const resetPassword = async (req, res) => {
    const { email, resetString, newPassword } = req.body
    try {
        // check if email exist
        const exist = await User.findOne({ email: email })
        if (!exist) {
            return res.status(401).send({ message: 'No account with the supplied email exists!' });
        }

        //converting objectId to string
        const _id = exist._id.toString()

        const userResetPasswordRecord = await PasswordReset.findOne({ userId: _id })

        if (userResetPasswordRecord) {
            // password reset record exist
            const { expiresAt } = userResetPasswordRecord
            const hashedResetString = userResetPasswordRecord.resetString

            if (expiresAt < Date.now()) {
                // password reset string has expired
                await PasswordReset.deleteMany({ userId: _id });
                res.status(200).send({ message: 'Password reset request has expired. Please requiest again.' })

            } else {
                const validResetString = await checkResetString(resetString, hashedResetString);

                if (!validResetString) {
                    // suplied reset string is wrong
                    res.status(400).send({ message: 'Invalid reset string passed. Check your inbox.' })
                } else {
                    // success
                    // hash password again
                    const newhash = await bcrypt.hash(newPassword, 8)
                    await User.updateOne({ _id: exist._id }, { password: newhash });
                    await PasswordReset.deleteMany({ userId: _id });
                    res.status(201).send({
                        akg: 1,
                        status: "SUCCESS",
                        message: `Password has been reset successfully.`,
                    });

                }

            }

        } else {
            // no record found
            res.status(400).send({
                akg: 0,
                status: "FAILED",
                message: `Password reset request not found`,
            });

        }


    } catch (err) {
        res.status(500).send({
            status: "FAILED",
            message: `Error ${err}`,
        });

    }
}

module.exports = { forgotPassword, resetPassword }