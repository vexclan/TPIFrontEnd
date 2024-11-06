import { Component } from 'react'
import Navbar from '../comun/navbar'
import TargetaArticulo from './targetaDeArticulo'
import TargetaCliente from './targetaDeCliente'

export default class AdminDatos extends Component {
  constructor(props){
    super(props);
    this.state = {
        tabla: "cliente",
        targetas: [{id:2,correo:'pepito@gmail.com',id_usuario:1,direccion:[1,2,3,4,50]},{id:3,correo:'pepito2@gmail.com',id_usuario:2,direccion:[1,2,30,50]}]
    }
  }

  render(){
    const { tabla , targetas } = this.state
    return(
        <div>
          
          <div className="container">
            {tabla === "articulo" ? 
              targetas.map ((contador, index)=>
                <TargetaArticulo
                  objeto={targetas[index]}
                  key={index}
                />
              )
            :  
              targetas.map ((contador, index)=>
                <TargetaCliente
                  objeto={targetas[index]}
                  key={index}
                />
              )
            }
          </div>
        </div>

    )
  }
}
