import { Component } from 'react'
import Formulario from './Formulario'
import './formulario.css'
import {House} from 'lucide-react'

export default class Formdirectadmin extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className='formulariodireccion'>
                <Formulario
                    titulo="Pais"
                    click={(valor)=> console.log('Agregar')}
                />
                <Formulario
                    titulo="Provincia"
                    click={(valor)=> console.log('Agregar')}
                />
                <Formulario
                    titulo="Ciudad"
                    click={(valor)=> console.log('Agregar')} 
                />
            </div>
        )
    }
}