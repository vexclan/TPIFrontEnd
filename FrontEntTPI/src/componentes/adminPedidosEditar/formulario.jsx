import { Component } from 'react'
import Boton from '../comun/Boton'
import './Formulario.css'

export default class FormulariEditar extends Component {
  constructor(props){
    super(props);
    this.state = {
        ID_PEDIDO:[1,2,3,4,5],
        ID_CLIENTE:[10,9,8,7,6],
        PRECIO_ENVÍO:"", 
        FECHA:"",
        TOTAL:"",
        FORMA_PAGO:"",
    }
  }

  render(){
    const { ID_PEDIDO , ID_CLIENTE , PRECIO_ENVÍO , FECHA , TOTAL , FORMA_PAGO} = this.state
    return(
      <div className='contenedor_vertical'>

        <h2>Editar</h2>
        <select className='input_form' >
            {ID_PEDIDO.map((contador, index)=>
            <option value={contador} key={index}>{contador}</option>
            )}
        </select>
        <select className='input_form' >
            {ID_CLIENTE.map((contador, index)=>
            <option value={contador} key={index}>{contador}</option>
            )}
        </select>

        <input
            type="number"
            className='input_form'
            placeholder='PRECIO_ENVÍO'
            value={PRECIO_ENVÍO}
            onChange={(e)=> this.setState({PRECIO_ENVÍO:e.target.value})}
        />

        <input
            type="date"
            className='input_form'
            placeholder='FECHA'
            value={FECHA}
            onChange={(e)=> this.setState({FECHA:e.target.value})}
        />

        <input
            type="number"
            className='input_form'
            placeholder='TOTAL'
            value={TOTAL}
            onChange={(e)=> this.setState({TOTAL:e.target.value})}
        />

        <input
            type="text"
            className='input_form'
            placeholder='FORMA_PAGO'
            value={FORMA_PAGO}
            onChange={(e)=> this.setState({FORMA_PAGO:e.target.value})}
        />

        <Boton 
            className=''
            click={() => this.editar()}
            titulo='editar'
        />
      </div>
    )
  }
}
