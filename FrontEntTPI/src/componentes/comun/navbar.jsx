import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            {/* Logo */}
            <div className="flex items-center py-4">
              <span className="font-bold text-xl text-gray-800">Logo</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <a href="#" className="py-4 px-3 text-gray-700 hover:text-gray-900">Inicio</a>
              <a href="#" className="py-4 px-3 text-gray-700 hover:text-gray-900">Productos</a>
              <a href="#" className="py-4 px-3 text-gray-700 hover:text-gray-900">Servicios</a>
              <a href="#" className="py-4 px-3 text-gray-700 hover:text-gray-900">Contacto</a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="mobile-menu-button p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={md:hidden ${isOpen ? 'block' : 'hidden'}}>
        <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-100">Inicio</a>
        <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-100">Productos</a>
        <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-100">Servicios</a>
        <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-100">Contacto</a>
      </div>
    </nav>
  );
};

export default Navbar;