import { Component } from 'react'

export default class Boton extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <span 
                className='Boton'
                onClick={()=> this.props.click()}
            >
                {this.props.titulo}
            </span>
        )
    }
}

