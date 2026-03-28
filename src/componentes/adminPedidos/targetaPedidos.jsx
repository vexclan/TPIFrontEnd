import { Component } from 'react'
import Boton from '../comun/Boton'
import '../comun/Formulario.css'
import BotonRedireccionador from '../comun/BotonRedireccionador'

export default class  extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className={this.props.clase+' targeta'}>
                <h3>Pedidos</h3>
                <p>id: {this.props.objeto.id}</p>
                <p>id_de_cliente: {this.props.objeto.id_de_cliente}</p>
                <p>precio_de_envio: {this.props.objeto.precio_de_envio}</p>
                <p>fecha: {this.props.objeto.fecha}</p>
                <p>total: {this.props.objeto.total}</p>
                <p>forma_de_pago: {this.props.objeto.forma_de_pago}</p>
                <BotonRedireccionador
                    className='Boton'
                    ruta={'/admin/pedidos/editar/'+this.props.objeto.id}
                >editar</BotonRedireccionador>
                <Boton
                    click={()=>console.log('borrar')}
                    titulo='borrar'
                />
            </div>
        )
    }
}

