import { Component } from 'react'
import Navbar from '../comun/navbarAdmin'
import Formulario from './formulario'

export default class AdminEditar extends Component {
  constructor(props){
    super(props);
    this.state= {
    }
  }

  render(){
    return(
        <div>
          <Navbar/>
          <div className="container">
            <Formulario
              id={this.props.id}
            />
          </div>
        </div>

    )
  }
}
