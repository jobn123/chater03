import React from 'react'
// import Register from "./container/register/register";
import tabExample from "./component/boss/tabExample";
import Dashboard from "./component/dashboard/dashboard";
import BossInfo from "./container/bossinfo/bossinfo";
// import Login from "./container/login/login";
import GeniusInfo from "./container/geniusinfo/geniusinfo";
import Search from "./component/search";
import Home from './pages/home/index'
import Group from './pages/home/group'
import Login from './pages/login'
import Register from './pages/register'

import './App.css'

import {Route,Switch} from 'react-router-dom';

class App extends React.Component{
  render(){
    return(
        <Switch>
          <Route path='/bossinfo' component={BossInfo}/>
          <Route path='/geniusinfo' component={GeniusInfo}/>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
          <Route path='/group' component={Group}/>
          <Route path="/" component={Home}/>
          <Route component={Dashboard}/>
          {/* <Route exac path='/' component={tabExample}/> */}
        </Switch>
    )
  }
}

export default App