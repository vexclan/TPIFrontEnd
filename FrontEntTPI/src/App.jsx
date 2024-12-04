import { Component } from 'react'
import { Route, Switch, Redirect } from 'wouter'
import './App.css'
import FormulariDeDependenciaDeDireccion from './componentes/formularioDeDependenciaDeDireccion/Formdirectadmin'
import PedidoDeDependencia from './componentes/PedidoDeDependencia/Pedidos'
import PagoDeDependencia from './componentes/PagoDeDependencia/Pago'
import FacturaDeDependencia from './componentes/FacturaDeDependencia/Facturas'

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
        <Route path="/cliente/Pedidos">
          <PedidoDeDependencia/>
        </Route>
        <Route path="/Cliente/Pago">
          <PagoDeDependencia/>
        </Route>
        <Route path="/Cliente/Facturas">
          <FormulariDeDependenciaDeDireccion/>
        </Route>
        <Route>404</Route>
      </Switch>
      </>
        

    )
  }
}
