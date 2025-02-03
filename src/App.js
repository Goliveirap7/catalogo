import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import Header from "./components/Header";
import ProductGrid from "./components/ProductGrid";
import CsvUploader from "./components/CsvUploader";
import { categories } from "./data/products";
import Home from "./components/Home"; // Asegúrate de importar correctamente el componente Home

const App = () => {
    const [products, setProducts] = useState([]);

    const handleUpload = (newProducts) => {
        setProducts((prevProducts) => [...prevProducts, ...newProducts]);
    };

    return (
        <Router>
            <div className="app">
                <Header />
                <Routes>
                    {/* Página de inicio */}
                    <Route path="/" element={<Home />} /> 

                    {/* Rutas para categorías */}
                    {categories.map((category) => (
                        <Route
                            key={category.id}
                            path={`/category/${category.slug}`}
                            element={
                                <>
                                    <CsvUploader onUpload={handleUpload} category={category.slug} />
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
