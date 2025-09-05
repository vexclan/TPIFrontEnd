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
                <h3>{this.props.objeto.tabla}</h3>
                <p>id : {this.props.objeto.id}</p>
                <p>nombre : {this.props.objeto.nombre}</p>
                <BotonRedireccionador
                    className='Boton'
                    ruta={'/admin/Ubicacion/editar/'+this.props.objeto.id+'/'+this.props.objeto.tabla}
                >editar</BotonRedireccionador>
                <Boton
                    click={()=>this.props.borrar(this.props.objeto.id,this.props.objeto.tabla)}
                    titulo='borrar'
                />
            </div>
        )
    }
}

