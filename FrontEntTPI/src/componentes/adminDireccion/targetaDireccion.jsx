import { Component } from 'react'
import Boton from '../comun/Boton'

export default class  extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className='targeta'>
                <h3>Dirección</h3>
                <p>id: {this.props.objeto.id}</p>
                <p>id_cliente: {this.props.objeto.id_cliente}</p>
                <p>calle: {this.props.objeto.calle}</p>
                <p>código_postal: {this.props.objeto.código_postal}</p>
                <p>id_pais: {this.props.objeto.id_pais}</p>
                <p>id_provincia: {this.props.objeto.id_provincia}</p>
                <p>id_ciudad: {this.props.objeto.id_ciudad}</p>

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

