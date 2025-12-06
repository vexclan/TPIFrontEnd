import React, { useState, useEffect } from 'react';
import { WalletCards } from 'lucide-react';

const facturaData = {
  numero: "F-2024-001",
  fecha: "2024-11-18",
  cliente: {
    nombre: "Luchito Pérez",
    direccion: "Gobernador Paz 2301",
    email: "luchianoperez@gmail.com"
  },
  productos: [
    { id: 1, nombre: "Cafe con leche", cantidad: 1, precioUnitario: 1299.99 },
    { id: 2, nombre: "Donas relleno con chocolate'", cantidad: 2, precioUnitario: 299.99 },
    { id: 3, nombre: "Frappuchino", cantidad: 1, precioUnitario: 129.99 }
  ]
};

const FacturacionApp = () => {
  const [factura, setFactura] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setFactura(facturaData);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar datos:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calcularSubtotal = (productos) => {
    return productos.reduce((acc, item) => acc + (item.cantidad * item.precioUnitario), 0);
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-amber-700 to-yellow-500">
        <div className="text-white text-xl">Cargando factura...</div>
      </div>
    );
  }

  if (!factura) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-amber-700 to-yellow-500">
        <div className="text-white text-xl">Error al cargar la factura</div>
      </div>
    );
  }

  const subtotal = calcularSubtotal(factura.productos);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-700 to-yellow-500 p-6">
      <WalletCards className="max-w-4xl mx-auto bg-white p-8 shadow-xl">
        <div className="border-b border-gray-200 pb-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Factura</h1>
          <div className="mt-4 text-gray-600">
            <p>Número: {factura.numero}</p>
            <p>Fecha: {factura.fecha}</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Datos del Cliente</h2>
          <div className="text-gray-600">
            <p>Nombre: {factura.cliente.nombre}</p>
            <p>Dirección: {factura.cliente.direccion}</p>
            <p>Email: {factura.cliente.email}</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Productos</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-amber-700 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Producto</th>
                  <th className="px-4 py-2 text-right">Cantidad</th>
                  <th className="px-4 py-2 text-right">Precio Unitario</th>
                  <th className="px-4 py-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {factura.productos.map((producto) => (
                  <tr key={producto.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{producto.nombre}</td>
                    <td className="px-4 py-2 text-right">{producto.cantidad}</td>
                    <td className="px-4 py-2 text-right">
                      ${producto.precioUnitario.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 text-right">
                      ${(producto.cantidad * producto.precioUnitario).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="text-right space-y-2">
            <p className="text-gray-600">Subtotal: ${subtotal.toFixed(2)}</p>
            <p className="text-xl font-bold text-gray-800">
              Total: ${total.toFixed(2)}
            </p>
          </div>
        </div>
      </WalletCards>
    </div>
  );
};

export default FacturacionApp;