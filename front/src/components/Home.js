import React from 'react';
import './Home.css'; // Si tienes un archivo CSS para tu estilo

const Home = () => {
  const topProducts = [
    {
      name: "Producto 1",
      image: "imagen_producto_1.jpg",
      price: "S/ 499",
    },
    {
      name: "Producto 2",
      image: "imagen_producto_2.jpg",
      price: "S/ 699",
    },
    {
      name: "Producto 3",
      image: "imagen_producto_3.jpg",
      price: "S/ 329",
    },
    {
      name: "Producto 4",
      image: "imagen_producto_4.jpg",
      price: "S/ 849",
    },
  ];

  return (
    <div className="home-container">
      <h2>Productos Destacados</h2>
      <div className="top-products">
        {topProducts.map((product, index) => (
          <div className="product-card" key={index}>
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
