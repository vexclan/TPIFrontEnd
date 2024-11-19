import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, X, Star, Heart, Eye } from 'lucide-react';

const CoffeeShop = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cartItems = [
    { id: 1, name: 'objeto en el carrito 1', price: 15.99, image: '/api/placeholder/80/80' },
    { id: 2, name: 'objeto en el carrito 2', price: 15.99, image: '/api/placeholder/80/80' },
    { id: 3, name: 'objeto en el carrito 3', price: 15.99, image: '/api/placeholder/80/80' },
    { id: 4, name: 'objeto en el carrito 4', price: 15.99, image: '/api/placeholder/80/80' },
  ];


  const products = [
    { id: 1, name: 'cafe de nicaragua', price: 15.99, oldPrice: 20.99, image: '/api/placeholder/200/200' },
    { id: 2, name: 'cafe de colombia', price: 15.99, oldPrice: 20.99, image: '/api/placeholder/200/200' },
    { id: 3, name: 'cafe de peru', price: 15.99, oldPrice: 20.99, image: '/api/placeholder/200/200' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 bg-white p-4 flex items-center justify-between shadow-md z-50">
        <a href="#" className="text-2xl font-bold">
          <img src="/api/placeholder/50/50" alt="logo" className="h-12" />
        </a>

        <nav className={`md:flex space-x-4 ${isMenuOpen ? 'block' : 'hidden'}`}>
          <a href="#home" className="hover:text-yellow-600">inicio</a>
          <a href="#about" className="hover:text-yellow-600">sobre</a>
          <a href="#menu" className="hover:text-yellow-600">menu</a>
          <a href="#products" className="hover:text-yellow-600">productos</a>
          <a href="#review" className="hover:text-yellow-600">reseñas</a>
          <a href="#contact" className="hover:text-yellow-600">contacto</a>
          <a href="#blogs" className="hover:text-yellow-600">blogs</a>
        </nav>

        <div className="flex items-center space-x-4">
          <button onClick={() => setIsSearchOpen(!isSearchOpen)}><Search /></button>
          <button onClick={() => setIsCartOpen(!isCartOpen)}><ShoppingCart /></button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden"><Menu /></button>
        </div>

        <div className={`absolute top-full left-0 right-0 p-4 bg-white ${isSearchOpen ? 'block' : 'hidden'}`}>
          <div className="relative">
            <input type="search" placeholder="buscar aquí..." className="w-full p-2 border rounded" />
            <Search className="absolute right-2 top-2" />
          </div>
        </div>

        <div className={`absolute top-full right-0 w-80 bg-white shadow-lg p-4 ${isCartOpen ? 'block' : 'hidden'}`}>
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center space-x-4 mb-4">
              <button className="text-red-500"><X /></button>
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover" />
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <div className="text-yellow-600">${item.price}/-</div>
              </div>
            </div>
          ))}
          <button className="w-full bg-yellow-600 text-white py-2 rounded">comprar</button>
        </div>
      </header>

      <section id="home" className="h-screen flex items-center justify-center bg-cover bg-center text-white" style={{backgroundImage: 'url(/api/placeholder/1920/1080)'}}>
        <div className="text-center">
          <h3 className="text-4xl font-bold mb-4">cafe fresco por las mañanas</h3>
          <button className="bg-yellow-600 text-white px-6 py-2 rounded">consigue el tuyo ahora</button>
        </div>
      </section>

      <section id="about" className="py-16">
        <h1 className="text-center text-4xl font-bold mb-12"><span className="text-yellow-600">sobre</span> nosotros</h1>
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2">
            <img src="/api/placeholder/600/400" alt="about" className="rounded-lg shadow-lg" />
          </div>
          <div className="md:w-1/2 md:pl-8 mt-8 md:mt-0">
            <h3 className="text-2xl font-bold mb-4">¿qué hace a nuestro café especial?</h3>
            <p className="mb-6">Cosechado desde diferentes partes del mundo, empaquetado con cariño y enviado desde nuestra sucursal son algunas de las cualidades que nuestro cafe sea merecedor de una probada.</p>
            <button onClick={() => setIsModalOpen(true)} className="bg-yellow-600 text-white px-6 py-2 rounded">
              Más Información
            </button>
          </div>
        </div>
      </section>

      <section id="products" className="py-16">
        <h1 className="text-center text-4xl font-bold mb-12">nuestros <span className="text-yellow-600">productos</span></h1>
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg p-6 relative">
              <div className="absolute top-4 right-4 space-x-2">
                <button><ShoppingCart className="hover:text-yellow-600" /></button>
                <button><Heart className="hover:text-yellow-600" /></button>
                <button><Eye className="hover:text-yellow-600" /></button>
              </div>
              <img src={product.image} alt={product.name} className="w-40 h-40 mx-auto mb-4" />
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <div className="flex justify-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400" />
                  ))}
                </div>
                <div>
                  <span className="text-yellow-600">${product.price}</span>
                  <span className="text-gray-400 line-through ml-2">${product.oldPrice}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="py-16 bg-gray-100">
        <h1 className="text-center text-4xl font-bold mb-12"><span className="text-yellow-600">contactenos</span></h1>
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30153.788252261566!2d72.82321484621745!3d19.141690214227783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b63aceef0c69%3A0x2aa80cf2287dfa3b!2sJogeshwari%20West%2C%20Mumbai%2C%20Maharashtra%20400047!5e0!3m2!1sen!2sin!4v1629452077891!5m2!1sen!2sin"
            className="w-full h-96 rounded-lg"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
          <form className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-6">póngase en contacto</h3>
            <div className="space-y-4">
              <div className="relative">
                <input type="text" placeholder="nombre" className="w-full p-2 pl-10 border rounded" />
              </div>
              <div className="relative">
                <input type="email" placeholder="email" className="w-full p-2 pl-10 border rounded" />
              </div>
              <div className="relative">
                <input type="number" placeholder="numero" className="w-full p-2 pl-10 border rounded" />
              </div>
              <button type="submit" className="w-full bg-yellow-600 text-white py-2 rounded">
                contactese ahora
              </button>
            </div>
          </form>
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Acerca de nuestros cafés</h2>
              <button onClick={() => setIsModalOpen(false)}><X /></button>
            </div>
            <p className="text-gray-600">
              Cosechado Desde Diferentes Partes Del Mundo, Empaquetado Con Cariño Y Enviado Desde Nuestra Sucursal Son Algunas De Las Cualidades Que Nuestro Cafe Sea Merecedor De Una Probada. Exportados desde lugares inigualables y extravagantes por ejemplo alguno de nuestros cafes son traidos del monte Everest.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoffeeShop;