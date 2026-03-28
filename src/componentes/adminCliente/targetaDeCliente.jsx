import { Component } from 'react'
import Boton from '../comun/Boton'
import BotonRedireccionador from '../comun/BotonRedireccionador'

export default class  extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className={this.props.clase+' targeta'}>
                <h3>cliente</h3>
                <p>id : {this.props.objeto.id}</p>
                <p>correo : {this.props.objeto.Correo}</p>
                <p>id  de usuario : {this.props.objeto.id_usuario}</p>
                <p>usuario : {this.props.objeto.Usuario}</p>
                <p>direcciones registradas : {this.props.objeto.Direcciones}</p>
                <BotonRedireccionador
                    className='Boton'
                    ruta={'/admin/clientes/editar/'+this.props.objeto.id}
                >editar</BotonRedireccionador>
                <Boton
                    click={()=>this.props.borrar(this.props.objeto.id)}
                    titulo='borrar'
                />
            </div>
        )
    }
}

