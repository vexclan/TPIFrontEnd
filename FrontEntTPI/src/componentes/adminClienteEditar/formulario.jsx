import { Component } from 'react'
import Boton from '../comun/Boton'
import '../comun/Formulario.css'
import axios from 'axios'

export default class FormulariEditar extends Component {
  constructor(props){
    super(props);
    this.state = {
        id:'',
        id_array:[],
        Correo:'',
        id_usuario:'',
        usuario:'',
        activo:1,
        cliente:[]
    }
  }

  async componentDidMount() {
    //sessionStorage.setItem('token' , 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzM5ODM3OTQsImRhdGEiOnsiVXN1YXJpb19pZCI6MSwiVXN1YXJpbyI6IkRpZWdvIn0sImlhdCI6MTczMzk2MjE5NH0.f4PvWIzAFNcEdn53eUnEKx_1V3OFBp_i3MsT8W54nzI')
    const token = sessionStorage.getItem("token")
    this.setState({token: token })
    console.log('token : '+token);
    const respuesta = await this.get()
    const array = []

    console.log('id a editar traida de vista cliente : ',parseInt(this.props.id))
    for (let i = 0; i < respuesta.data.Cliente.length; i++) {
      array.push(i)
      if (respuesta.data.Cliente[i].id == parseInt(this.props.id)) {
        this.cargarCliente(i)        
        console.log('cargar cliente se debio activar');
        
      }
    }
    
    this.setState({id_array:array})
    console.log('id_array : ',array);
    
    
  }

  async get (dato) {   
    const token = sessionStorage.getItem("token")
    const url = "http://localhost:3000/api/cliente"
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
      console.log('respuesta data get :',respuesta.data.Cliente);
      this.setState({cliente: respuesta.data.Cliente})
      return respuesta;
    } catch (error) {
      console.log(error);
      alert(error);
      throw error;
    }
    
  }

  cargarCliente(ID){
    this.setState({id:ID})
    console.log('actualizando el cliente mostrado : ',this.state.cliente[ID],' id : ', ID);
    this.setState({id_usuario: this.state.cliente[ID].id_usuario})
    this.setState({Correo: this.state.cliente[ID].Correo})
    this.setState({Direcciones: this.state.cliente[ID].Direcciones})
    this.setState({usuario: this.state.cliente[ID].Usuario})
    this.setState({activo: this.state.cliente[ID].activo})
  }

  
  editar(){
    const url = "http://localhost:3000/api/cliente"
    const config = {
      headers:{
        authorization:this.state.token
      },
      params:{
        id: this.state.cliente[this.state.id].id !== "" ? this.state.cliente[this.state.id].id : null        
      }
    }    
    const datos = {
      Correo:this.state.Correo !== "" ? this.state.Correo : null,
      id_usuario:this.state.id_usuario !== "" ? this.state.id_usuario : null,
      activo:this.state.activo !== 1 ? this.state.activo : 0,
    }
    console.log(' token : ',this.state.token , ' id : ' , this.state.cliente[this.state.id].id , ' formData : ' , datos);
    axios.put(url,datos,config)
    .then((respuesta) => {
      console.log('respuesta data put : ',respuesta.data);
    })
    .catch((error) => {
      console.log(error);
      alert("Error")
    })  
  }
  render(){
    const { id ,	Correo ,	id_usuario ,	activo , usuario , id_array , cliente } = this.state
    return(
      <div className='formulario'>

        <h2>Editar Cliente</h2>
        <label 
          htmlFor="Id"
        >
          Id de cliente
        </label>
        <select 
          className='input_form' 
          id='Id' 
          value={id}
          onChange={(e)=> this.cargarCliente(e.target.value)}
        >
        <option value={null} >id a editar </option>         
          {id_array.map((contador, index)=>
            <option value={contador} key={index}>{cliente[contador].id}</option>
          )}
      </select>
        
        <p>usuario : {usuario} , id de usuario : {id_usuario}</p>

        <label 
          htmlFor="Correo"
        >
          Correo 
        </label>
        <input
          id='Correo'
          type="text"
          className='input_form'
          placeholder='Correo'
          value={Correo}
          onChange={(e)=> this.setState({Correo:e.target.value})}
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

        <Boton 
          className=''
          click={() => this.editar()}
          titulo='editar'
        />
      </div>
    )
  }
}
