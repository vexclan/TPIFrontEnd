import { Component } from 'react'
import Boton from '../comun/Boton'
import '../comun/Formulario.css'
import axios from 'axios'

export default class FormulariEditar extends Component {
  constructor(props){
    super(props);
    this.state = {
        token:'',
        articulo: [],      
        id_array:[],
        id:'',
        nombre:"", 
        descripcion:"",
        precio:"",
        imagen:{},
        link_img:'',
        activo:''
    }
  }
  
  async componentDidMount() {
    //sessionStorage.setItem('token' , 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzM0MjA4MTgsImRhdGEiOnsiVXN1YXJpb19pZCI6MSwiVXN1YXJpbyI6IkRpZWdvIn0sImlhdCI6MTczMzM5OTIxOH0.PIh6ZiRjdKInm3YMGqh2rkW_3Q3MBQzmzuQzdWfrlDA')
    const token = sessionStorage.getItem("token")
    this.setState({token: token })
    console.log('token : '+token);
    const respuesta = await this.get()
    const array = []

    console.log('id a editar traida de vista articulo : ',parseInt(this.props.id))
    for (let i = 0; i < respuesta.data.Articulos.length; i++) {
      array.push(i)
      if (respuesta.data.Articulos[i].id == parseInt(this.props.id)) {
        this.cargarArticulo(i)        
        console.log('cargar articulo se debio activar');
        
      }
    }
    
    this.setState({id_array:array})
    console.log('id_array : ',array);
    
    
  }

  async get (dato) {   
    const token = sessionStorage.getItem("token")
    const url = "http://localhost:3000/api/articulo"
    const config = {
      headers:{
        authorization:token
      },
      params:{
        id: dato !== "" ? dato : null        
      }
    }

    console.log(config);

    try {
      const respuesta = await axios.get(url,config);
      console.log('respuesta data get :',respuesta.data);
      this.setState({articulo: respuesta.data.Articulos})
      return respuesta;
    } catch (error) {
      console.log(error);
      alert(error);
      throw error;
    }
    
  }

  cargarArticulo(ID){
    this.setState({id:ID})
    console.log('actualizando el articulo mostrado : ',this.state.articulo[ID],' id : ', ID);
    this.setState({nombre: this.state.articulo[ID].nombre})
    this.setState({descripcion: this.state.articulo[ID].descripcion})
    this.setState({precio: this.state.articulo[ID].precio})
    this.setState({link_img: 'http://localhost:3000/'+this.state.articulo[ID].imagen})
    this.setState({activo: this.state.articulo[ID].activo})
  }

  editar(){
    const url = "http://localhost:3000/api/articulo"
    const config = {
      headers:{
        authorization:this.state.token
      },
      params:{
        id: this.state.articulo[this.state.id].id !== "" ? this.state.articulo[this.state.id].id : null        
      }
    }    
    const formData = new FormData();
    formData.append('nombre', this.state.nombre);
    formData.append('descripcion', this.state.descripcion);
    formData.append('precio', this.state.precio);
    formData.append('imagen', this.state.imagen[0]);
    formData.append('activo', this.state.activo);
    console.log(' token : ',this.state.token , ' id : ' , this.state.articulo[this.state.id].id , ' formData : ' , formData);
    axios.put(url,formData,config)
    .then((respuesta) => {
      console.log('respuesta data put : ',respuesta.data);
      this.get(this.state.id)
      this.cargarArticulo(this.state.id)
    })
    .catch((error) => {
      console.log(error);
      alert("Error")
    })  
  }

  render(){
    const { articulo , id_array , nombre , descripcion , precio , imagen , id , link_img , activo} = this.state
    return(
      <div className='formulario'>

        <h2>Editar Articulo</h2>
        <label 
          htmlFor="id"
        >
          id 
        </label>
        <select 
          className='input_form' 
          id='id' 
          value={id}
          onChange={(e)=> this.cargarArticulo(e.target.value)}
        >
          <option value={null} >id a editar </option>         
          {id_array.map((contador, index)=>
            <option value={contador} key={index}>{articulo[contador].id}</option>
            
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

        <h3>estado del producto ({activo===0? 'se muestra':'no se muestra'})</h3>

        <label 
          htmlFor="activo"
        >
        <input
          id='activo'
          type="radio"
          name='activo'
          value={activo}
          onChange={(e)=> this.setState({activo:0})}
        />
          activo
        </label>
        <label 
          htmlFor="desactivado"
        >
        <input
          id='desactivado'
          type="radio"
          name='activo'
          value={activo}
          onChange={(e)=> this.setState({activo:1})}
        />
          desactivado
        </label><br/>

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

        <h3>imagen actual</h3>

        <img src={link_img} />

        <Boton 
          className=''
          click={() => this.editar()}
          titulo='editar'
        />
      </div>
    )
  }
}
