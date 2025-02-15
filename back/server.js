const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Usuario de prueba (puedes luego guardarlo en una base de datos)
const adminUser = {
    username: "admin",
    password: bcrypt.hashSync("123456", 10), // Encripta la contraseña
};

// Importar y usar rutas adicionales
const authRoutes = require("./src/routes/auth.routes");

// Usar las rutas con el prefijo "/api/puerta45"
app.use("/api/puerta45", authRoutes); // Las rutas serán "/api/puerta45/login", "/api/puerta45/me", "/api/puerta45/protegido"

// Ruta principal para probar si el servidor responde
app.get("/", (req, res) => {
    res.send("Servidor funcionando correctamente.");
});

// Iniciar servidor
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Middleware para verificar el token