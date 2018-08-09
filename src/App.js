import React from 'react'
// import Register from "./container/register/register";
import tabExample from "./component/boss/tabExample";
import Dashboard from "./component/dashboard/dashboard";
import BossInfo from "./container/bossinfo/bossinfo";
// import Login from "./container/login/login";
import GeniusInfo from "./container/geniusinfo/geniusinfo";
// import Search from "./component/search";
import Home from './pages/home/index'
import Group from './pages/home/group'
import CompareGroupList from './pages/home/compareGroupList'
import CompareDetail from './pages/home/compareDetail'
import Compare from './pages/home/Compare'
import Event from './pages/home/event'
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
          <Route path='/groupcompare/:id' component={CompareGroupList}/>
          <Route path='/comparedetail/:id' component={CompareDetail} />
          <Route path="/compare" component={Compare} />
          <Route path='/event/' component={Event} />
          <Route exac path="/home/:id" component={Home}/>
          <Route component={Dashboard}/>
          <Route exac path='/xxx' component={tabExample}/>
          <Route exac path="/" component={Home}/>
          
        </Switch>
    )
  }
}

export default App