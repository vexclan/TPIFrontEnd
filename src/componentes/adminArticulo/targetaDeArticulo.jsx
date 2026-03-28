import { Component } from 'react'
import Boton from '../comun/Boton';
import BotonRedireccionador from '../comun/BotonRedireccionador'

export default class  extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className={this.props.clase+' targeta'}>
                <img className='targeta_imagen' src={'http://localhost:3000/'+this.props.objeto.imagen} />
                <p>id : {this.props.objeto.id}</p>
                <p>nombre : {this.props.objeto.nombre}</p>
                <p>descripcion : {this.props.objeto.descripcion}</p>
                <p>precio : {this.props.objeto.precio}</p>
                <BotonRedireccionador
                    className='Boton'
                    ruta={'/admin/articulos/editar/'+this.props.objeto.id}
                >editar</BotonRedireccionador>
                <Boton
                    click={()=>this.props.borrar(this.props.objeto.id)}
                    titulo='borrar'
                />
            </div>
        )
    }
}

