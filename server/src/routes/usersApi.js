const express = require("express")

const userControllers = require("../controllers/UserControllers");
const { CheckNormalUser, CheckAdmin } = require("../middlewares/authMiddleware");



const router = express.Router();


router.post("/registration", userControllers.Registration);
router.post("/login", userControllers.Login);

// forgot Password 
router.post('/forgot-password', userControllers.ForgotPassword)

// Protected route auth 

router.get('/user-authentication', (req, res) => {
    res.status(200).send({ ok: true })
})


// test Route
// router.get('/test', CheckNormalUser, CheckAdmin, userControllers.TestController)

router.get('/test2', CheckNormalUser, userControllers.TestController)







module.exports = router;