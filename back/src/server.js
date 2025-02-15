const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Usuario de prueba (puedes luego guardarlo en una base de datos)
const adminUser = {
    username: "admin",
    password: bcrypt.hashSync("123456", 10) // Encripta la contraseña
};

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username !== adminUser.username || !bcrypt.compareSync(password, adminUser.password)) {
        return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    // Crear token
    const token = jwt.sign({ role: "admin" }, "secreto_super_seguro", { expiresIn: "1h" });

    res.json({ token });
});

module.exports = router;

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Importar rutas y middleware
const authRoutes = require("./src/routes/auth.routes");
const verificarToken = require("./src/middlewares/auth.middleware");

// Rutas
app.use("/api/auth", authRoutes);

// Ruta protegida (ejemplo: subida de CSV)
app.post("/api/subir-csv", verificarToken, (req, res) => {
    res.json({ message: "Archivo subido con éxito" });
});

// Iniciar servidor
const PORT = 5000;
app.get("/", (req, res) => {
    res.send("Servidor funcionando correctamente");
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
