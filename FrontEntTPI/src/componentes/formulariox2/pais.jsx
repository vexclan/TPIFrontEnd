import { Component } from 'react'
import Boton from '../comun/Boton'

export default class Pais extends Component {
    constructor(props){
        super(props);
        this.state={
            Pais:""
        }
    }


    render(){
        return (
            <div>
                <h1>Pais</h1>
                <input 
                    type="Text"
                    placeholder='Agregar'
                    value={this.state.Pais}
                    onChange={(e)=> this.setState({Pais:e.target.value})}
                />
                <Boton
                    click={()=> this.props.click()} 
                    titulo="Agregar"
                />
            </div>
        )
    }
}

