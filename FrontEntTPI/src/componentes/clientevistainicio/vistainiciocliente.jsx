import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, ShoppingCart, Menu, X, Star, Heart, Eye } from 'lucide-react';

const CoffeeShop = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // State for products and cart
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await axios.get('https://api.example.com/coffee-products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Fallback to mock data if API call fails
        setProducts([
          {
            id: 1,
            name: 'Café Especial',
            price: 12.99,
            oldPrice: 15.99,
            image: '/api/placeholder/200/200',
          },
          {
            id: 2,
            name: 'Café Tostado',
            price: 14.99,
            oldPrice: 17.99,
            image: '/api/placeholder/200/200',
          }
        ]);
      }
    };

    fetchProducts();
  }, []);

  // Add to cart functionality
  const addToCart = (product) => {
    setCartItems(prevItems => {
      // Check if product already in cart
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item => 
          item.id === product.id 
            ? {...item, quantity: (item.quantity || 1) + 1} 
            : item
        );
      }
      return [...prevItems, {...product, quantity: 1}];
    });
  };

  // Remove from cart functionality
  const removeFromCart = (productId) => {
    setCartItems(prevItems => 
      prevItems.filter(item => item.id !== productId)
    );
  };

  // Search functionality
  const handleSearch = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    try {
      // Replace with your actual search API endpoint
      const response = await axios.get(`https://api.example.com/search?term=${term}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  // Filtered products for search
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        </nav>

        <div className="flex items-center space-x-4">
          <button onClick={() => setIsSearchOpen(!isSearchOpen)}><Search /></button>
          <button onClick={() => setIsCartOpen(!isCartOpen)}><ShoppingCart /></button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden"><Menu /></button>
        </div>

        <div className={`absolute top-full left-0 right-0 p-4 bg-white ${isSearchOpen ? 'block' : 'hidden'}`}>
          <div className="relative">
            <input 
              type="search" 
              placeholder="buscar aquí..." 
              className="w-full p-2 border rounded"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Search className="absolute right-2 top-2" />
          </div>
        </div>

        <div className={`absolute top-full right-0 w-80 bg-white shadow-lg p-4 ${isCartOpen ? 'block' : 'hidden'}`}>
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center space-x-4 mb-4">
              <button 
                className="text-red-500"
                onClick={() => removeFromCart(item.id)}
              >
                <X />
              </button>
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover" />
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <div className="text-yellow-600">${item.price}/-</div>
                <div>Cantidad: {item.quantity}</div>
              </div>
            </div>
          ))}
          <button className="w-full bg-yellow-600 text-white py-2 rounded">
            comprar
          </button>
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
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg p-6 relative">
              <div className="absolute top-4 right-4 space-x-2">
                <button onClick={() => addToCart(product)}><ShoppingCart className="hover:text-yellow-600" /></button>
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