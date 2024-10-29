import { Component } from 'react'
import { Route, Switch, Redirect } from 'wouter'
import FormularioInicio from '/componentes/Inicio/FormularioInicio'
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
          <FormularioInicio/>
        </Route>
        <Route path="/">
          <FormularioInicio/>
        </Route>
        <Route>404</Route>
      </Switch>
      </>
        

    )
  }
}
