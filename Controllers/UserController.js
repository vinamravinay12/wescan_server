const admin = require('../firebase-service')
const dotenv = require("dotenv");
const e = require('express');
dotenv.config();

const db = admin.database()


exports.loginUser = async (req, res, next) => {

    try {

        let number = req.params.mobileNumber;

        const token = await admin.auth().createCustomToken(process.env.JWT_KEY)

        const userRef = db.ref("data/users").child(number)


        userRef.once("value", function (snapshot) {
            if (snapshot.val() !== null && snapshot.val()) {
                console.log(snapshot.val())
                userRef.update({ userType: "checked-in" })
                return res.status(200).json({
                    success: true,
                    message: "Login SuccessFul",
                    token: token,
                    data: snapshot.val()
                })
            } else {
                return res.status(422).json({
                    success: false,
                    message: "User with this phone number doesn't exist",
                    data: null
                })
            }
        }, function (error) {
            return res.status(500).json({
                success: false,
                message: "Unable to Login. Please try again!",
                data: null
            })
        })

    } catch (error) {
        console.log("error, " + error)
        return res.status(500).json({
            success: false,
            message: "Unable to Login. Please try again!",
            data: null
        });
    }
}



exports.createUser = async (req, res, next) => {

    try {
        const userRef = db.ref("data/users").child(req.body.phoneNumber)
        const token = await admin.auth().createCustomToken(process.env.JWT_KEY)
        console.log(req.body)
        userRef.set({
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            userType: req.body.userType,
            status: "checked-in"
        }, function (error) {
            if (error) {
                res.status(500).json({
                    success: false,
                    message: "Unable to Signup! Please try again",
                    data: null
                })
            } else {
                res.status(201).json({
                    success: false,
                    message: "Signed up Successfully",
                    token: token,
                    data: getUser(req.body)
                })
            }
        })

    } catch (error) {
        console.log("error, " + error)
        return res.status(500).json({
            success: false,
            message: "Unable to Signup. Please try again!",
            data: null
        });
    }
}



function getUser(userBody) {
    let user = {
        "fullName": userBody.name,
        "phoneNumber": userBody.phoneNumber,
        "userType": userBody.userType
    }
    return user
}


exports.checkout = async (req, res, next) => {

    try {
        let number = req.params.mobileNumber;

        const userRef = db.ref("data/users").child(number)

        userRef.update({
            userType: "checked-out"
        }, function (error) {
            if (error) {
                return res.status(422).json({
                    success: false,
                    message: "User with this phone number doesn't exist",
                    data: null
                })
            } else {
                return res.status(200).json({
                    success: true,
                    message: "Success",
                    data: "Checked-out Successfully"
                })
            }
        })

    } catch (error) {
        console.log("error, " + error)
        return res.status(500).json({
            success: false,
            message: "Unable to checkout. Please try again!",
            data: null
        });
    }
}

