import { Component } from 'react'

export default class formulariDeDependenciaDeDireccion extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className='formulari'>
                <h1>
                    Pais 
                </h1>
                <h2>
                    Provincia
                </h2>
                <h3>
                    Ciudad
                </h3>
            </div>
        )
    }
}