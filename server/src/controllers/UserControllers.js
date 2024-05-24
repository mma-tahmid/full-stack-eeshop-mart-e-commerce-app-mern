const bcryptss = require('bcrypt');
const usersModel = require("../models/userModel")
var jwt = require('jsonwebtoken');


// User Registration

exports.Registration = async (req, res) => {

    try {
        const { name, email, password, phone, address } = req.body

        // validation
        if (!name) {
            return res.send({ errors: "Name is Required" })
        }

        if (!email) {
            return res.send({ errors: "Email is Required" })
        }

        if (!password) {
            return res.send({ errors: "password is Required" })
        }

        if (!phone) {
            return res.send({ errors: "Phone is Required" })
        }

        if (!address) {
            return res.send({ errors: "Address is Required" })
        }

        // Check existing users
        const existingUser = await usersModel.findOne({ email })

        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "Already Register Please Login",
            })
        }

        // new user can Register now 
        // create Hash password
        const salt = bcryptss.genSaltSync(10);
        const hash = bcryptss.hashSync(password, salt);

        //save
        const user = await new usersModel({
            name,
            email,
            password: hash,
            phone,
            address
        }).save()

        res.status(201).send({
            success: true,
            message: "user Register Successfully",
            output: user
        })

    }

    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Registration",
            error
        })

    }
}

// Login

exports.Login = async (req, res) => {

    try {

        const { email, password } = req.body

        // Validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid Email or Password"

            })
        }


        // check for existing user 
        const user = await usersModel.findOne({ email })

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is Not Resigtered",
            })
        }

        const isMatchingPassword = await bcryptss.compare(password, user.password) // .compare() by default compare function

        if (!isMatchingPassword) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password",
            })
        }


        //Create Token
        // Create token using sign() method

        const createToken = await jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" })

        // for Browser set Cookies directly

        //const { password: excludedPassword, role, ...otherDetails } = user.toObject();

        // res.cookie("access_token", createToken, {
        //     expires: new Date(Date.now() + 3600000),
        //     httpOnly: true
        // }).status(200).json({ ...otherDetails })


        res.status(200).send({
            success: true,
            message: "Login Successfully",
            userss: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address
            },
            createToken,
        })


        // for Mobile Apps get token through postman body  (then upper part will be remove)

        // res.status(200).send({
        //     success: true,
        //     message: "Login Successfully",
        //     output: { ...otherDetails },
        //     createToken,
        // })



    }

    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Login",
            error
        })
    }
}


// test Controller For authorization

exports.TestController = (req, res) => {
    res.send("protected Route")
}



