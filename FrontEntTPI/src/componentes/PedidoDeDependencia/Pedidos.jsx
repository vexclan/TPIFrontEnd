import React, { useState, useEffect } from 'react';
import { CreditCard, Mail, User, Home, Loader } from 'lucide-react';  
import './Pedidos.css';
import axios from 'axios';

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
  async function get(dato) {
    const token = sessionStorage.getItem("token")
    const url = "http://localhost:3000/api/articulo"
    const config = {
      Headers:{
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
        setProductos(mockProductos);
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

        {/*<card className="p-6">
          <h2 className="text-2xl font-bold mb-6">Información de Pago</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nombre</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    name="nombre"
                    value={formData.Nombre}
                    onChange={Identiinput}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Apellido</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    name="apellido"
                    value={formData.Apellido}
                    onChange={Identiinput}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Dirección</label>
              <div className="relative">
                <Home className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  name="direccion"
                  value={formData.Direccion}
                  onChange={Identiinput}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="Email"
                  name="Email"
                  value={formData.Email}
                  onChange={Identiinput}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Número de Tarjeta</label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  name="numeroTarjeta"
                  value={formData.NumeroTarjeta}
                  onChange={Identiinput}
                  className="pl-10"
                  placeholder="1234 5678 9012 3456"
                  required
                  maxLength="19"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Fecha de Vencimiento</label>
                <input
                  name="fechaVencimiento"
                  value={formData.FechaVencimiento}
                  onChange={Identiinput}
                  placeholder="MM/AA"
                  required
                  maxLength="5"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">CVV</label>
                <input
                  type="password"
                  name="cvv"
                  value={formData.CVV}
                  onChange={Identiinput}
                  maxLength="4"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm p-2 bg-red-50 rounded">{error}</div>
            )}

            <button 
              type="submit" 
              className="w-full bg-amber-700 hover:bg-amber-800 text-white"
              disabled={ProcesarPago}
            >
              {ProcesarPago ? (
                <span className="flex items-center gap-2">
                  <Loader className="animate-spin" size={16} />
                  Procesando pago...
                </span>
              ) : (
                'Realizar Pago'
              )}
            </button>
          </form>
        </card>*/}
      </div>
    </div>
  );
};

export default PaymentPage;