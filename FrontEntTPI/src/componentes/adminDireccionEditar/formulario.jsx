import { Component } from 'react'
import Boton from '../comun/Boton'
import './Formulario.css'

export default class FormulariEditar extends Component {
  constructor(props){
    super(props);
    this.state = {
        ID:[1,2,3,4,5],
        ID_CLIENTE:[{id:10 , nombre: 'pepito'},{id:9 , nombre: 'celina'},{id:8 , nombre: 'ivan'},{id:7 , nombre: 'agustin'},{id:6 , nombre: 'jorge'}],
        Calle:"", 
        codigo_postal:"",
        ID_ciudad:[{id:1 , nombre: 'Ushuaia'},{id:2 , nombre: 'tolguin'},{id:3 , nombre: 'rio grande'}],
        ID_pais:[{id:10 , nombre: 'argentina'},{id:9 , nombre: 'paraguai'},{id:8 , nombre: 'bolivia'},{id:7 , nombre: 'peru'},{id:6 , nombre: 'uruguai'}],
        ID_provincia:[{id:10 , nombre: 'TDF'},{id:9 , nombre: 'Buenos Aires'},{id:8 , nombre: 'Santa fe'},{id:7 , nombre: 'Chubut'},{id:6 , nombre: 'Entre Rios'}]
    }
  }

  render(){
    const { ID , ID_CLIENTE , Calle , codigo_postal , ID_ciudad , ID_pais , ID_provincia} = this.state
    return(
      <div className='formulario'>

        <h2>Editar Dirrección</h2>
        <label 
          htmlFor="Id"
        >
          Id 
        </label>
        <select 
          className='input_form' 
          id='Id' 
        >
          <option>id a editar</option>
          {ID.map((contador, index)=>
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
          htmlFor="Calle"
        >
          Calle 
        </label>
        <input
          id='Calle'
          type="text"
          className='input_form'
          placeholder='Calle'
          value={Calle}
          onChange={(e)=> this.setState({Calle:e.target.value})}
        />

        <label 
          htmlFor="codigo_postal"
        >
          codigo_postal
        </label>
        <input
          id='codigo_postal'
          type="text"
          className='input_form'
          placeholder='codigo_postal'
          value={codigo_postal}
          onChange={(e)=> this.setState({codigo_postal:e.target.value})}
        />

        <label 
          htmlFor="ID_ciudad"
        >
          Id ciudad
        </label>
        <select 
          className='input_form' 
          id='ID_ciudad'
        >
          <option>id del ciudad</option>
          {ID_ciudad.map((contador, index)=>
            <option value={contador.id} key={index}>{contador.id} ({contador.nombre})</option>
          )}
        </select>
        <label 
          htmlFor="ID_provincia"
        >
          Id provincia
        </label>
        <select 
          className='input_form' 
          id='ID_provincia'
        >
          <option>id del provincia</option>
          {ID_provincia.map((contador, index)=>
            <option value={contador.id} key={index}>{contador.id} ({contador.nombre})</option>
          )}
        </select>
        <label 
          htmlFor="ID_pais"
        >
          Id pais
        </label>
        <select 
          className='input_form' 
          id='ID_pais'
        >
          <option>id del pais</option>
          {ID_pais.map((contador, index)=>
            <option value={contador.id} key={index}>{contador.id} ({contador.nombre})</option>
          )}
        </select>

        <Boton 
          className=''
          click={() => this.editar()}
          titulo='editar'
        />
      </div>
    )
  }
}
