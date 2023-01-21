const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const { sendResponseError } = require('../middleware/middleware')
const { checkPassword, newToken } = require('../utils/utility.function')

const signUpUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const exist = await User.findOne({ email: email })
    console.log(exist)
    if (exist) {
      return res.status(401).send({ message: 'User already exist' });
    }

    const hash = await bcrypt.hash(password, 8)

    await User.create({ ...req.body, password: hash })
    res.status(201).send({ massage: 'Successfully account opened' })
    return
  } catch (err) {
    console.log('Error : ', err)
    sendResponseError(500, 'Something wrong please try again', res)
    return
  }
}

const signInUser = async (req, res) => {
  const { password, email } = req.body
  console.log(req.body)
  try {
    const user = await User.findOne({ email })
    if (!!!user) {
      sendResponseError(400, 'You have to Sign up first !', res)
    }

    const same = await checkPassword(password, user.password)
    if (same) {
      let token = newToken(user)
      req.session.loggedin = true;
      req.session.email = email;
      res.status(200).send({ status: 'Ok', token })
      return
    }
    sendResponseError(400, 'InValid password !', res)
  } catch (err) {
    console.log('EROR', err)
    sendResponseError(500, `Error ${err}`, res)
  }
}

const logOutUser = (req, res) => {
  req.session.destroy();
  res.status(200).send({ akg: 1, message: 'Logout successfully' });
}

const getUser = async (req, res) => {
  res.status(200).send({ user: req.user })
}
module.exports = { signUpUser, signInUser, logOutUser, getUser }