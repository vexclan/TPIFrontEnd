import { Component } from 'react'
import Boton from '../comun/Boton'
import './Formulario.css'
import axios from 'axios'

export default class FormulariEditar extends Component {
  constructor(props){
    super(props);
    this.state = {
        id_pedido:'',
        Pedido:[],
        cliente:[{id:10 , nombre: 'pepito'},{id:9 , nombre: 'celina'}],
        id_cliente:1,
        precio_envio:"", 
        fecha:"",
        total:"",
        forma_pago:"",
        activo:0
    }
  }

  
  cargarPedido(ID){
    this.setState({id_pedido:ID})
    console.log('actualizando el Pedido mostrado : ',this.state.Pedido[ID],' indice : ', ID);
    /*this.setState({: this.state.Pedido[ID].})*/
    this.setState({precio_envio: this.state.Pedido[ID].precio_de_envio})
    this.setState({id_cliente: this.state.Pedido[ID].id_de_cliente})
    this.setState({total: this.state.Pedido[ID].total})
    this.setState({fecha: this.state.Pedido[ID].fecha.split("T")[0]})
    this.setState({forma_pago: this.state.Pedido[ID].forma_de_pago})
    this.setState({activo: this.state.Pedido[ID].activo})
    this.props.actializar(this.state.Pedido[ID].id)
    console.log('state : ',this.state);
    
    
  }
  
  async componentDidMount() {
    sessionStorage.setItem('token' , 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzM0NDQ3NzksImRhdGEiOnsiVXN1YXJpb19pZCI6MSwiVXN1YXJpbyI6IkRpZWdvIn0sImlhdCI6MTczMzQyMzE3OX0.llyZfGKq-ox8911AqWhbXhN6DoDbNsyn-uyGaoNO0uI')
    const token = sessionStorage.getItem('token')
    this.setState({token: token })
    console.log('estado de token : ',this.state.token);
    console.log('token : '+token);
    const respuesta = await this.get()
    await this.getTablasCecundarias()

    console.log('id a editar traida de vista articulo : ',parseInt(this.props.id))
    for (let i = 0; i < respuesta.data.Pedido.length; i++) {
      if (respuesta.data.Pedido[i].id == parseInt(this.props.id)) {
        this.cargarPedido(i)        
        console.log('cargar articulo se debio activar');
        
      }
    }
  }

  async get (dato) {   
    const token = sessionStorage.getItem("token")
    const url = "http://localhost:3000/api/pedido"
    const config = {
      headers:{
        authorization:token
      },
      params:{
        id: dato !== "" ? dato : null        
      }
    }

    console.log('config : ',config);

    try {
      const respuesta = await axios.get(url,config);
      console.log('respuesta data Pedido get :',respuesta.data);
      this.setState({Pedido: respuesta.data.Pedido})      
      return respuesta;
    } catch (error) {
      console.log(error);
      alert(error);
      throw error;
    }
    
  }



  async getTablasCecundarias (dato) {   
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

    console.log('config : ',config);

    try {
      const respuesta = await axios.get(url,config);
      console.log('respuesta data cliente get :',respuesta.data);
      this.setState({cliente: respuesta.data.Cliente})      
      return respuesta;
    } catch (error) {
      console.log(error);
      alert(error);
      throw error;
    }
    
  }

  
  editar(){
    console.log(this.state);
    
    const url = "http://localhost:3000/api/pedido"
    const config = {
      headers:{
        authorization:this.state.token
      },
      params:{
        id: this.state.Pedido[this.state.id_pedido].id !== "" ? this.state.Pedido[this.state.id_pedido].id : null        
      }
    }    
    const datos = {
      fecha:this.state.fecha !== "" ? this.state.fecha : null, 
      forma_de_pago:this.state.forma_pago !== "" ? this.state.forma_pago : null,
      id_de_cliente:this.state.id_cliente !== "" ? this.state.id_cliente : null,
      precio_de_envio:this.state.precio_envio !== "" ? this.state.precio_envio : null,
      total:this.state.total !== "" ? this.state.total : null,
      activo:this.state.activo !== 1 ? this.state.activo : 0,
    }
    console.log(' token : ',this.state.token , ' id : ' , this.state , ' formData : ' , datos);
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
    const { Pedido , id_pedido , cliente , precio_envio , fecha , total , forma_pago , id_cliente , activo} = this.state
    return(
      <div className='formulario'>

        <h2>Editar Pedido</h2>
        <label 
          htmlFor="id_pedido"
        >
          Id Pedido
        </label>
        <select 
          className='input_form' 
          id='id_pedido' 
          value={id_pedido}
          onChange={(e)=> this.cargarPedido(e.target.value)}   
        >
          <option>id del pedido a editar</option>
          {Pedido.map((contador, index)=>
            <option value={index} key={index}>{contador.id}</option>
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
          value={id_cliente}
          onChange={(e)=> this.setState({id_cliente: e.target.value})}          
        >
          <option>id del cliente</option>
          {cliente.map((contador, index)=>
            <option value={contador.id} key={index}>{contador.id} ({contador.Usuario})</option>
          )}
        </select>

        <label 
          htmlFor="precio_envio"
        >
          Precio envío 
        </label>
        <input
          id='precio_envio'
          type="number"
          className='input_form'
          placeholder='precio_envio'
          value={precio_envio}
          onChange={(e)=> this.setState({precio_envio:e.target.value})}
        />

        <label 
          htmlFor="fecha_Envio"
        >
          fecha de envio
        </label>
        <input
          id='fecha_Envio'
          type="date"
          className='input_form'
          value={fecha}
          onChange={(e)=> this.setState({fecha:e.target.value})}
        />

        <label 
          htmlFor="total"
        >
          total a pagar
        </label>
        <input
          id='total'
          type="number"
          className='input_form'
          placeholder='total'
          value={total}
          onChange={(e)=> this.setState({total:e.target.value})}
        />

        <label 
          htmlFor="forma_pago"
        >
          Forma de pago
        </label>
        <input
          id='forma_pago'
          type="text"
          className='input_form'
          placeholder='forma_pago'
          value={forma_pago}
          onChange={(e)=> this.setState({forma_pago:e.target.value})}
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
