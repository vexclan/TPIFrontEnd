import { Component } from 'react'
import Articulo from './articulo'
import './articulosPedidos.css'

export default class articuloPedido extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className='articulos_pedidos'>
                <h3>Articulos pedidos</h3>
                
                {this.props.articulo.map((contador, index)=>
                    <Articulo
                        objeto={contador}
                        key={index}
                    />
                )}


            </div>
        )
    }
}

