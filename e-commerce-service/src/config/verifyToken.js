const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({
            auth: false
        });
    } else {
        jwt.verify(token, process.env.SECRET_JWT, (err, data) => {
            if (err) {
                res.status(401).json({ auth: false });
            } else {
                next();
            }
        });
    }
}
module.exports = verifyToken;