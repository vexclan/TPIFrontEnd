import { Component } from 'react'
import Boton from '../comun/Boton'
import './Formulario.css'

export default class FormulariEditar extends Component {
  constructor(props){
    super(props);
    this.state = {
        ID:[1,2,3,4,5],
        nombre:"", 
        descripcion:"",
        precio:"",
        link_imagen:""
    }
  }

  render(){
    const { ID , nombre , descripcion , precio , link_imagen} = this.state
    return(
      <div className='formulario'>

        <h2>Editar Articulo</h2>
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
          htmlFor="nombre"
        >
          Nombre 
        </label>
        <input
          id='nombre'
          type="text"
          className='input_form'
          placeholder='nombre'
          value={nombre}
          onChange={(e)=> this.setState({nombre:e.target.value})}
        />

        <label 
          htmlFor="descripcion"
        >
          Descripcion
        </label>
        <input
          id='descripcion'
          type="text"
          className='input_form'
          placeholder='descripcion'
          value={descripcion}
          onChange={(e)=> this.setState({descripcion:e.target.value})}
        />

        <label 
          htmlFor="precio"
        >
          Precio
        </label>
        <input
          id='precio'
          type="number"
          className='input_form'
          placeholder='precio'
          value={precio}
          onChange={(e)=> this.setState({precio:e.target.value})}
        />

        <label 
          htmlFor="imagen"
        >
          imagen
        </label>
        <input
          id='imagen'
          type="file"
          className='input_form'
          value={link_imagen}
          onChange={(e)=> this.setState({link_imagen:e.target.value})}
        />
        <h3>imagen actual</h3>
        <img src="\src\componentes\imagenes\cafe.jpeg" />

        <Boton 
          className=''
          click={() => this.editar()}
          titulo='editar'
        />
      </div>
    )
  }
}
