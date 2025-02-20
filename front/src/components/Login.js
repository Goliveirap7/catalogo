import React, { useState } from "react";
import './Login.css';

const Login = ({ setToken }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/puerta45", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error("Credenciales incorrectas");
            }

            const data = await response.json();
            const token = data.token;
            const role = data.role;

            localStorage.setItem("token", token);
            localStorage.setItem("role", role);

            setToken(token);
            window.location.href = "/admin"; // Redirige a la página de admin
        } catch (error) {
            alert("Usuario o contraseña incorrectos");
            console.error("❌ Error de autenticación:", error);
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
                <h2>Login</h2>
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="checkbox-group">
                    <input
                        type="checkbox"
                        id="showPassword"
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)}
                    />
                    <label htmlFor="showPassword">Mostrar Contraseña</label>
                </div>
                <button type="submit" className="login-btn">Iniciar sesión</button>
            </form>
        </div>
    );
};

export default Login;
