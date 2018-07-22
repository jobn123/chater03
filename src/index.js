import React from 'react'
import ReactDom from 'react-dom'
import {createStore,applyMiddleware,compose} from 'redux'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducers from './reducer'
import './config'
import './index.css'
import App from './App'

const reduxDevtools = window.devToolsExtension?window.devToolsExtension():f=>f
const store = createStore(reducers,compose(
  applyMiddleware(thunk),
  reduxDevtools
))

//boss genius me msg 4个页面

ReactDom.render(
  (<Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>),
  document.getElementById('root'))
