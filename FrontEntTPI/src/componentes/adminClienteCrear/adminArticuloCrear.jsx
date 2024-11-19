import { Component } from 'react'
import Navbar from '../comun/navbarAdmin'
import Formulario from './formulario'

export default class AdminEditar extends Component {
  constructor(props){
    super(props);
    this.state= {
      articulo: [{id:1 , id_de_cliente:1 , nombre:'cafe' , cantidad:30 , precio:300 },{id:2 , id_de_cliente:1 , nombre:'cafe americano exprese ' , cantidad:100 , precio:400 }]
    }
  }

  render(){
    return(
        <div>
          <Navbar/>
          <div className="container">
            <Formulario/>
          </div>
        </div>

    )
  }
}
