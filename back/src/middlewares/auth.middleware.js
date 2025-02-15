const jwt = require("jsonwebtoken");
require("dotenv").config();  // Cargar variables de entorno

const verificarToken = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(403).json({ message: "Token requerido" });
    }

    try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido o expirado" });
    }
};

module.exports = { verificarToken };
