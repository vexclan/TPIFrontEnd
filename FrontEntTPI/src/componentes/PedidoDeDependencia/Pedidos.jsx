import React, { useState, useEffect, useId, createContext, Children } from 'react';
import { Component, Loader, Type } from 'lucide-react';  
import axios from 'axios'; 


const products = [
  { id: 1, name: "Cafe", price: 1200 },
  { id: 2, name: "Cappuccino", price: 150 },
  { id: 3, name: "Cafe con Leche", price: 50 },
];

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const itemExists = prevCart.find((item) => item.id === product.id);
      if (itemExists) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.id !== productId)
    );
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>🛍️ Carrito de Compras</h1>

      <h2>Productos</h2>
      {products.map((product) => (
        <div key={product.id} style={{ marginBottom: "10px" }}>
          <span>
            {product.name} - ${product.price}
          </span>
          <button
            style={{ marginLeft: "10px" }}
            onClick={() => addToCart(product)}
          >
            Agregar al carrito
          </button>
        </div>
      ))}

      <h2>Carrito</h2>
      {cart.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} (x{item.quantity}) - ${item.price * item.quantity}
              <button
                style={{ marginLeft: "10px" }}
                onClick={() => removeFromCart(item.id)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}

      <h3>Total: ${totalPrice}</h3>
    </div>
  );
}

export default App;
