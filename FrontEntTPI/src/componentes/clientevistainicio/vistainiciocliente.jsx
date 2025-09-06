import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Menu, X, Star, Heart, Eye, User, Mail, Phone, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import './vista.css';

const CoffeeShop = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [products, setProducts] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', number: '' });

  useEffect(() => {
    setProducts([
      {
        id: 1,
        name: 'cafe de nicaragua',
        price: 15.99,
        oldPrice: 20.99,
        image: '',
      },
      {
        id: 2,
        name: 'cafe de colombia',
        price: 15.99,
        oldPrice: 20.99,
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop',
      },
      {
        id: 3,
        name: 'cafe de peru',
        price: 15.99,
        oldPrice: 20.99,
        image: '',
      }
    ]);

    setMenuItems([
      { id: 11, name: 'lagrima', price: 15.99, oldPrice: 20.99, image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&h=200&fit=crop' },
      { id: 12, name: 'capuchino', price: 15.99, oldPrice: 20.99, image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=200&h=200&fit=crop' },
      { id: 13, name: 'americano', price: 15.99, oldPrice: 20.99, image: 'https://images.unsplash.com/photo-1497636577773-f1231844b336?w=200&h=200&fit=crop' },
      { id: 14, name: 'irlandes', price: 15.99, oldPrice: 20.99, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=200&h=200&fit=crop' },
      { id: 15, name: 'expresso', price: 15.99, oldPrice: 20.99, image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=200&h=200&fit=crop' },
      { id: 16, name: 'machiatto', price: 15.99, oldPrice: 20.99, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop' }
    ]);

    setCartItems([
      { id: 101, name: 'objeto en el carrito 1', price: 15.99, image: 'https://images.unsplash.com/photo-1559496417-e7f25cb247cd?w=100&h=100&fit=crop', quantity: 1 },
      { id: 102, name: 'objeto en el carrito 2', price: 15.99, image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=100&h=100&fit=crop', quantity: 1 },
      { id: 103, name: 'objeto en el carrito 3', price: 15.99, image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e8?w=100&h=100&fit=crop', quantity: 1 },
      { id: 104, name: 'objeto en el carrito 4', price: 15.99, image: 'https://images.unsplash.com/photo-1559166631-7ddd17ba0ead?w=100&h=100&fit=crop', quantity: 1 }
    ]);
  }, []);

  const addToCart = (product) => {
    const newItem = { 
      ...product, 
      id: Date.now() + Math.random(),
      quantity: 1 
    };
    setCartItems(prev => [...prev, newItem]);
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => 
      prevItems.filter(item => item.id !== productId)
    );
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Mensaje enviado! Nombre: ${formData.name}, Email: ${formData.email}, Teléfono: ${formData.number}`);
    setFormData({ name: '', email: '', number: '' });
  };

  const closeMenus = () => {
    setIsSearchOpen(false);
    setIsCartOpen(false);
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };


  const totalCartItems = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  const allItems = [...products, ...menuItems];
  const filteredItems = allItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="coffee-shop" onClick={closeMenus}>
      <header className="header" onClick={(e) => e.stopPropagation()}>
        <div className="logo">
          <img src="./public/logoofi" alt="Logo" />
        </div>

        <nav className={`navbar ${isMenuOpen ? 'active' : ''}`}>
          <button onClick={() => scrollToSection('home')}>inicio</button>
          <button onClick={() => scrollToSection('about')}>sobre</button>
          <button onClick={() => scrollToSection('menu')}>menu</button>
          <button onClick={() => scrollToSection('products')}>productos</button>
          <button onClick={() => scrollToSection('contact')}>contacto</button>
          <button onClick={() => scrollToSection('blogs')}>blogs</button>
        </nav>

        <div className="icons">
          <button onClick={(e) => {e.stopPropagation(); setIsSearchOpen(!isSearchOpen);}}>
            <Search />
          </button>
          <button onClick={(e) => {e.stopPropagation(); setIsCartOpen(!isCartOpen);}} className="cart-icon">
            <ShoppingCart />
            {totalCartItems > 0 && <span className="cart-count">{totalCartItems}</span>}
          </button>
          <button onClick={(e) => {e.stopPropagation(); setIsMenuOpen(!isMenuOpen);}} id="menu-btn">
            <Menu />
          </button>
        </div>

        <div className={`search-form ${isSearchOpen ? 'active' : ''}`} onClick={(e) => e.stopPropagation()}>
          <input 
            type="search" 
            placeholder="search here..." 
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search className="search-icon" />
          
          {searchTerm && (
            <div className="search-results">
              {filteredItems.length > 0 ? (
                filteredItems.map(item => (
                  <div key={item.id} className="search-item" onClick={() => addToCart(item)}>
                    <img src={item.image} alt={item.name} />
                    <span>{item.name} - ${item.price}</span>
                  </div>
                ))
              ) : (
                <div className="search-item">No se encontraron productos</div>
              )}
            </div>
          )}
        </div>

        <div className={`cart-items-container ${isCartOpen ? 'active' : ''}`} onClick={(e) => e.stopPropagation()}>
          {cartItems.length === 0 ? (
            <p className="empty-cart">Tu carrito está vacío</p>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map(item => (
                  <div key={item.id} className="cart-item">
                    <button className="fa-times" onClick={() => removeFromCart(item.id)}>
                      <X />
                    </button>
                    <img src={item.image} alt={item.name} />
                    <div className="content">
                      <h3>{item.name}</h3>
                      <div className="price">${item.price}/-</div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="btn cart-btn" onClick={() => alert('Procesando compra...')}>
                comprar
              </button>
            </>
          )}
        </div>
      </header>

      {isModalOpen && (
        <div className="ventana" onClick={(e) => e.stopPropagation()}>
          <div className="cerrar">
            <button onClick={() => setIsModalOpen(false)}>
              <X />
            </button>
          </div>
          <h2>acerca de nuestros cafes</h2>
          <p>
            Cosechado Desde Diferentes Partes Del Mundo, Empaquetado Con Cariño Y Enviado Desde Nuestra Sucursal Son Algunas De Las Cualidades Que Nuestro Cafe Sea Merecedor De Una Probada. exportados desde lugares inigualables y extrabagante por ejemplo alguno de nuestros cafes son traidos del monte Everest
          </p>
        </div>
      )}

      <section id="home" className="home">
        <div className="content">
          <h3>cafe fresco por las mañanas</h3>
          <p></p>
          <button className="btn" onClick={() => scrollToSection('products')}>
            consigue el tuyo ahora
          </button>
        </div>
      </section>

      <section id="about" className="about">
        <h1 className="heading"><span>sobre</span> nosotros</h1>
        <div className="row">
          <div className="image">
            <img src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&h=400&fit=crop" alt="about" />
          </div>
          <div className="content">
            <h3>que hace a nuestro cafe especial?</h3>
            <p>cosechado desde diferentes partes del mundo, empaquetado con cariño y enviado desde nuestra sucursal son algunas de las cualidades que nuestro cafe sea merecedor de una probada</p>
            <button className="btn" onClick={() => setIsModalOpen(true)}>
              Mas Informacion
            </button>
          </div>
        </div>
      </section>

      <section id="menu" className="menu">
        <h1 className="heading">nuestro <span>menu</span></h1>
        <div className="box-container">
          {menuItems.map(item => (
            <div key={item.id} className="box">
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <div className="price">${item.price} <span>{item.oldPrice}</span></div>
              <button className="btn" onClick={() => addToCart(item)}>
                añadir al carrito
              </button>
            </div>
          ))}
        </div>
      </section>

      <section id="products" className="products">
        <h1 className="heading">nuestros <span>productos</span></h1>
        <div className="box-container">
          {products.map(product => (
            <div key={product.id} className="box">
              <div className="icons">
                <button onClick={() => addToCart(product)}>
                  <ShoppingCart />
                </button>
                <button>
                  <Heart />
                </button>
                <button>
                  <Eye />
                </button>
              </div>
              <div className="image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="content">
                <h3>{product.name}</h3>
                <div className="stars">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="star-filled" />
                  ))}
                  <Star className="star-half" />
                </div>
                <div className="price">${product.price} <span>${product.oldPrice}</span></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="review" className="review">
        <div className="box-container">
          {[
          ].map(review => (
            <div key={review.id} className="box">
              <img src="https://images.unsplash.com/photo-1589308078059-be1415eab4c7?w=50&h=50&fit=crop" alt="quote" className="quote" />
              <img src={review.image} alt="user" className="user" />
              <p>{review.review}</p>
              <h3>{review.name}</h3>
              <div className="stars">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="star-filled" />
                ))}
                <Star className="star-half" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="contact">
        <h1 className="heading"><span>contactenos</span></h1>
        <div className="row">
          <iframe 
            className="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30153.788252261566!2d72.82321484621745!3d19.141690214227783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b63aceef0c69%3A0x2aa80cf2287dfa3b!2sJogeshwari%20West%2C%20Mumbai%2C%20Maharashtra%20400047!5e0!3m2!1sen!2sin!4v1629452077891!5m2!1sen!2sin" 
            allowFullScreen 
            loading="lazy"
          />
          <form onSubmit={handleSubmit}>
            <h3>pongase en contacto</h3>
            <div className="inputBox">
              <User />
              <input 
                type="text" 
                name="name"
                placeholder="nombre" 
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="inputBox">
              <Mail />
              <input 
                type="email" 
                name="email"
                placeholder="email" 
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="inputBox">
              <Phone />
              <input 
                type="number" 
                name="number"
                placeholder="numero" 
                value={formData.number}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn">
              contactese ahora
            </button>
          </form>
        </div>
      </section>

      <section id="blogs" className="blogs">
        <h1 className="heading">nuestros <span>blogs</span></h1>
        <div className="box-container">
          <div className="box">
            <div className="image">
              <img src="https://images.unsplash.com/photo-1559496417-e7f25cb247cd?w=400&h=250&fit=crop" alt="blog" />
            </div>
            <div className="content">
              <button className="title">mis favoritos de nuestro local</button>
              <span>de admin / 21 mayo, 2021</span>
              <button className="btn">mas informacion</button>
            </div>
          </div>

          <div className="box">
            <div className="image">
              <img src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=250&fit=crop" alt="blog" />
            </div>
            <div className="content">
              <button className="title">delicioso y refrescante cafe</button>
              <span>de admin / 28 febrero, 2022</span>
              <button className="btn">mas informacion</button>
            </div>
          </div>

          <div className="box">
            <div className="image">
              <img src="https://images.unsplash.com/photo-1587734195503-904fca47e0e8?w=400&h=250&fit=crop" alt="blog" />
            </div>
            <div className="content">
              <button className="title">el arte del latte</button>
              <span>de admin / 31 de noviembre, 2021</span>
              <p>la dificil tarea de los baristas de hacer dibujos en el cafe explicado paso a paso</p>
              <button className="btn">mas informacion</button>
            </div>
          </div>
        </div>
      </section>

      <section className="footer">
        <div className="share">
          <button><Facebook /></button>
          <button><Twitter /></button>
          <button><Instagram /></button>
          <button><Linkedin /></button>
        </div>

        <div className="links">
          <button onClick={() => scrollToSection('home')}>inicio</button>
          <button onClick={() => scrollToSection('about')}>sobre</button>
          <button onClick={() => scrollToSection('menu')}>menu</button>
          <button onClick={() => scrollToSection('products')}>productos</button>
          <button onClick={() => scrollToSection('review')}>reseñas</button>
          <button onClick={() => scrollToSection('contact')}>contacto</button>
          <button onClick={() => scrollToSection('blogs')}>blogs</button>
        </div>

        <div className="credit">
          creado por <span>Sr Ivan Aquino</span> | Todos los derechos reservados
        </div>
      </section>
    </div>
  );
};

export default CoffeeShop;