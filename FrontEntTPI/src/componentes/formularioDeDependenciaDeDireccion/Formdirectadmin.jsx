import React, { useState } from 'react';
import { PlusCircle, Trash2, Globe, MapPin, Building2 } from 'lucide-react';

async function get(dato) {
    sessionStorage.setItem('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzM0NjMwMTgsImRhdGEiOnsiVXN1YXJpb19pZCI6NSwiVXN1YXJpbyI6IkNlbGluYSJ9LCJpYXQiOjE3MzM0NDE0MTh9.-XYiY4Z-8zpQMyYH2ixVduoo7voTXkGLkV2HPpZrKwI')
    const token = sessionStorage.getItem('token')
    const url = "http://localhost:3000/api/articulo"
    const config = {
      headers:{
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

const LocationManagement = () => {
  const [locations, setLocations] = useState({
    countries: [],
    provinces: [],
    cities: []
  });

  const [newCountry, setNewCountry] = useState('');
  const [newProvince, setNewProvince] = useState('');
  const [newCity, setNewCity] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');

  const addLocation = (type) => {
    switch(type) {
      case 'country':
        if (newCountry && !locations.countries.includes(newCountry)) {
          setLocations(prev => ({
            ...prev,
            countries: [...prev.countries, newCountry],
            provinces: { ...prev.provinces, [newCountry]: [] },
            cities: { ...prev.cities, [newCountry]: {} }
          }));
          setNewCountry('');
        }
        break;
      
        case 'Provincia':
            if (newProvincia && !locations.provincias.includes(newProvincia)) {
              setLocations(prev => ({
                ...prev,
                countries: [...prev.countries, newCountry],
                provinces: { ...prev.provinces, [newCountry]: [] },
                cities: { ...prev.cities, [newCountry]: {} }
              }));
              setNewProvince('');
            }
            break;
      
      case 'city':
        if (selectedCountry && selectedProvince && newCity) {
          setLocations(prev => ({
            ...prev,
            cities: {
              ...prev.cities,
              [selectedCountry]: {
                ...prev.cities[selectedCountry],
                [selectedProvince]: [
                  ...(prev.cities[selectedCountry][selectedProvince] || []), 
                  newCity
                ]
              }
            }
          }));
          setNewCity('');
        }
        break;
    }
  };

  const removeLocation = (type, location, parentLocation = null) => {
    switch(type) {
      case 'country':
        setLocations(prev => ({
          countries: prev.countries.filter(c => c !== location),
          provinces: Object.fromEntries(
            Object.entries(prev.provinces).filter(([country]) => country !== location)
          ),
          cities: Object.fromEntries(
            Object.entries(prev.cities).filter(([country]) => country !== location)
          )
        }));
        break;
      
      case 'province':
        setLocations(prev => ({
          ...prev,
          provinces: {
            ...prev.provinces,
            [parentLocation]: prev.provinces[parentLocation].filter(p => p !== location)
          },
          cities: {
            ...prev.cities,
            [parentLocation]: Object.fromEntries(
              Object.entries(prev.cities[parentLocation]).filter(([province]) => province !== location)
            )
          }
        }));
        break;
      
      case 'city':
        setLocations(prev => ({
          ...prev,
          cities: {
            ...prev.cities,
            [parentLocation]: {
              ...prev.cities[parentLocation],
              [selectedProvince]: prev.cities[parentLocation][selectedProvince].filter(c => c !== location)
            }
          }
        }));
        break;
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Gestión de Ubicaciones</h1>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Globe className="mr-2" /> Países
          </h2>
          <div className="flex mb-4">
            <input 
              type="text" 
              value={newCountry}
              onChange={(e) => setNewCountry(e.target.value)}
              placeholder="Nombre del país" 
              className="flex-grow p-2 border rounded-l" 
            />
            <button 
              onClick={() => addLocation('country')} 
              className="bg-blue-500 text-white p-2 rounded-r"
            >
              <PlusCircle size={20} />
            </button>
          </div>
          <div className="space-y-2">
            {locations.countries.map((country) => (
              <div 
                key={country} 
                className="flex justify-between items-center bg-gray-100 p-2 rounded"
              >
                <span>{country}</span>
                <button 
                  onClick={() => removeLocation('country', country)}
                  className="text-red-500 hover:bg-red-100 rounded p-1"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <MapPin className="mr-2" /> Provincias
          </h2>
          <div className="mb-4">
            <div className="flex">
              <input 
                type="text" 
                value={newProvince}
                onChange={(e) => setNewProvince(e.target.value)}
                placeholder="Nombre de la provincia" 
                className="flex-grow p-2 border rounded-l" 
                disabled={!selectedCountry}
              />
              <button 
                onClick={() => addLocation('province')} 
                className="bg-blue-500 text-white p-2 rounded-r"
                disabled={!selectedCountry}
              >
                <PlusCircle size={20} />
              </button>
            </div>
          </div>
          <div className="space-y-2">
            {selectedCountry && 
              locations.provinces[selectedCountry]?.map((province) => (
                <div 
                  key={province} 
                  className="flex justify-between items-center bg-gray-100 p-2 rounded"
                >
                  <span>{province}</span>
                  <button 
                    onClick={() => removeLocation('province', province, selectedCountry)}
                    className="text-red-500 hover:bg-red-100 rounded p-1"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))
            }
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Building2 className="mr-2" /> Ciudades
          </h2>
          <div className="mb-4">
            <div className="flex">
              <input 
                type="text" 
                value={newCity}
                onChange={(e) => setNewCity(e.target.value)}
                placeholder="Nombre de la ciudad" 
                className="flex-grow p-2 border rounded-l" 
                disabled={!selectedCountry || !selectedProvince}
              />
              <button 
                onClick={() => addLocation('city')} 
                className="bg-blue-500 text-white p-2 rounded-r"
                disabled={!selectedCountry || !selectedProvince}
              >
                <PlusCircle size={20} />
              </button>
            </div>
          </div>
          <div className="space-y-2">
            {selectedCountry && selectedProvince && 
              locations.cities[selectedCountry]?.[selectedProvince]?.map((city) => (
                <div 
                  key={city} 
                  className="flex justify-between items-center bg-gray-100 p-2 rounded"
                >
                  <span>{city}</span>
                  <button 
                    onClick={() => removeLocation('city', city, selectedCountry)}
                    className="text-red-500 hover:bg-red-100 rounded p-1"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationManagement;