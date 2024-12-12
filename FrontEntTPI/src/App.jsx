import { Component } from 'react'
import { Route, Switch, Redirect } from 'wouter'
import FormularioInicio from './componentes/inicio/formularioinicio'
import Vistainiciocliente from './componentes/clientevistainicio/vistainiciocliente'
import Informecompleto  from './componentes/clienteinfocompleta/informecompleto'
import Registrousuario from './componentes/clienteregistro/registrousuario'
import './App.css'

export default class app extends Component {
  constructor(props){
    super(props)
    this.state = {
      menu:"login"
    }
  }

  render(){
    return(
      <>
      <Switch>
        <Route path="/"><Redirect to="/FormularioInicio"/></Route>
        <Route path="/FormularioInicio">
          <FormularioInicio/>
        </Route>
        <Route path="/vistainiciocliente">
          <Vistainiciocliente/>
        </Route>
        <Route path="/informecompleto">
          <Informecompleto/>
        </Route>
        <Route path="/registrousuario">
          <Registrousuario/>
        </Route>
        <Route>404</Route>
      </Switch>
      </>
        

    )
  }
}
