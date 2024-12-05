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
                <h3>Dirección</h3>
                <p>id: {this.props.objeto.id}</p>
                <p>id_cliente: {this.props.objeto.id_cliente}</p>
                <p>calle: {this.props.objeto.calle}</p>
                <p>código_postal: {this.props.objeto.código_postal}</p>
                <p>id , pais: {this.props.objeto.id_pais} , {this.props.objeto.pais}</p>
                <p>id , provincia: {this.props.objeto.id_provincia} , {this.props.objeto.provincia}</p>
                <p>id , ciudad: {this.props.objeto.id_ciudad} ,  {this.props.objeto.ciudad}</p>
                <BotonRedireccionador
                    className='Boton'
                    ruta={'/admin/dirrecciones/editar/'+this.props.objeto.id}
                >editar</BotonRedireccionador>
                <Boton
                    click={()=>this.props.borrar(this.props.objeto.id)}
                    titulo='borrar'
                />
            </div>
        )
    }
}

