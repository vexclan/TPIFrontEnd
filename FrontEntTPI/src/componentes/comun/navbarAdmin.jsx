import React, { Component } from 'react';
import { AlignJustify, House } from 'lucide-react';
import Boton from '../comun/BotonRedireccionador';
import './Navbar.css';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMenuOpen: false
        };
    }

    toggleMenu = () => {
        this.setState(prevState => ({
            isMenuOpen: !prevState.isMenuOpen
        }));
    }

    render() {
        const { isMenuOpen } = this.state;
        
        return (
            <nav className="navbar">
                <div className="navbar-container">
                    <div className="navbar-left">
                        <Boton 
                            ruta='/admin/clientes'
                        >
                            <House 
                                className='boton_navbar'
                                size={32} 
                                color="#fbff00" 
                            />
                        </Boton>
                    </div>

                    <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
                        <Boton
                            className='boton_navbar'
                            ruta='/admin/clientes'
                        >cliente</Boton>
                        
                        <Boton
                            className='boton_navbar'
                            ruta='/admin/articulos'
                        >articulo</Boton>
                        
                        <Boton
                            className='boton_navbar'
                            ruta='/admin/dirrecciones'
                        >dirrección</Boton>
                        
                        <Boton
                            className='boton_navbar'
                            ruta='/admin/pedidos'
                        >pedidos</Boton>
                    </div>

                    <div className="navbar-toggle" onClick={this.toggleMenu}>
                        <AlignJustify size={32} color="#fbff00" />
                    </div>
                </div>
            </nav>
        );
    }
}