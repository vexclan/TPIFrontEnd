import React, { useState, useEffect } from 'react';
import { Component, Loader } from 'lucide-react';  
import './Pedidos.css';
import axios from 'axios';
get()

async function get(dato) {
  sessionStorage.setItem('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzM0NjMwMTgsImRhdGEiOnsiVXN1YXJpb19pZCI6NSwiVXN1YXJpbyI6IkNlbGluYSJ9LCJpYXQiOjE3MzM0NDE0MTh9.-XYiY4Z-8zpQMyYH2ixVduoo7voTXkGLkV2HPpZrKwI')
  const token = sessionStorage.getItem('token')
  const url = "http://localhost:3000/api/articulo"
  const config = {
    headers:{
      authorization:token
    },
    params: {
      id: dato !== ""? dato: null
    }
  }
  console.log(config)

  try {
    const respuesta = await axios.get(url,config);
    console.log('respuesta data get :',respuesta.data);
    return respuesta;
  } catch (error) {
    console.log(error);
    alert(error);
    throw error;
  }
}

const PaymentPage = () => {
  const [productos, setProductos] = useState([]);
  const [Card, setCard] = useState ([]);
  const [loading, setLoading] = useState(true);
  const [ProcesarPago, setProcesarPago] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    Nombre: '',
    Apellido: '',
    Direccion: '',
    Email: '',
    NumeroTarjeta: '',
    FechaVencimiento: '',
    CVV: ''
  });
  
   
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        /*const mockProductos = [
          {
            id: 1,
            nombre: "Cafe",
            precio: 799.99,
            cantidad: 1,
            imagen: "/api/placeholder/200/200",
            descripcion: "Cafe en granos tostados"
          },
          {
            id: 2,
            nombre: "Frappuchino",
            precio: 599.99,
            cantidad: 1,
            imagen: "/api/placeholder/200/200",
            descripcion: "Bebida helada a base de cafe,azucar, hielo y crema"
          }
        ];*/
        setProductos(MockProductos);
        setLoading(false);
      } catch (error) {
        setError('Error al cargar los productos');
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  const Identiinput = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const CalcularTotales = () => {
    const subtotal = productos.reduce((acc, producto) => 
      acc + (producto.precio * producto.cantidad), 0
    );

    const total = subtotal ;
    return { subtotal, total };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    ProcesarPago(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('¡Pago procesado con éxito!');
    } catch (error) {
      setError('Error al procesar el pago. Por favor, intente nuevamente.');
    } finally {
      ProcesarPago(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-700 to-yellow-500 flex items-center justify-center">
        <div className="text-white flex items-center gap-2">
          <Loader className="animate-spin" />
          Cargando productos...
        </div>
      </div>
    );
  }

  const { subtotal, total } = CalcularTotales();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-700 to-yellow-500 p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        <card className="p-6">
          <h2 className="text-2xl font-bold mb-6">Tu Carrito</h2>
          
          <div className="space-y-4 mb-6">
            {productos.map(producto => (
              <div key={producto.id} className="flex space-x-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
                <img 
                  src={producto.imagen} 
                  alt={producto.nombre}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{producto.nombre}</h3>
                  <p className="text-gray-600 text-sm">{producto.descripcion}</p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-gray-600">Cantidad: {producto.cantidad}</p>
                    <p className="text-lg font-semibold">${producto.precio.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2 border-t pt-4">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
            </div>
            <div className="flex justify-between text-xl font-bold mt-4">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </card>
      </div>
    </div>
  );
};

export default PaymentPage;