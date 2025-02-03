import React, { useState } from "react";

const ProductGrid = ({ products, category }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;

    const filteredProducts = products.filter(p => !category || p.category === category);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

    return (
        <div className="product-container">
            <div className="product-grid">
                {currentProducts.map((product) => (
                    <ProductCard key={product.name} product={product} />
                ))}
            </div>
            
            <div className="pagination">
                <button 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
                    disabled={currentPage === 1}
                >
                    Anterior
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={currentPage === i + 1 ? "active" : ""}
                    >
                        {i + 1}
                    </button>
                ))}
                
                <button 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} 
                    disabled={currentPage === totalPages}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};

const ProductCard = ({ product }) => {
    const [image, setImage] = useState(product.image);

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file?.type.startsWith("image/")) {
            setImage(URL.createObjectURL(file));
        }
    };

    return (
        <div className="product-card">
            <div 
                className="image-container" 
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
            >
                <img 
                    src={image} 
                    alt={product.name}
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/150';
                        e.target.alt = 'Imagen no disponible';
                    }}
                />
                <div className="drop-overlay">Suelta la imagen aquí</div>
            </div>
            <div className="product-info">
                <h3>{product.name}</h3>
                <p>Precio: S/ {product.price.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default ProductGrid;