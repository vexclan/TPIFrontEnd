import { Component } from 'react'
import Boton from '../comun/Boton'

export default class  extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className='articulo'>
                <img className='imagen_del_articulo' src={'http://localhost:3000/'+this.props.objeto.imagen} />
                <div className='texto'>
                    <p>id: {this.props.objeto.id}<br/>
                    id del articulo: {this.props.objeto.id_de_cliente}<br/>
                    nombre: {this.props.objeto.nombre}<br/>
                    cantidad: {this.props.objeto.cantidad}<br/>
                    precio: {this.props.objeto.precio}</p>
                </div>

                <div className="botonera">
                    <Boton
                        click={()=>console.log('editar')}
                        titulo='editar'
                    />
                    <Boton
                        click={()=>console.log('borrar')}
                        titulo='borrar'
                    />
                </div>
            </div>
        )
    }
}

