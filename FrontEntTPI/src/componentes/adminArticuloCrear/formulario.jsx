import { Component } from 'react'
import Boton from '../comun/Boton'
import './Formulario.css'
import axios from 'axios'

export default class FormulariCrear extends Component {
  constructor(props){
    super(props);
    this.state = {
        token:'',
        nombre:"", 
        descripcion:"",
        precio:"",
        imagen:{},
        activo:0
    }
  }
  
  async componentDidMount() {
    sessionStorage.setItem('token' ,"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzIzMzM0NzQsImRhdGEiOnsiVXN1YXJpb19pZCI6MSwiVXN1YXJpbyI6IkRpZWdvIn0sImlhdCI6MTczMjMxMTg3NH0.2tW_ZsrgIfY6iRyg9eze7yK9jpg1Eb_HTZrfastCv3Q")
    const token = sessionStorage.getItem("token")
    this.setState({token: token })
    console.log('token : '+token);    
  }

  async get (dato) {
    const url = "http://localhost:3000/api/articulo"
    const config = {
      headers:{
        authorization:this.state.token
      },
      params:{
        id: dato !== "" ? dato : null        
      }
    }

    console.log(config);

    try {
      const respuesta = await axios.get(url,config);
      console.log('respuesta data get :',respuesta.data);
      return respuesta;
    } catch (error) {
      console.log(error);
      alert(error);
      throw error;
    }
    
  }
  
  crear(){
    const url = "http://localhost:3000/api/articulo"
    const formData = new FormData();
    formData.append('nombre', this.state.nombre);
    formData.append('descripcion', this.state.descripcion);
    formData.append('precio', this.state.precio);
    formData.append('imagen', this.state.imagen[0]);
    formData.append('activo', this.state.activo);
    console.log(this.state.imagen[0]);
    
    const config = {
      headers:{
        authorization:this.state.token
      }
    }
    console.log(' token : ',this.state.token , ' datos : ' , formData);
    axios.post(url,formData,config)
    .then((respuesta) => {
      console.log('respuesta data post : ',respuesta.data);
      this.get()
    })
    .catch((error) => {
      console.log(error);
      alert("Error")
    })  
  }


  render(){
    const { nombre , descripcion , precio , imagen} = this.state
    return(
      <div className='formulario'>

        <h2>crear Articulo</h2>

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
          name='imagen'
          className='input_form'
          value={imagen.name}
          onChange={(e)=> this.setState({imagen:e.target.files})}
        />

        <Boton 
          className=''
          click={() => this.crear()}
          titulo='crear'
        />
      </div>
    )
  }
}
