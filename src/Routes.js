import React from 'react'
import {Switch,Redirect} from 'react-router-dom'
import {RouteWithLayout} from './components'
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Citas as CitasView,
  NotFound as NotFoundView,
  SignIn as SignInView,
  Timeout as TimeoutView
} from './views'

const Routes = ()=>(
  <Switch>
    <Redirect 
      exact
      from='/'
      to='/citas'
    />
    <RouteWithLayout 
      component={CitasView}      
      layout = {MainLayout}    
      exact  
      path = '/citas'
    />
    <RouteWithLayout
      component={SignInView}
      exact
      layout={MinimalLayout}
      path="/login"
    />
    <RouteWithLayout
      component={TimeoutView}
      exact
      layout={MinimalLayout}
      path="/time-out"
    />
    <RouteWithLayout
      component={NotFoundView}
      exact
      layout={MinimalLayout}
      path="/not-found"
    />
    <Redirect to="/not-found" />
  </Switch>
)

export default Routes
