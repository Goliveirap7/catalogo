import React, { useState, useEffect } from "react";

const ProtectedPage = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Verificar si el token está presente en el almacenamiento local
        const token = localStorage.getItem("token");

        if (!token) {
            // Si no hay token, redirigir al login
            window.location.href = "/puerta45"; // Cambia la URL del login si es necesario
        }

        // Función para obtener los datos del usuario desde la API
        const fetchUserData = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/puerta45/me", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`, // Enviar el token en el encabezado
                    },
                });

                if (!response.ok) {
                    throw new Error("No se pudo obtener los datos del usuario");
                }

                const data = await response.json();
                setUserData(data); // Guardamos los datos del usuario
            } catch (error) {
                console.error("Error al obtener los datos del usuario:", error);
            }
        };

        fetchUserData();
    }, []);

    if (!userData) return <div>Cargando...</div>;

    return (
        <div>
            <h2>Bienvenido a la página protegida</h2>
            <p>Usuario: {userData.username}</p>
            <p>Rol: {userData.role}</p>
        </div>
    );
};

export default ProtectedPage;
