const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
            .status(401)
            .json({ msg: "Unauthorized : No token provided !!" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decodedUser.userId);
        if (!user) {
            return res
                .status(401)
                .json({ error: "Unauthorized: User doesn't exist !!" });
        }

        req.user = decodedUser;
        next();
    } catch (err) {
        return res.status(401).json({ msg: "Unauthorized : Invalid token !" });
    }
};

module.exports = verifyToken;
