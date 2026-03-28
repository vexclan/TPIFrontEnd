import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './informe.css'

const MiCuenta = () => {
  sessionStorage.setItem('token' , 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzQwNTQ0ODYsImRhdGEiOnsiVXN1YXJpb19pZCI6MiwiVXN1YXJpbyI6Iml2YW5BIn0sImlhdCI6MTczNDAzMjg4Nn0.XX73A5j-xGP0_C7iPQ8A_TEXRKz2bSsfiuylJIarmMA')
  const [pedidos, setPedidos] = useState([]);
  const [Direccion, setDireccion] = useState([]);
  console.log(Direccion , pedidos)
  
  useEffect(() => {
    // Obtener información de pedidos
    const token = sessionStorage.getItem("token")
    const url = "http://localhost:3000/api/"
    const config = {
      headers:{
        authorization:token
      }
    }

    console.log(config);

    axios.get(url +'pedido', config)
      .then(response => {setPedidos(response.data.Pedido)
        console.log(response) })
      .catch(error => console.error(error));


    // Obtener información de direccion
    axios.get(url +'direccion', config)
      .then(response => setDireccion(response.data.Direccion))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="mi-cuenta">
      <h2>Mis Pedidos</h2>
      <div className="pedidos">
        {pedidos.map(pedido => (
          <div key={pedido.id} className="pedido">
            <div>Fecha: {pedido.fecha}</div>
            <div>
              <button onClick={() => verDetalle(pedido.id)}>Ver Detalle</button>
            </div>
          </div>
        ))}
      </div>

      <h2>Mis Direcciones</h2>
      <div className="Direcciones">
      {Direccion.map((contenido, index)=> 
       <div className="Direccion">
         <div>Envío a Direccion</div>
         <div>Calle: {contenido.calle}</div>
         <div>Ciudad: {contenido.ciudad}</div>
         <div>Código Postal: {contenido.código_postal}</div>
         <div>Pais: {contenido.pais}</div>
         <div>Provincia: {contenido.provincia}</div>
         <div>
           <button onClick={() => cambiarDireccion()}>Cambiar o agregar Direccion</button>
         </div>
       </div>       
      )}
      </div>
    </div>
  );
};

export default MiCuenta;