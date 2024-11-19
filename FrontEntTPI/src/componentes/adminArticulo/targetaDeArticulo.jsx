import { Component } from 'react'
import Boton from '../comun/Boton';
import BotonRedireccionador from '../comun/BotonRedireccionador'

export default class  extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className='targeta'>
                <img className='targeta_imagen' src="\src\componentes\imagenes\cafe.jpeg" />
                <p>id : {this.props.objeto.id}</p>
                <p>nombre : {this.props.objeto.nombre}</p>
                <p>descripcion : {this.props.objeto.descripcion}</p>
                <p>precio : {this.props.objeto.precio}</p>
                <BotonRedireccionador
                    className='Boton'
                    ruta={'/admin/articulos/editar?id='+this.props.objeto.id}
                >editar</BotonRedireccionador>
                <Boton
                    click={()=>this.props.borrar(this.props.objeto.id)}
                    titulo='borrar'
                />
            </div>
        )
    }
}

