import { Component } from 'react'
import Navbar from '../comun/navbarAdmin'
import TargetaArticulo from './targetaDeArticulo'

export default class AdminDatos extends Component {
  constructor(props){
    super(props);
    this.state = {
        targetas: [{imagen:"../../assets/cafe.jpeg",id:1,nombre:"cafe",descripcion:"sadasdsaddasdas",precio:200},{imagen:"../../assets/cafe.jpeg",id:1,nombre:"cafe",descripcion:"sadasdsaddasdas",precio:200},{imagen:"../../assets/cafe.jpeg",id:1,nombre:"cafe",descripcion:"sadasdsaddasdas",precio:200},{imagen:"../../assets/cafe.jpeg",id:1,nombre:"cafe",descripcion:"sadasdsaddasdas",precio:200}]
        /*CLIETE : {id:2,correo:'pepito@gmail.com',id_usuario:1,direccion:[1,2,3,4,50]} 
          ARTICULO : {imagen:"../../assets/cafe.jpeg",id:1,nombre:"cafe",descripcion:"sadasdsaddasdas",precio:200}
          dirreccion : {id:'' ,id_cliente : '' ,calle : '' ,código_postal : '' ,id_pais : '' , id_provincia :'', id_ciudad:''}
          PEDIDOS : {id: 12345,id_de_cliente: 98765,precio_de_envio: 10.99,fecha: "2023-10-26",total: 59.99,forma_de_pago: "Tarjeta de crédito"}          
          */
    }
  }

  render(){
    const { tabla , targetas } = this.state
    return(
        <div>
          <Navbar/>
          <div className="container">
            {targetas.map ((contador, index)=>
                <TargetaArticulo
                  objeto={targetas[index]}
                  key={index}
                />
              )}
          </div>
        </div>

    )
  }
}
