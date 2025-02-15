import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header";
import ProductGrid from "./components/ProductGrid";
import CsvUploader from "./components/CsvUploader";
import { categories } from "./data/products";
import Home from "./components/Home";
import Login from "./components/Login";
import AdminPanel from "./components/AdminPanel";

const App = () => {
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [role, setRole] = useState(null);

    // Función para obtener el rol real del usuario
    const fetchUserRole = async () => {
        if (!token) return;
        try {
            const response = await fetch("http://localhost:5000/api/auth/me", {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) {
                throw new Error("Error obteniendo usuario");
            }

            const data = await response.json();
            setRole(data.role);
        } catch (error) {
            console.error("Error obteniendo usuario:", error);
            setRole(null);
            handleLogout(); // Cierra sesión si el token es inválido
        }
    };

    useEffect(() => {
        fetchUserRole();
    }, [token]);

    const handleUpload = (newProducts) => {
        setProducts((prevProducts) => [...prevProducts, ...newProducts]);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
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
                        <Route path="/login" element={<Login setToken={setToken} />} />
                    ) : (
                        <Route path="/login" element={<Navigate to="/" />} />
                    )}

                    <Route path="/admin" element={role === "admin" ? <AdminPanel /> : <Navigate to="/" />} />

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
