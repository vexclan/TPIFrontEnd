import { Component } from 'react'
import Boton from '../comun/Boton'

export default class ciudad extends Component {
    constructor(props){
        super(props);
        this.state={
            Ciudad:""
        }
    }


    render(){
        return (
            <div>
                <h1>Ciudad</h1>
                <input 
                    type="Text"
                    placeholder='Agregar'
                    value={this.state.Ciudad}
                    onChange={(e)=> this.setState({Ciudad:e.target.value})}
                />
                <Boton
                    click={()=> this.props.click()}
                    titulo="Agregar"
                />
            </div>
        )
    }
}