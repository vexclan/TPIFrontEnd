/*import React, { useState } from 'react';
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
=======
import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import Navbar from '../comun/navbarAdmin';
import axios from 'axios'

  async function get(tabla) {
    const token = sessionStorage.getItem('token')
    const url = "http://localhost:3000/api/"
    const config = {
      headers:{
        authorization:token
      },
    }
    console.log(config)
  
    try {
      const respuesta = await axios.get(url+tabla,config);
      console.log('respuesta data post ' + tabla +  ':',respuesta.data);
      return respuesta.data;
    } catch (error) {
      console.log(error);
      alert(error);
      throw error;
    }
  }

const editarManager = () => {
  sessionStorage.setItem('token' , 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzQwNTY2NzQsImRhdGEiOnsiVXN1YXJpb19pZCI6MSwiVXN1YXJpbyI6IkRpZWdvIn0sImlhdCI6MTczNDAzNTA3NH0.VR8JzLox_RsUQdWvw8J6Ns78wGYIo-ZfgXEjgmIB1QE')
  const [paises, setPaises] = useState([]);
  const [provincia, setprovincia] = useState([])
  const [ciudad, setciudad] = useState([]); 

  const [nuevoPais, setnuevoPais] = useState({nombre:'',id:''});
  const [nuevoProvinciaNombre, setNuevoProvinciaNombre] = useState({nombre:'',id:''});
  const [nuevoCiudadNombre, setNuevoCiudadNombre] = useState({nombre:'',id:''});

  async function actualizar() {
    setPaises((await get('pais')).Pais)
    setprovincia((await get('provincia')).Provincia)
    setciudad((await get('ciudad')).Ciudad)    
  }


    /*
  const agregarPais = () => {
    if (!nuevoPais.trim()) return;

    const nuevoPais = {
      id: Date.now(),
      nombre: nuevoPais
    };

    setPaises([...paises, nuevoPais]);
    setnuevoPais('');
 main
    setEditingPais(null);
  };

  const editarPais = (pais) => {
 celina
    if (!nuevoPaisNombre.trim()) return;

    setPaises(paises.map(p => 
      p.id === pais.id ? { ...p, nombre: nuevoPaisNombre } : p
    ));

    setEditingPais(null);
    setNuevoPaisNombre('');
=======
    if (!nuevoPais.trim()) return;

    setPaises(paises.map(p => 
      p.id === pais.id ? { ...p, nombre: nuevoPais } : p
    ));

    setEditingPais(null);
    setnuevoPais('');
 main
  };

  const eliminarPais = (paisId) => {
    setPaises(paises.filter(p => p.id !== paisId));
 celina
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
=======
  };*/

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <Navbar/>
 main
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Gestor de Países</h1>
        
        <div className="flex mb-4">
 celina
          <input
            type="text"
            value={nuevoPaisNombre}
            onChange={(e) => setNuevoPaisNombre(e.target.value)}
=======
          
          <label 
            htmlFor="Id"
          >
            Id 
          </label>
          <select 
            className='input_form' 
            id='Id' 
            value={nuevoPais.id}
            onChange={(e)=> this.setnuevoPais({nombre:nuevoPais.nombre,id:e.target.value})}
          >
            <option value={null}>id a editar</option>
            {paises.map((contador, index)=>
              <option value={contador.id} key={index}>{contador.id} {contador.id}</option>
            )}
          </select>
          <input
            type="text"
            value={nuevoPais.nombre}
            onChange={(e) => setnuevoPais({nombre:e.target.value,id:nuevoPais.id})}
 main
            placeholder="Nombre del país"
            className="flex-grow p-2 border rounded-l"
          />
          <input
            type="text"
 celina
            value={nuevoProvinciaNombre}
            onChange={(e) => setNuevoprovinciaNombre(e.target.value)}
=======
            value={nuevoProvinciaNombre.nombre}
            onChange={(e) => setNuevoProvinciaNombre({nombre:e.target.value,id:nuevoPais.id})}
 main
            placeholder="Nombre de Provincia"
            className="flex-grow p-2 border rounded-l"
          />
          <input
            type="text"
 celina
            value={nuevoPaisNombre}
            onChange={(e) => setNuevoProvinciaNombre(e.target.value)}
=======
            value={nuevoCiudadNombre.nombre}
            onChange={(e) => setNuevoCiudadNombre({nombre:e.target.value,id:nuevoPais.id})}
 main
            placeholder="Nombre del país"
            className="flex-grow p-2 border rounded-l"
          />
          <button 
            onClick={() => {
              setEditingPais(null);
 celina
              setNuevoPaisNombre('');
=======
              setnuevoPais('');
 main
            }}
            className="bg-green-500 text-white p-2 rounded-r hover:bg-green-600 flex items-center"
          >
            <Plus className="mr-2" /> Agregar
          </button>
        </div>

 celina
        {editingPais === 'nuevo' && (
=======
        {/*editingPais === 'nuevo' && (
 main
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
 celina
                    onChange={(e) => setNuevoPaisNombre(e.target.value)}
=======
                    onChange={(e) => setnuevoPais(e.target.value)}
 main
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
 celina
                      setNuevoPaisNombre('');
=======
                      setnuevoPais('');
 main
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
 celina
                        setNuevoPaisNombre(pais.nombre);
=======
                        setnuevoPais(pais.nombre);
 main
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
 celina
          ))}
        </div>
=======
        </div>
          ))*/}
 main
      </div>
    </div>
  );
};

export default editarManager;