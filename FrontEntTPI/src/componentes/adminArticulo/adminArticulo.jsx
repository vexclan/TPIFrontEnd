import { Component } from 'react'
import Navbar from '../comun/navbarAdmin'
import axios from 'axios'
import TargetaArticulo from './targetaDeArticulo'

export default class AdminDatos extends Component {
  constructor(props){
    super(props);
    this.state = {
        targetas: [],
        token:'',
        id:1
    }
  }

  
  componentDidMount() {
    const token = sessionStorage.getItem("token")
    this.setState({token: token })
    console.log(token);
    const url = "http://localhost:3000/api/articulo"
    const config = {
      headers:{
        authorization:token
      }
    }
    console.log(config);
    axios.get(url,config)
    .catch((error) => {
      console.log(error);
      alert(error)
    })
    .then((respuesta) => {
      console.log(respuesta.data);
      this.setState({targetas: respuesta.data.articulos})
    })
  }

  render(){
    const { targetas } = this.state
    return(
        <div>
          <Navbar/>
          <div className="container">
            {targetas.map ((contador, index)=>
                <TargetaArticulo
                  objeto={targetas[index]}
                  key={index}
                />
              )}
          </div>
        </div>

    )
  }
}
