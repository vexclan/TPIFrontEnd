import { Component } from 'react'
import axios from 'axios'
import Navbar from '../comun/navbarAdmin'
import Formulario from './formulario'
import Articulo from './articulo';
import './articulosPedidos.css'

export default class AdminEditar extends Component {
  constructor(props){
    super(props);
    this.state= {
      articulo: [{id:1 , id_de_cliente:1 , nombre:'cafe' , cantidad:30 , precio:300 },{id:2 , id_de_cliente:1 , nombre:'cafe americano exprese ' , cantidad:100 , precio:400 }],
      targetas:[]
    }
  }

  
  async componentDidMount() {
    //sessionStorage.setItem('token' , '')
    const token = sessionStorage.getItem('token')
    this.setState({token: token })
    console.log('estado de token : ',this.state.token);
    console.log('token : '+token);
    const respuesta = await this.get()
    const array = []

    console.log('id a editar traida de vista Articulo_Pedido  : ',parseInt(this.props.id))
    for (let i = 0; i < respuesta.data.Articulo_Pedido.length; i++) {
      array.push(i)
      if (respuesta.data.Articulo_Pedido[i].id == parseInt(this.props.id)) {
        //this.cargarArticulo_Pedido(i)        
        console.log('cargar Articulo Pedido se debio activar');
        
      }
    }
    
    this.setState({id_array:array})
    console.log('id_array : ',array);
    
  }

  
  
  async get (dato) {   
    const token = sessionStorage.getItem("token")
    const url = "http://localhost:3000/api/articuloPedido"
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
      console.log('respuesta data articuloPedido get :',respuesta.data);
      this.setState({articulo: respuesta.data.Articulo_Pedido})      
      return respuesta;
    } catch (error) {
      console.log(error);
      alert(error);
      throw error;
    }
    
  }

  render(){
    return(
        <div>
          <Navbar/>
          <div className="container">
                <Formulario
                  id={this.props.id}
                  actializar={(e)=>this.get(e)}
                />
                <div className='articulos_pedidos'>
                    <h3>Articulos pedidos</h3>
                    
                    {this.state.articulo.map((contador, index)=>
                        <Articulo
                            objeto={contador}
                            key={index}
                        />
                    )}
                </div>
          </div>
        </div>

    )
  }
}
