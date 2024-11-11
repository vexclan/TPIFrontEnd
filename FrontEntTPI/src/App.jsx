import { Component } from 'react'
import { Route, Switch, Redirect } from 'wouter'
import './App.css'
import FormulariDeDependenciaDeDireccion from './componentes/formularioDeDependenciaDeDireccion/formulariDeDependenciaDeDireccion'

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
        <Route path="/admin/pais/editar">
          <FormulariDeDependenciaDeDireccion/>
        </Route>
        <Route>404</Route>
      </Switch>
      </>
        

    )
  }
}
