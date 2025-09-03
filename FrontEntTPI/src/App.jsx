import { Component } from 'react'
import { Route, Switch, Redirect } from 'wouter'
import AdminClientes from './componentes/adminCliente/adminCliente'
import AdminClientesEditar from './componentes/adminClienteEditar/adminClienteEditar'
import AdminArticulo from './componentes/adminArticulo/adminArticulo'
import AdminArticulosEditar from './componentes/adminArticuloEditar/adminArticuloEditar'
import AdminArticulosCrear from './componentes/adminArticuloCrear/adminArticuloCrear'
import AdminPedidos from './componentes/adminPedidos/adminPedidos'
import AdminPedidosEditar from './componentes/adminPedidosEditar/adminPedidosEditar'
import AdminDireccion from './componentes/adminDireccion/adminDireccion'
import AdminDireccionEditar from './componentes/adminDireccionEditar/adminArticuloEditar'
import AdminUbicacion from './componentes/adminPaisProvinciaCiudad/adminPaisProvinciaCiudad'
import AdminUbicacionEditar from './componentes/formularioDeDependenciaDeDireccion/formueditar'
import FormularioInicio from './componentes/inicio/formularioinicio'
import Vistainiciocliente from './componentes/clientevistainicio/vistainiciocliente'
import Informecompleto  from './componentes/clienteinfocompleta/informecompleto'
import Registrousuario from './componentes/clienteregistro/registrousuario'
import './App.css'

export default class app extends Component {
  constructor(props){
    super(props)
    this.state = {
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
        <Route path="/admin">
          <Redirect to="/admin/articulos"/>
        </Route>
        <Route path="/admin/articulos" >
          <AdminArticulo/>
        </Route>
        <Route path="/admin/articulos/editar" >
          <AdminArticulosEditar/>
        </Route>
        <Route path="/admin/articulos/editar/:id" >
          {(params)=>
            <AdminArticulosEditar
              id={params.id} 
            />
          }
        </Route>
        <Route path="/admin/articulos/crear" >
          <AdminArticulosCrear/>
        </Route>
        <Route path="/admin/clientes" >
          <AdminClientes/>
        </Route>
        <Route path="/admin/clientes/editar" >
          <AdminClientesEditar/>
        </Route>
        <Route path="/admin/clientes/editar/:id" >
          {(params)=>
            <AdminClientesEditar
              id={params.id}
            />
          }
        </Route>
        <Route path="/admin/dirrecciones" >
          <AdminDireccion/>
        </Route>
        <Route path="/admin/dirrecciones/editar" >
          <AdminDireccionEditar/>
        </Route>
        <Route path="/admin/dirrecciones/editar/:id" >
          {(params)=>
            <AdminDireccionEditar
              id={params.id}
            />
          }
        </Route>
        <Route path="/admin/pedidos" >
          <AdminPedidos/>
        </Route>
        <Route path="/admin/pedidos/editar" >
          <AdminPedidosEditar/>
        </Route>
        <Route path="/admin/pedidos/editar/:id" >
          {(params)=>
            <AdminPedidosEditar
              id={params.id}
              nombre={nombre}
              guardar={(e)=>this.guardar(e)}
            />
          }
        </Route>
        <Route path="/admin/ubicacion" >
          <AdminUbicacion/>
        </Route>
        <Route path="/admin/ubicacion/editar" >
          <AdminUbicacionEditar/>
        </Route>
        <Route path="/admin/ubicacion/editar/:id" >
          {(params)=>
            <AdminUbicacionEditar
              id={params.id}
            />
          }
        </Route>
        <Route>404</Route>
      </Switch>
      </>
        

    )
  }
}
