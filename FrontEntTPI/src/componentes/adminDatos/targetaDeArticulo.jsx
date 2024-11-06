import { Component } from 'react'
import Boton from '../comun/Boton'

export default class  extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className='articulo'>
                <img className='targeta_imagen' src="\src\componentes\imagenes\cafe.jpeg" />
                <p>id : {this.props.objeto.id}</p>
                <p>nombre : {this.props.objeto.nombre}</p>
                <p>descripcion : {this.props.objeto.descripcion}</p>
                <p>precio : {this.props.objeto.precio}</p>
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

