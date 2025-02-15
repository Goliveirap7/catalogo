const jwt = require("jsonwebtoken");
require("dotenv").config();

function verificarToken(req, res, next) {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(403).json({ message: "Acceso denegado" });
    }

    try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido" });
    }
}

function verificarAdmin(req, res, next) {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ message: "Acceso denegado. Se requieren permisos de administrador." });
    }
    next();
}

module.exports = { verificarToken, verificarAdmin };
