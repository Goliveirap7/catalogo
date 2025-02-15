const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const { verificarToken } = require("../middlewares/auth.middleware");

const router = express.Router();

// Simulación de usuarios (deberías usar una base de datos)
const users = [
    {
        username: "admin",
        password: bcrypt.hashSync("123456", 10),
        role: "admin",
    },
    {
        username: "user",
        password: bcrypt.hashSync("userpass", 10),
        role: "user",
    },
];

// Ruta para iniciar sesión
router.post("/login", (req, res) => {
    const { username, password } = req.body;

    const user = users.find((u) => u.username === username);

    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const token = jwt.sign({ username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
});

// Nueva ruta para obtener datos del usuario autenticado
router.get("/me", verificarToken, (req, res) => {
    res.json({ username: req.user.username, role: req.user.role });
});

module.exports = router;
