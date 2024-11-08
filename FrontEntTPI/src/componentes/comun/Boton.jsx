import { Component } from 'react'

export default class Boton extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <span 
            id={this.props.id}
            className={this.props.className+' Boton'}
            onClick={()=> this.props.click()}
            >{this.props.titulo}</span>
        )
    }
}

