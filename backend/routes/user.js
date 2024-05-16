const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");

const { User, Account } = require("../db");
const { authMiddleware } = require("../middleware");
const JWT_SECRET = require("../config");

const router = express.Router();



{/*--------------------- SignUp ----------------------------------- */}

const signupSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
})

router.post("/signup", async (req, res) => {
    const body = req.body;
    const { success } = signupSchema.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username
    })

    if (user) {
        return res.status(411).json({
            message: "Email already taken/ Incorrect inputs"
        })
    }

    const dbUser = await User.create(body);
    const userId = dbUser._id;

    await Account.create({
        userId,
        balance: 1 * Math.random() * 10000
    })

    const token = jwt.sign({
        userId
    }, JWT_SECRET)

    res.status(200).json({
        message: "User created successfully",
        token: token,
        userId: userId
    })

})

{/*--------------------- SignIn ----------------------------------- */}

const signinSchema = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post("/signin", async (req, res) => {
    const { success } = signinSchema.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Email alerady taken/ Incorrect inputs"
        })
    }
   
    const user = await User.findOne({
        username: req.body.username
    })

    //console.log(user);

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);

        return res.json({
            token: token,
            userId:user._id,
            
        })
    }

    res.status(411).json({
        message: "Error while logging in"
    })
})

{/*--------------------- Update User ----------------------------------- */}

const updateBody = zod.object({
    username: zod.string().optional(),
    password: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.put("/", authMiddleware , async (req ,res) => {
    const {success} = updateBody.safeParse(req.body);

    if(!success){
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne(req.body , {
        id: req.userId
    })

    res.json({
        message:"Update successfully"
    })
})

{/*--------------------- Find Users ----------------------------------- */}

router.get("/bulk", async (req , res) => {

    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName:{
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })


    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router;