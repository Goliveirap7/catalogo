import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header";
import ProductGrid from "./components/ProductGrid";
import CsvUploader from "./components/CsvUploader";
import { categories } from "./data/products";
import Home from "./components/Home";
import Login from "./components/Login";
import AdminPanel from "./components/AdminPanel";
import ProtectedPage from "./components/ProtectedPage"; // Asegúrate de importar el componente de la página protegida

const App = () => {
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [role, setRole] = useState(null);

    const fetchUserRole = useCallback(async () => {
        if (!token) return;

        try {
            const response = await fetch("http://localhost:5000/api/puerta45/me", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` }, // Enviar el token correctamente
            });

            if (!response.ok) {
                throw new Error("Error obteniendo usuario");
            }

            const data = await response.json();
            console.log("🎭 Usuario autenticado:", data);
            setRole(data.role);
        } catch (error) {
            console.error("❌ Error obteniendo usuario:", error);
            setRole(null);
            handleLogout(); // Cierra sesión si el token es inválido
        }
    }, [token]);

    useEffect(() => {
        fetchUserRole();
    }, [fetchUserRole]);

    useEffect(() => {
        if (token) {
            fetchUserRole(); // Ejecutar cuando cambie el token
        }
    }, [token, fetchUserRole]);

    const handleUpload = (newProducts) => {
        setProducts((prevProducts) => [...prevProducts, ...newProducts]);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setToken(null);
        setRole(null);
    };

    return (
        <Router>
            <div className="app">
                <Header />

                {token && role && (
                    <div className="user-info">
                        {role === "admin" ? (
                            <p>🔑 Estás logueado como <strong>ADMIN</strong></p>
                        ) : (
                            <p>👤 Estás logueado como <strong>Cliente</strong></p>
                        )}
                    </div>
                )}

                {token && (
                    <button onClick={handleLogout} style={{ margin: "10px", padding: "5px 10px", cursor: "pointer" }}>
                        Cerrar sesión
                    </button>
                )}

                <Routes>
                    <Route path="/" element={<Home />} />

                    {!token ? (
                        <Route path="/puerta45" element={<Login setToken={(t) => { 
                            setToken(t); 
                            localStorage.setItem("token", t);
                            fetchUserRole(); // Llamar inmediatamente después de iniciar sesión
                        }} />} />
                    ) : (
                        <Route path="/login" element={<Navigate to="/" />} />
                    )}

                    <Route path="/admin" element={role === "admin" ? <AdminPanel /> : <Navigate to="/" />} />
                    {/* Esta ruta muestra el componente ProtectedPage para mostrar el contenido protegido */}
                    <Route path="/protected" element={role === "admin" ? <ProtectedPage /> : <Navigate to="/" />} />

                    {categories.map((category) => (
                        <Route
                            key={category.id}
                            path={`/category/${category.slug}`}
                            element={
                                <>
                                    {role === "admin" && <CsvUploader onUpload={handleUpload} category={category.slug} />}
                                    <ProductGrid products={products} category={category.slug} />
                                </>
                            }
                        />
                    ))}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
