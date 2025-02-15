const express = require("express");
const cors = require("cors");
require("dotenv").config();  // Cargar variables de entorno

const app = express();
app.use(cors());  // Habilitar CORS (si es necesario para solicitudes externas)
app.use(express.json());  // Middleware para parsear solicitudes con cuerpo JSON

// Importar rutas de autenticación
const authRoutes = require("./routes/auth.routes");

// Usar las rutas con el prefijo "/api/puerta45"
app.use("/api/puerta45", authRoutes);  // Se usará "/api/puerta45", "/api/puerta45/me", "/api/puerta45/protegido"

// Ruta raíz
app.get("/", (req, res) => {
    res.send("Servidor funcionando correctamente");
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;  // Usar el puerto configurado en .env o 5000 por defecto
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
