const express = require("express");
const router = express.Router();
const Users = require("../Models/Users");
const jwt = require("jsonwebtoken");

// registration
router.post("/register", async (req, res) => {
    const { Fullname, Username, Profileimg, Email, Password } = req.body;
    const ExistUser = await Users.findOne({ Email: Email });

    if (ExistUser) {
        return res.status(403).json({ err: "user is already exist" });
    }

    const CreateUser = { Fullname, Username, Profileimg, Email, Password }
    const user = await Users.create(CreateUser);

    const token = jwt.sign({ id: user._id }, "secreate", { expiresIn: "7d" });

    const returnUser = { ...user.toJSON(), token };
    delete returnUser.Password;
    return res.status(202).json(returnUser);
});

// login 
router.post("/login", async (req, res) => {
    const { Email, Password } = req.body;

    const ExistUser = await Users.findOne({ Email: Email });

    if (!ExistUser) {
        return res.status(403).json({ err: "Invalid Credentials" })
    };

    if (ExistUser.Password != Password) {
        return res.status(403).json({ err: "Password Incorrect" });
    }

    const token = jwt.sign( { id: ExistUser._id }, "secreate", { expiresIn: "7d" } );

    const returnUser = { ...ExistUser.toJSON(), token };
    delete returnUser.Password;
    return res.status(202).json(returnUser);
});

module.exports = router;