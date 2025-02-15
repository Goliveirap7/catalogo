import React from "react";
import { Link } from "react-router-dom";
import { categories } from "../data/products";

const Header = () => {
    return (
        <header className="header">
            <div className="logo-container">
                <img 
                    src="https://res.cloudinary.com/dviofhhet/image/upload/v1738458038/logo_fyg_importaciones.png" 
                    alt="Logo" 
                    className="logo" 
                />
            </div>
            <nav>
                <ul className="category-list">
                    {/* Enlace al Home */}
                    <li>
                        <Link to="/">Inicio</Link>
                    </li>
                    {categories.map((category) => (
                        <li key={category.id}>
                            <Link to={`/category/${category.slug}`}>
                                {category.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
