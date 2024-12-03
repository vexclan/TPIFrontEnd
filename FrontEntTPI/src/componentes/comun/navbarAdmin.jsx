import React, { Component } from 'react';
import { AlignJustify, House } from 'lucide-react';
import Boton from '../comun/Boton';
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
                        <House size={32} color="#fbff00" />
                    </div>

                    <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
                        <Boton
                            className='boton_navbar'
                            click={() => console.log('cliente')}
                            titulo='cliente'
                        />
                        
                        <Boton
                            className='boton_navbar'
                            click={() => console.log('articulo')}
                            titulo='articulo'
                        />
                        
                        <Boton
                            className='boton_navbar'
                            click={() => console.log('dirrección')}
                            titulo='dirrección'
                        />
                        
                        <Boton
                            className='boton_navbar'
                            click={() => console.log('pedidos')}
                            titulo='pedidos'
                        />
                    </div>

                    <div className="navbar-toggle" onClick={this.toggleMenu}>
                        <AlignJustify size={32} color="#fbff00" />
                    </div>
                </div>
            </nav>
        );
    }
}