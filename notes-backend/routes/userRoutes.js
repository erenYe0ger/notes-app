const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required !!" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: "User already exists !!" });
        }

        const newUser = await User.create({ name, email, password });
        res.status(201).json({ msg: "User registered successfully !!" });
    } catch (err) {
        console.error("Registration error: ", err);
        res.status(500).json({ error: "Server error !!" });
    }
});

module.exports = router;
