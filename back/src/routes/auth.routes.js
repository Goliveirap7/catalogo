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
router.post("/", (req, res) => {  // La ruta será "/api/puerta45" (sin "/login")
    const { username, password } = req.body;

    // Buscar el usuario por nombre de usuario
    const user = users.find((u) => u.username === username);

    // Si el usuario no existe o la contraseña es incorrecta
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    // Generar el token JWT
    const token = jwt.sign(
        { username: user.username, role: user.role },
        process.env.JWT_SECRET,  // Usar la clave secreta desde el archivo .env
        { expiresIn: "1h" }  // Establecer la expiración del token en 1 hora
    );

    console.log(`✅ Usuario autenticado: ${username} | Rol: ${user.role}`);

    // Enviar el token al cliente
    res.json({ token });
});

// Ruta protegida para obtener datos del usuario autenticado
router.get("/me", verificarToken, (req, res) => {
    console.log("🔎 Token válido. Usuario:", req.user);  // Verificar el token en consola
    res.json({ username: req.user.username, role: req.user.role });
});

// Ruta protegida
router.get("/protegido", verificarToken, (req, res) => {
    res.json({ message: "Bienvenido a la ruta protegida" });
});

module.exports = router;
