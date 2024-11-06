import { Component } from 'react'
import { Route, Switch, Redirect } from 'wouter'
import AdminDatos from './componentes/adminDatos/adminDatos'
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
          <AdminDatos/>
        </Route>
        <Route path="/admin/datos">
          <AdminDatos/>
        </Route>
        <Route>404</Route>
      </Switch>
      </>
        

    )
  }
}
