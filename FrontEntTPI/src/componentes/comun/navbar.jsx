import { Component } from "react";
import { AlignJustify , AlignLeft, House } from 'lucide-react'
import Boton from '../comun/Boton'
 
export default class  extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
          <nav className="navbar">
            <House size={32} color="#fbff00" />

            <Boton
              id='boton_navbar'
              click={()=>console.log('cliente')}
              titulo='cliente'
            />
            <AlignJustify size={32} color="#fbff00" />
          </nav>
        )
    }
}

