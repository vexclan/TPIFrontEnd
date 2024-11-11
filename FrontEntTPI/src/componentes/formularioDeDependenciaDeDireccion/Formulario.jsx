import { Component } from 'react'
import Boton from '../comun/Boton'

export default class Formulario extends Component {
    constructor(props){
        super(props);
        this.state={
            Formulario:""
        }
    }


    render(){
        return (
            <div>
                <h1>{this.props.titulo}</h1>
                <input 
                    type="Text"
                    placeholder={this.props.titulo}
                    value={this.state.Formulario}
                    onChange={(e)=> this.setState({Formulario:e.target.value})}
                />
                <Boton
                    click={()=> this.props.click(this.state.Formulario)} 
                    titulo="Agregar"
                />
            </div>
        )
    }
}

