
import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

const editarManager = () => {
  const [paises, setPaises] = useState([
    { id: 1, nombre: ' ' },
    { id: 2, nombre: ' ' },
    { id: 3, nombre: ' ' }
  ]);
    const [provincia, setprovincia] = useState([
      { id: 1, nombre: ' ' },
      { id: 2, nombre: ' ' },
      { id: 3, nombre: ' ' }
    ]);
    const [ciudad, setciudad] = useState([
      { id: 1, nombre: ' ' },
      { id: 2, nombre: ' ' },
      { id: 3, nombre: ' ' }
    ]); 

  const [editingPais, setEditingPais] = useState(null);
  const [nuevoPaisNombre, setNuevoPaisNombre] = useState('');

  const agregarPais = () => {
    if (!nuevoPaisNombre.trim()) return;

    const nuevoPais = {
      id: Date.now(),
      nombre: nuevoPaisNombre
    };

    setPaises([...paises, nuevoPais]);
    setNuevoPaisNombre('');
    setEditingPais(null);
  };

  const editarPais = (pais) => {
    if (!nuevoPaisNombre.trim()) return;

    setPaises(paises.map(p => 
      p.id === pais.id ? { ...p, nombre: nuevoPaisNombre } : p
    ));

    setEditingPais(null);
    setNuevoPaisNombre('');
  };

  const eliminarPais = (paisId) => {
    setPaises(paises.filter(p => p.id !== paisId));
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Gestor de Países</h1>
        
        <div className="flex mb-4">
          <input
            type="text"
            value={nuevoPaisNombre}
            onChange={(e) => setNuevoPaisNombre(e.target.value)}
            placeholder="Nombre del país"
            className="flex-grow p-2 border rounded-l"
          />
          <input
            type="text"
            value={nuevoProvinciaNombre}
            onChange={(e) => setNuevoprovinciaNombre(e.target.value)}
            placeholder="Nombre de Provincia"
            className="flex-grow p-2 border rounded-l"
          />
          <input
            type="text"
            value={nuevoPaisNombre}
            onChange={(e) => setNuevoProvinciaNombre(e.target.value)}
            placeholder="Nombre del país"
            className="flex-grow p-2 border rounded-l"
          />
          <button 
            onClick={() => {
              setEditingPais(null);
              setNuevoPaisNombre('');
            }}
            className="bg-green-500 text-white p-2 rounded-r hover:bg-green-600 flex items-center"
          >
            <Plus className="mr-2" /> Agregar
          </button>
        </div>

        {editingPais === 'nuevo' && (
          <div className="flex justify-end space-x-2 mb-4">
            <button 
              onClick={agregarPais}
              className="bg-blue-500 text-white p-2 rounded flex items-center hover:bg-blue-600"
            >
              <Save className="mr-2" /> Guardar
            </button>
            <button 
              onClick={() => setEditingPais(null)}
              className="bg-red-500 text-white p-2 rounded flex items-center hover:bg-red-600"
            >
              <X className="mr-2" /> Cancelar
            </button>
          </div>
        )}

        <div className="space-y-2">
          {paises.map(pais => (
            <div 
              key={pais.id} 
              className="flex justify-between items-center p-3 border rounded hover:bg-gray-50"
            >
              {editingPais === pais.id ? (
                <div className="flex w-full space-x-2">
                  <input
                    type="text"
                    defaultValue={pais.nombre}
                    onChange={(e) => setNuevoPaisNombre(e.target.value)}
                    className="flex-grow p-2 border rounded"
                  />
                  <button 
                    onClick={() => editarPais(pais)}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                  >
                    <Save />
                  </button>
                  <button 
                    onClick={() => {
                      setEditingPais(null);
                      setNuevoPaisNombre('');
                    }}
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                  >
                    <X />
                  </button>
                </div>
              ) : (
                <>
                  <span>{pais.nombre}</span>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => {
                        setEditingPais(pais.id);
                        setNuevoPaisNombre(pais.nombre);
                      }}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      <Edit />
                    </button>
                    <button 
                      onClick={() => eliminarPais(pais.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default editarManager;