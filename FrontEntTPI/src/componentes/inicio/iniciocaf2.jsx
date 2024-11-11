import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, Menu, X, Star, Eye, Heart } from 'lucide-react';

const Website = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isSearchActive && !event.target.closest('.search-container')) {
        setIsSearchActive(false);
      }
      if (isMobileMenuOpen && !event.target.closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSearchActive, isMobileMenuOpen]);

  const products = [
    {
      id: 1,
      name: "Product 1",
      price: 29.99,
      oldPrice: 39.99,
      rating: 5,
      image: "/api/placeholder/250/250"
    },
    {
      id: 2,
      name: "Product 2",
      price: 24.99,
      oldPrice: 34.99,
      rating: 4,
      image: "/api/placeholder/250/250"
    }
  ];

  // Prevent scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 py-4 bg-gray-900 border-b border-gray-700">
        <div className="flex items-center">
          <img src="/api/placeholder/60/60" alt="Logo" className="h-8 md:h-12" />
        </div>

        {/* Navigation */}
        <nav className={`mobile-menu-container absolute md:relative top-full left-0 w-full md:w-auto 
          bg-gray-900 md:bg-transparent
          ${isMobileMenuOpen ? 'block' : 'hidden'} md:block
          border-b border-gray-700 md:border-none`}>
          <div className="flex flex-col md:flex-row md:items-center md:space-x-6 p-4 md:p-0">
            {['home', 'about', 'menu', 'products', 'contact'].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="text-white hover:text-amber-600 text-lg transition-colors py-2 md:py-0 capitalize"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <button
            aria-label="Search"
            className="search-container focus:outline-none focus:ring-2 focus:ring-amber-600 rounded-full p-1"
            onClick={() => setIsSearchActive(!isSearchActive)}
          >
            <Search className="text-white hover:text-amber-600 cursor-pointer w-6 h-6" />
          </button>
          
          <button
            aria-label="Shopping Cart"
            className="focus:outline-none focus:ring-2 focus:ring-amber-600 rounded-full p-1"
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            <ShoppingCart className="text-white hover:text-amber-600 cursor-pointer w-6 h-6" />
          </button>
          
          <button
            aria-label="Menu"
            className="md:hidden focus:outline-none focus:ring-2 focus:ring-amber-600 rounded-full p-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="text-white hover:text-amber-600 cursor-pointer w-6 h-6" />
          </button>
        </div>

        {/* Search Form */}
        {isSearchActive && (
          <div className="search-container absolute top-full right-4 md:right-8 mt-2 w-full max-w-md">
            <div className="flex items-center bg-white rounded-lg shadow-lg">
              <input
                type="text"
                placeholder="Search here..."
                className="w-full p-3 text-gray-900 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                aria-label="Search input"
              />
              <Search className="w-6 h-6 mx-3 text-gray-600" />
            </div>
          </div>
        )}

        {/* Cart Sidebar */}
        {isCartOpen && (
          <>
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
              onClick={() => setIsCartOpen(false)}
            />
            <div className="fixed top-0 right-0 h-screen w-full max-w-sm bg-white p-6 shadow-xl overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Your Cart</h2>
                <button
                  aria-label="Close cart"
                  className="focus:outline-none focus:ring-2 focus:ring-amber-600 rounded-full p-1"
                  onClick={() => setIsCartOpen(false)}
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>
              
              <div className="space-y-4">
                {products.map(product => (
                  <div key={product.id} className="flex items-center gap-4">
                    <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                    <div>
                      <h3 className="text-gray-900 font-medium">{product.name}</h3>
                      <p className="text-amber-600">${product.price}</p>
                    </div>
                    <button
                      aria-label={`Remove ${product.name} from cart`}
                      className="ml-auto focus:outline-none focus:ring-2 focus:ring-amber-600 rounded-full p-1"
                    >
                      <X className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                ))}
              </div>

              <button 
                className="w-full bg-amber-600 text-white py-3 px-6 rounded-lg mt-6 
                  hover:bg-amber-700 transition-colors focus:outline-none focus:ring-2 
                  focus:ring-offset-2 focus:ring-amber-600"
              >
                Checkout Now
              </button>
            </div>
          </>
        )}
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center px-4 md:px-8 py-24 bg-gray-800">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Welcome To Our Site</h1>
          <p className="text-lg text-gray-300 mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.
          </p>
          <button 
            className="bg-amber-600 text-white py-3 px-8 rounded-lg text-lg 
              hover:bg-amber-700 transition-colors focus:outline-none focus:ring-2 
              focus:ring-offset-2 focus:ring-amber-600"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Products Section */}
      <section className="px-4 md:px-8 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">Our Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <div key={product.id} className="border border-gray-700 p-6 text-center rounded-lg hover:border-amber-600 transition-colors">
              <div className="flex justify-center space-x-4 mb-6">
                <button
                  aria-label="Quick view"
                  className="focus:outline-none focus:ring-2 focus:ring-amber-600 rounded-full p-1"
                >
                  <Eye className="w-6 h-6 text-white hover:text-amber-600" />
                </button>
                <button
                  aria-label="Add to wishlist"
                  className="focus:outline-none focus:ring-2 focus:ring-amber-600 rounded-full p-1"
                >
                  <Heart className="w-6 h-6 text-white hover:text-amber-600" />
                </button>
                <button
                  aria-label="Add to cart"
                  className="focus:outline-none focus:ring-2 focus:ring-amber-600 rounded-full p-1"
                >
                  <ShoppingCart className="w-6 h-6 text-white hover:text-amber-600" />
                </button>
              </div>
              <img src={product.image} alt={product.name} className="mx-auto mb-6 rounded-lg" />
              <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
              <div className="flex justify-center space-x-1 mb-4">
                {[...Array(product.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-600 fill-current" />
                ))}
              </div>
              <div className="text-white">
                <span className="text-2xl font-bold">${product.price}</span>
                <span className="ml-2 text-sm line-through text-gray-400">${product.oldPrice}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Website;