import React, { useState } from "react";

const Login = ({ setToken }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        // Simulación de autenticación (esto vendrá del backend)
        if (username === "admin" && password === "123456") {
            const token = "fake-jwt-token";
            const role = "admin"; // Aquí en producción vendría del backend

            localStorage.setItem("token", token);
            localStorage.setItem("role", role);

            setToken(token);
            window.location.href = "/admin"; // Redirige a la página de admin
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input 
                    type="text" 
                    placeholder="Usuario" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input 
                    type="password" 
                    placeholder="Contraseña" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Iniciar sesión</button>
            </form>
        </div>
    );
};

export default Login;
