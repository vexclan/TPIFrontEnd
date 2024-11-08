import { Component } from 'react'
import Boton from '../comun/Boton'

export default class  extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className='targeta'>
                <h3>cliente</h3>
                <p>id : {this.props.objeto.id}</p>
                <p>correo : {this.props.objeto.correo}</p>
                <p>id  de usuario : {this.props.objeto.id_usuario}</p>
                <p>direcciones registradas : {this.props.objeto.direccion.length}</p>
                <Boton
                    click={()=>console.log('editar')}
                    titulo='editar'
                />
                <Boton
                    click={()=>console.log('borrar')}
                    titulo='borrar'
                />
            </div>
        )
    }
}

