import { Component } from 'react'
import { Route, Switch, Redirect } from 'wouter'
import AdminClientes from './componentes/adminCliente/adminCliente'
import AdminArticulo from './componentes/adminArticulo/adminArticulo'
import AdminPedidos from './componentes/adminPedidos/adminPedidos'
import AdminDireccion from './componentes/adminDireccion/adminDireccion'
import AdminPedidosEditar from './componentes/adminPedidosEditar/adminPedidosEditar'
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
        <Route path="/"><Redirect to="/login"/></Route>
        <Route path="/login">
        </Route>
        <Route path="/admin">
          <Redirect to="/admin/articulos"/>
        </Route>
        <Route path="/admin/articulos" >
          <AdminArticulo/>
        </Route>
        <Route path="/admin/clientes" >
          <AdminClientes/>
        </Route>
        <Route path="/admin/dirrecciones" >
          <AdminDireccion/>
        </Route>
        <Route path="/admin/pedidos" >
          <AdminPedidos/>
        </Route>
        <Route path="/admin/pedidos/editar" >
          <AdminPedidosEditar/>
        </Route>
        <Route>404</Route>
      </Switch>
      </>
        

    )
  }
}
