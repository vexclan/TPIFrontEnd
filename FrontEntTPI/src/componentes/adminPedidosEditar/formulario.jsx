import { Component } from 'react'
import Boton from '../comun/Boton'
import './Formulario.css'

export default class FormulariEditar extends Component {
  constructor(props){
    super(props);
    this.state = {
        ID_PEDIDO:[1,2,3,4,5],
        ID_CLIENTE:[{id:10 , nombre: 'pepito'},{id:9 , nombre: 'celina'},{id:8 , nombre: 'ivan'},{id:7 , nombre: 'agustin'},{id:6 , nombre: 'jorge'}],
        PRECIO_ENVÍO:"", 
        FECHA:"",
        TOTAL:"",
        FORMA_PAGO:"",
    }
  }

  render(){
    const { ID_PEDIDO , ID_CLIENTE , PRECIO_ENVÍO , FECHA , TOTAL , FORMA_PAGO} = this.state
    return(
      <div className='formulario'>

        <h2>Editar Pedido</h2>
        <label 
          htmlFor="Id_Pedido"
        >
          Id Pedido
        </label>
        <select 
          className='input_form' 
          id='Id_Pedido' 
        >
          <option>id del pedido a editar</option>
          {ID_PEDIDO.map((contador, index)=>
            <option value={contador} key={index}>{contador}</option>
          )}
        </select>
        <label 
          htmlFor="Id_Cleinte"
        >
          Id cliente
        </label>
        <select 
          className='input_form' 
          id='Id_Cleinte'
        >
          <option>id del cliente</option>
          {ID_CLIENTE.map((contador, index)=>
            <option value={contador.id} key={index}>{contador.id} ({contador.nombre})</option>
          )}
        </select>

        <label 
          htmlFor="PRECIO_ENVÍO"
        >
          Precio envío 
        </label>
        <input
          id='PRECIO_ENVÍO'
          type="number"
          className='input_form'
          placeholder='PRECIO_ENVÍO'
          value={PRECIO_ENVÍO}
          onChange={(e)=> this.setState({PRECIO_ENVÍO:e.target.value})}
        />

        <label 
          htmlFor="Fecha_Envio"
        >
          Fecha de envio
        </label>
        <input
          id='Fecha_Envio'
          type="date"
          className='input_form'
          value={FECHA}
          onChange={(e)=> this.setState({FECHA:e.target.value})}
        />

        <label 
          htmlFor="TOTAL"
        >
          Total a pagar
        </label>
        <input
          id='TOTAL'
          type="number"
          className='input_form'
          placeholder='TOTAL'
          value={TOTAL}
          onChange={(e)=> this.setState({TOTAL:e.target.value})}
        />

        <label 
          htmlFor="FORMA_PAGO"
        >
          Forma de pago
        </label>
        <input
          id='FORMA_PAGO'
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
