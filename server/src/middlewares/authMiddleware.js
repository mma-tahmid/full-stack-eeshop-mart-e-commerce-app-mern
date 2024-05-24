var jwt = require('jsonwebtoken');
const usersModel = require('../models/userModel');

// Proteced Routes token base

// Verify Normal User 

exports.CheckNormalUser = async (req, res, next) => {

    try {
        const decode = jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY)

        req.userss = decode
        // req.user = decode

        next()

    }
    catch (error) {
        console.log(error)
    }

}

//Verify Admin

exports.CheckAdmin = async (req, res, next) => {

    try {
        const findUser = await usersModel.findById(req.userss.id) // this userss name come login Controller
        //const findUser = await usersModel.findById(req.user._id) // this userss name come login Controller

        if (findUser.role !== 1) {
            return res.status(401).send({
                success: false,
                message: "UnAuthorized Access"
            })
        }

        else {
            next()
        }

    }

    catch (error) {
        console.log(error)
        res.status(401).send({
            success: false,
            error,
            message: "Error in Admin Middleware"
        })
    }
}

