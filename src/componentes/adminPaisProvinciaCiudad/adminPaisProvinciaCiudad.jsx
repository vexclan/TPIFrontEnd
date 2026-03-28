import '../comun/Formulario.css'
import axios from 'axios'
import { Component } from 'react'
import Navbar from '../comun/navbarAdmin'
import Targeta from './targetaMultiUso'

export default class AdminDatos extends Component {
  constructor(props){
    super(props);
    this.state = {
      targetas:[{
        tabla:'provincia',
        id:1,
        nombre:'hola'
      }]
    }
  }

  async componentDidMount() {
    //sessionStorage.setItem('token' , '')
    const token = sessionStorage.getItem('token')
    this.setState({token: token })
    console.log('estado de token : ',this.state.token);
    console.log('token : '+token);
    const pais = (await this.get(null,'pais')).Pais
    const provincia = (await this.get(null,'provincia')).Provincia
    const ciudad = (await this.get(null,'ciudad')).Ciudad
    const targetas =[]
    console.log(pais , provincia , ciudad);
    
    for (let i = 0; i < pais.length; i++) {
      const element = {
        tabla:'pais',
        id:pais[i].id,
        nombre:pais[i].nombre
      };
      targetas.push(element)
    }
    for (let i = 0; i < provincia.length; i++) {
      const element = {
        tabla:'provincia',
        id:provincia[i].id,
        nombre:provincia[i].nombre
      };
      targetas.push(element)
    }
    for (let i = 0; i < ciudad.length; i++) {
      const element = {
        tabla:'ciudad',
        id:ciudad[i].id,
        nombre:ciudad[i].nombre
      };
      targetas.push(element)
    }
    console.log(targetas);    
    this.setState({targetas:targetas})
  }

  
  get (dato, tabla) {   
    return new Promise(async(resolve, reject) => {
      
    const token = sessionStorage.getItem("token")
    const url = "http://localhost:3000/api/"
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
      const respuesta = await axios.get(url+tabla,config);
      console.log('respuesta data get ' + tabla + ' :',respuesta.data);
      resolve (respuesta.data);
    } catch (error) {
      console.log(error);
      alert(error);
      reject (error);
    }
    })
    
  }

  borrar(id, tabla){
    const url = "http://localhost:3000/api/"
    const config = {
      headers:{
        authorization:this.state.token
      },
      params:{
        id: id !== "" ? id : null        
      }
    }
    console.log(' token : ',this.state.token , ' id : ' , id);
    axios.delete(url+tabla,config)
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
              <Targeta
                objeto={targetas[index]}
                clase='activo'
                key={index}
                borrar={(a,b)=> this.borrar(a,b)}
              />
              )}
          </div>
        </div>

    )
  }
}
