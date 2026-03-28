import { Component } from 'react'
import Boton from '../comun/Boton'
import '../comun/Formulario.css'
import axios from 'axios'

export default class FormulariEditar extends Component {
  constructor(props){
    super(props);
    this.state = {
        id:'',
        direccion:[],
        id_array:[],
        codigo_postal:"",
        calle:"", 
        datosForaneos:[{Ciudad:[]},{Pais:[]},{Provincia:[]},{Cliente:[]}],
        cliente:'',
        ciudad:'',
        pais:'',
        provincia:''
    }
  }

  
  cargarDireccion(ID){
    this.setState({id:ID})
    console.log('actualizando el direccion mostrado : ',this.state.direccion[ID],' id : ', ID);
    /*this.setState({: this.state.direccion[ID].})*/
    this.setState({cliente: this.state.direccion[ID].id_cliente})
    this.setState({calle: this.state.direccion[ID].calle})
    this.setState({codigo_postal: this.state.direccion[ID].código_postal})
    this.setState({ciudad: this.state.direccion[ID].id_ciudad})
    this.setState({pais: this.state.direccion[ID].id_pais})
    this.setState({provincia: this.state.direccion[ID].id_provincia})
    this.setState({activo: this.state.direccion[ID].activo})
  }

  async componentDidMount() {
    //sessionStorage.setItem('token' , '')
    const token = sessionStorage.getItem("token")
    this.setState({token: token })
    console.log('token : '+token);
    const respuesta = await this.get()
    await this.getTablasCecundarias()
    const array = []

    console.log('id a editar traida de vista direccion : ',parseInt(this.props.id))
    for (let i = 0; i < respuesta.data.Direccion.length; i++) {
      array.push(i)
      if (respuesta.data.Direccion[i].id == parseInt(this.props.id)) {
        this.cargarDireccion(i)        
        console.log('cargar direccion se debio activar');
        
      }
    }
    
    this.setState({id_array:array})
    console.log('id_array : ',array);
    
    
  }

  async getTablasCecundarias () {   
    const token = sessionStorage.getItem("token")
    const url = "http://localhost:3000/api/"
    const config = {
      headers:{
        authorization:token
      }
    }
    console.log(config);
    const ruta = ['ciudad','pais','provincia','cliente']
    const array = []
    for (let i = 0; i < ruta.length; i++) {
      try {
        console.log('ruta : '+url+ruta[i]);
        const respuesta = await axios.get(url+ruta[i],config);
        console.log('respuesta data get '+ruta[i]+' :',respuesta.data);
        array.push(respuesta.data)
      } catch (error) {
        console.log(error);
        alert(error);
        throw error;
      }      
    }    
    this.setState({datosForaneos: array})
    console.log('array :',array);
    
  }

  async get (dato) {   
    const token = sessionStorage.getItem("token")
    const url = "http://localhost:3000/api/direccion"
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
      console.log('respuesta data get :',respuesta.data.Direccion);
      this.setState({direccion: respuesta.data.Direccion})
      return respuesta;
    } catch (error) {
      console.log(error);
      alert(error);
      throw error;
    }
    
  }

  editar(){
    console.log(this.state.direccion[this.state.id]);
    
    const url = "http://localhost:3000/api/direccion"
    const config = {
      headers:{
        authorization:this.state.token
      },
      params:{
        id: this.state.direccion[this.state.id].id !== "" ? this.state.direccion[this.state.id].id : null        
      }
    }    
    const datos = {
      calle:this.state.direccion[this.state.id].calle !== "" ? this.state.direccion[this.state.id].calle : null,
      código_postal:this.state.direccion[this.state.id].código_postal !== "" ? this.state.direccion[this.state.id].código_postal : null,
      id_cliente:this.state.direccion[this.state.id].id_cliente !== "" ? this.state.direccion[this.state.id].id_cliente : null,
      id_pais:this.state.direccion[this.state.id].id_pais !== "" ? this.state.direccion[this.state.id].id_pais : null,
      id_provincia:this.state.direccion[this.state.id].id_provincia !== "" ? this.state.direccion[this.state.id].id_provincia : null,
      id_ciudad:this.state.direccion[this.state.id].id_ciudad !== "" ? this.state.direccion[this.state.id].id_ciudad : null,
      /**:this.state.direccion[this.state.id]. !== "" ? this.state.direccion[this.state.id]. : null, */
      activo:this.state.activo !== 1 ? this.state.activo : 0,
    }
    console.log(' token : ',this.state.token , ' id : ' , this.state.direccion[this.state.id].id , ' formData : ' , datos);
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
    const { id , direccion , id_array , cliente , calle , codigo_postal , ciudad , pais , provincia , datosForaneos , activo} = this.state
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
          value={id}
          onChange={(e)=> this.cargarDireccion(e.target.value)}
        >
          <option value={null}>id a editar</option>
          {id_array.map((contador, index)=>
            <option value={contador} key={index}>{direccion[contador].id}</option>
          )}
        </select>

        <label 
          htmlFor="Id_Cleinte"
        >
          Id cliente
        </label>
        <select 
          className='input_form' 
          id='id_cliente'
          value={cliente}
          onChange={(e)=> this.setState({cliente: e.target.value})}
        >
          <option>id del cliente</option>
          {datosForaneos[3].Cliente.map((contador, index)=>
            <option value={contador.id} key={index}>{contador.id} ({contador.Usuario})</option>
          )}
        </select>

        <label 
          htmlFor="calle"
        >
          Calle 
        </label>
        <input
          id='calle'
          type="text"
          className='input_form'
          placeholder='calle'
          value={calle}
          onChange={(e)=> this.setState({calle:e.target.value})}
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
          htmlFor="id_ciudad"
        >
          Id ciudad
        </label>
        <select 
          className='input_form' 
          id='id_ciudad'
          value={ciudad}
          onChange={(e)=> this.setState({ciudad: e.target.value})}
        >
          <option>id del ciudad</option>
          {datosForaneos[0].Ciudad.map((contador, index)=>
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
          value={provincia}
          onChange={(e)=> this.setState({provincia: e.target.value})}
        >
          <option>id del provincia</option>
          {datosForaneos[2].Provincia.map((contador, index)=>
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
          value={pais}
          onChange={(e)=> this.setState({pais: e.target.value})}
        >
          <option>id del pais</option>
          {datosForaneos[1].Pais.map((contador, index)=>
            <option value={contador.id} key={index}>{contador.id} ({contador.nombre})</option>
          )}
        </select>
        
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
