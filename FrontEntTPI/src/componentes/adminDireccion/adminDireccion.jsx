import { Component } from 'react'
import axios from 'axios'
import Navbar from '../comun/navbarAdmin'
import TargetaDireccion from './targetaDireccion'

export default class AdminDatos extends Component {
  constructor(props){
    super(props);
    this.state = {
        targetas: []
        
    }
  }
  
  componentDidMount() {
    /*sessionStorage.setItem('token' , 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzM0MjA4MTgsImRhdGEiOnsiVXN1YXJpb19pZCI6MSwiVXN1YXJpbyI6IkRpZWdvIn0sImlhdCI6MTczMzM5OTIxOH0.PIh6ZiRjdKInm3YMGqh2rkW_3Q3MBQzmzuQzdWfrlDA')*/
    const token = sessionStorage.getItem('token')
    this.setState({token: token })
    console.log('estado de token : ',this.state.token);
    console.log('token : '+token);
    this.get()
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

    console.log('config : ',config);

    try {
      const respuesta = await axios.get(url,config);
      console.log('respuesta data get :',respuesta.data);
      this.setState({targetas: respuesta.data.Direccion})      
      return respuesta;
    } catch (error) {
      console.log(error);
      alert(error);
      throw error;
    }
    
  }
  
  borrar(id){
    const url = "http://localhost:3000/api/direccion"
    const config = {
      headers:{
        authorization:this.state.token
      },
      params:{
        id: id !== "" ? id : null        
      }
    }
    console.log(' token : ',this.state.token , ' id : ' , id);
    axios.delete(url,config)
    .then((respuesta) => {
      console.log('respuesta data put : ',respuesta.data);
      this.get()
    })
    .catch((error) => {
      console.log(error);
      alert("Error")
    })  
  }

  render(){
    const { targetas } = this.state
    return(
        <div>
          <Navbar/>
          <div className="container">
            {targetas.map ((contador, index)=>
              targetas[index].activo === 0 ?
                <TargetaDireccion
                  objeto={targetas[index]}
                  clase='activo'
                  key={index}
                  borrar={(e)=> this.borrar(e)}
                />
                :
                <TargetaDireccion
                  objeto={targetas[index]}
                  clase='desactivado'
                  key={index}
                  borrar={(e)=> this.borrar(e)}
              />
            )}
          </div>
        </div>

    )
  }
}
