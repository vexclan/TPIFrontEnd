import React, { useState, useEffect } from 'react';
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

  // Mock data for products (since we can't use external APIs in artifacts)
  useEffect(() => {
    setProducts([
      {
        id: 1,
        name: 'Café Especial',
        price: 12.99,
        oldPrice: 15.99,
        image: '',
      },
      {
        id: 2,
        name: 'Café Tostado',
        price: 14.99,
        oldPrice: 17.99,
        image: '',
      },
      {
        id: 3,
        name: 'Café Premium',
        price: 18.99,
        oldPrice: 21.99,
        image: '',
      },
      {
        id: 4,
        name: 'Café Orgánico',
        price: 16.99,
        oldPrice: 19.99,
        image: '',
      },
      {
        id: 5,
        name: 'Café Descafeinado',
        price: 13.99,
        oldPrice: 16.99,
        image: '',
      },
      {
        id: 6,
        name: 'Café Gourmet',
        price: 22.99,
        oldPrice: 25.99,
        image: '',
      }
    ]);
  }, []);

  // Add to cart functionality
  const addToCart = (product) => {
    setCartItems(prevItems => {
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
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filtered products for search
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate total cart items
  const totalCartItems = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  return (
    <div className="min-h-screen" style={{ background: '#010103', fontFamily: 'Roboto, sans-serif' }}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 border-b border-white border-opacity-30" style={{ background: '#010103' }}>
        <div className="flex items-center">
          <img src="" alt="Coffee Shop Logo" className="h-16 w-16 rounded-full" />
        </div>

        <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:flex space-x-8`}>
          <a href="#home" className="text-white text-lg hover:text-yellow-600 hover:border-b hover:border-yellow-600 pb-1 transition-all duration-200 capitalize">inicio</a>
          <a href="#about" className="text-white text-lg hover:text-yellow-600 hover:border-b hover:border-yellow-600 pb-1 transition-all duration-200 capitalize">sobre</a>
          <a href="#menu" className="text-white text-lg hover:text-yellow-600 hover:border-b hover:border-yellow-600 pb-1 transition-all duration-200 capitalize">menu</a>
          <a href="#products" className="text-white text-lg hover:text-yellow-600 hover:border-b hover:border-yellow-600 pb-1 transition-all duration-200 capitalize">productos</a>
        </nav>

        <div className="flex items-center space-x-6">
          <button 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="text-white text-2xl hover:text-yellow-600 transition-colors duration-200"
          >
            <Search />
          </button>
          <button 
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="text-white text-2xl hover:text-yellow-600 transition-colors duration-200 relative"
          >
            <ShoppingCart />
            {totalCartItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-600 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalCartItems}
              </span>
            )}
          </button>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden text-white text-2xl hover:text-yellow-600 transition-colors duration-200"
          >
            <Menu />
          </button>
        </div>

        {/* Search Form */}
        <div className={`absolute top-full right-8 bg-white w-80 h-16 flex items-center transition-transform duration-200 ${isSearchOpen ? 'scale-y-100' : 'scale-y-0'} origin-top`}>
          <input 
            type="search" 
            placeholder="buscar aquí..." 
            className="w-full h-full px-4 text-lg text-black capitalize-none outline-none"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search className="text-black text-2xl mr-4 hover:text-yellow-600 cursor-pointer" />
        </div>

        {/* Cart Items Container */}
        <div className={`absolute top-full bg-white w-80 p-6 transition-all duration-300 ${isCartOpen ? 'right-0' : '-right-full'}`} style={{ height: 'calc(100vh - 9.5rem)' }}>
          {cartItems.length === 0 ? (
            <p className="text-black text-center text-lg">Tu carrito está vacío</p>
          ) : (
            <>
              {cartItems.map(item => (
                <div key={item.id} className="relative flex items-center gap-6 my-8">
                  <button 
                    className="absolute top-4 right-4 text-black text-xl hover:text-yellow-600 cursor-pointer"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <X />
                  </button>
                  <img src={item.image} alt={item.name} className="h-16 w-16 object-cover rounded" />
                  <div>
                    <h3 className="text-xl text-black pb-2">{item.name}</h3>
                    <div className="text-lg text-yellow-600">${item.price}</div>
                    <div className="text-sm text-gray-600">Cantidad: {item.quantity}</div>
                  </div>
                </div>
              ))}
              <button className="w-full text-center bg-yellow-600 text-white py-3 px-8 text-lg hover:tracking-wider transition-all duration-200 capitalize">
                comprar
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <nav className={`md:hidden absolute top-full bg-white w-80 transition-all duration-300 ${isMenuOpen ? 'right-0' : '-right-full'}`} style={{ height: 'calc(100vh - 9.5rem)' }}>
          <a href="#home" className="block text-black text-xl m-6 p-2 hover:text-yellow-600">inicio</a>
          <a href="#about" className="block text-black text-xl m-6 p-2 hover:text-yellow-600">sobre</a>
          <a href="#menu" className="block text-black text-xl m-6 p-2 hover:text-yellow-600">menu</a>
          <a href="#products" className="block text-black text-xl m-6 p-2 hover:text-yellow-600">productos</a>
        </nav>
      </header>

      {/* Home Section */}
      <section 
        id="home" 
        className="min-h-screen flex items-center bg-cover bg-center"
        style={{ 
          backgroundImage: 'url()',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-4xl px-8">
          <h3 className="text-6xl uppercase text-white font-normal mb-4">cafe fresco por las mañanas</h3>
          <p className="text-xl text-gray-200 font-light leading-relaxed py-4 mb-6">
            Disfruta del mejor café, preparado con granos seleccionados de las mejores plantaciones del mundo
          </p>
          <button className="inline-block bg-yellow-600 text-white px-12 py-4 text-lg hover:tracking-wider transition-all duration-200 capitalize">
            consigue el tuyo ahora
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16">
        <h1 className="text-center text-white uppercase pb-14 text-4xl">
          <span className="text-yellow-600">sobre</span> nosotros
        </h1>
        <div className="flex items-center flex-wrap" style={{ background: '#13131a' }}>
          <div className="flex-1 min-w-80">
            <img src="" alt="about" className="w-full" />
          </div>
          <div className="flex-1 min-w-80 p-8">
            <h3 className="text-3xl text-white mb-4">¿qué hace a nuestro café especial?</h3>
            <p className="text-lg text-gray-300 py-4 leading-relaxed mb-6">
              Cosechado desde diferentes partes del mundo, empaquetado con cariño y enviado desde nuestra sucursal son algunas de las cualidades que nuestro cafe sea merecedor de una probada.
            </p>
            <button 
              onClick={() => setIsModalOpen(true)} 
              className="inline-block bg-yellow-600 text-white px-12 py-4 text-lg hover:tracking-wider transition-all duration-200 capitalize"
            >
              Más Información
            </button>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 px-8">
        <h1 className="text-center text-white uppercase pb-14 text-4xl">
          nuestros <span className="text-yellow-600">productos</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredProducts.map(product => (
            <div key={product.id} className="text-center p-8 border border-white border-opacity-30">
              <div className="flex justify-center space-x-1 mb-4">
                <button 
                  onClick={() => addToCart(product)}
                  className="w-12 h-12 leading-12 text-xl border border-white border-opacity-30 text-white hover:bg-yellow-600 hover:text-black transition-all duration-200"
                >
                  <ShoppingCart className="w-5 h-5 mx-auto" />
                </button>
                <button className="w-12 h-12 leading-12 text-xl border border-white border-opacity-30 text-white hover:bg-yellow-600 hover:text-black transition-all duration-200">
                  <Heart className="w-5 h-5 mx-auto" />
                </button>
                <button className="w-12 h-12 leading-12 text-xl border border-white border-opacity-30 text-white hover:bg-yellow-600 hover:text-black transition-all duration-200">
                  <Eye className="w-5 h-5 mx-auto" />
                </button>
              </div>
              <div className="py-10">
                <img src={product.image} alt={product.name} className="h-60 mx-auto object-cover rounded" />
              </div>
              <div>
                <h3 className="text-white text-2xl mb-2">{product.name}</h3>
                <div className="flex justify-center space-x-1 py-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-600 fill-current" />
                  ))}
                </div>
                <div className="text-white text-2xl">
                  <span className="text-yellow-600">${product.price}</span>
                  <span className="text-gray-400 line-through text-lg font-light ml-2">${product.oldPrice}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(59,59,59,0.9)' }}>
          <div className="bg-gray-800 p-8 rounded-3xl max-w-2xl w-4/5 min-h-64 text-center text-white relative border border-white border-opacity-30">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-4 text-white text-2xl hover:text-yellow-600"
            >
              <X />
            </button>
            <h2 className="text-3xl font-normal mb-6 uppercase">Acerca de nuestros cafés</h2>
            <p className="text-lg leading-relaxed text-gray-300">
              Cosechado Desde Diferentes Partes Del Mundo, Empaquetado Con Cariño Y Enviado Desde Nuestra Sucursal Son Algunas De Las Cualidades Que Nuestro Cafe Sea Merecedor De Una Probada. Exportados desde lugares inigualables y extravagantes por ejemplo alguno de nuestros cafes son traidos del monte Everest.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoffeeShop;