const fs = require('fs')
const readFile = require("../utils/readFile")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const userModel = require("../models/user.model")
const Joi = require("joi")

const login = (req, res) => {
    const username = req.body.username
    const userPassword = req.body.password

    const result = readFile('user.json')

    const checkExistUser = result.find(item => item.username == username)

    if (!checkExistUser) {
        return res.status(404).json({ message: "khong tim thay user" })
    }

    const checkPassword = bcrypt.compareSync(userPassword, checkExistUser.password)

    if (!checkPassword) {
        return res.status(400).json({ messga: "sai mat khau" })
    }

    const token = jwt.sign({ userId: checkExistUser.userId }, process.env.SECRET_KEY, {
        expiresIn: "1d"
    })

    const { password, ...returnUser } = checkExistUser

    return res.status(200).json({ token, user: returnUser })
}

const getUser = (req, res) => {
    const data = fs.readFileSync('user.json')
    const result = readFile('user.json')

    return res.status(200).json({ result })
}

const createUser = async (req, res) => {
    const userSchema = Joi.object({
        username: Joi.string().min(6).max(32).required().messages({
            "string.min": "Username at least 6 characters",
            "string.max": "Username most 32 characters",
            "string.empty": "Username cannot empty",
        }),
        password: Joi.string().min(6).max(32).required().messages({
            "string.min": "Password at least 6 charactes",
            "string.max": "password max 32 character",
            "string.empty": "Password cannot be empty"
        })
    })

    const username = req.body.username
    const userPassword = req.body.password

    try {
        const validate = userSchema.validate(req.body)
        if (validate.error) {
            return res.status(400).json({ messages: validate.error.message })
        }

        const checkUser = await userModel.findOne({
            username: username
        })


        if (checkUser) {
            return res.status(400).json({ message: "User is exist" })
        }

        const salt = bcrypt.genSaltSync()
        const hash = bcrypt.hashSync(userPassword, salt)

        const user = new userModel({
            username: username,
            password: hash
        })

        const result = await user.save()

        return res.status(200).json({
            message: "Create user success",
            user
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "error" })
    }


} 

const deleteUser = (req, res) => {
    const deleteUser = req.params.id

    const result = readFile('user.json')

    const newResult = result.filter(item => item.userId != deleteUser)

    const writeToFile = fs.writeFileSync('user.json', JSON.stringify(newResult))

    return res.status(200).json({ messga: "delete user success" })

}

module.exports = {
    getUser,
    createUser,
    deleteUser,
    login
}