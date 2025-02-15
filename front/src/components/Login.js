import React, { useState } from "react";

const Login = ({ setToken }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        console.log("Username:", username);
        console.log("Password:", password);

        try {
            const response = await fetch("http://localhost:5000/api/puerta45", {  // Cambié la URL aquí
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),  // Asegúrate de enviar las credenciales en el cuerpo
            });

            if (!response.ok) {
                throw new Error("Credenciales incorrectas");
            }

            const data = await response.json();
            const token = data.token;
            const role = data.role;

            console.log("Token recibido:", token); // Asegúrate de que el token sea recibido

            // Guardar el token en el almacenamiento local y en el estado
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
