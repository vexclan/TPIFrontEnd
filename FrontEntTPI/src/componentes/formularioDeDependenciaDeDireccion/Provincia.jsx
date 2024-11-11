import { Component } from 'react'
import Boton from '../comun/Boton'

export default class Provincia extends Component {
    constructor(props){
        super(props);
        this.state={
            Provincia:""
        }
    }


    render(){
        return (
            <div>
                <h1>Provincia</h1>
                <input 
                    type="Text"
                    placeholder='Agregar'
                    value={this.state.Provincia}
                    onChange={(e)=> this.setState({Provincia:e.target.value})}
                />
                <Boton
                    click={()=> this.props.click()}
                    titulo="Agregar"
                />
            </div>
        )
    }
}