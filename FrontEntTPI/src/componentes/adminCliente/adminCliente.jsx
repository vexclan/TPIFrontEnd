import { Component } from 'react'
import Navbar from '../comun/navbarAdmin'
import TargetaCliente from './targetaDeCliente'

export default class AdminDatos extends Component {
  constructor(props){
    super(props);
    this.state = {
        tabla: "cliente",
        targetas: [{id:2,correo:'pepito@gmail.com',id_usuario:1,direccion:[1,2,3,4,50]},{id:2,correo:'pepito@gmail.com',id_usuario:1,direccion:[1,2,3,4,50]},{id:2,correo:'pepito@gmail.com',id_usuario:1,direccion:[1,2,3,4,50]},{id:2,correo:'pepito@gmail.com',id_usuario:1,direccion:[1,2,3,4,50]},{id:2,correo:'pepito@gmail.com',id_usuario:1,direccion:[1,2,3,4,50]},{id:3,correo:'pepito2@gmail.com',id_usuario:2,direccion:[1,2,30,50]}]
        /*CLIETE : {id:2,correo:'pepito@gmail.com',id_usuario:1,direccion:[1,2,3,4,50]} 
          ARTICULO : {imagen:"../../assets/cafe.jpeg",id:1,nombre:"cafe",descripcion:"sadasdsaddasdas",precio:200}
          dirreccion : {}
          PEDIDOS : {}          
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
                <TargetaCliente
                  objeto={targetas[index]}
                  key={index}
                />
              )}
          </div>
        </div>

    )
  }
}
