// const express = require('express');
import express from 'express'
import path from 'path'

import csshook from 'css-modules-require-hook/preset'
require('asset-require-hook')({
  extensions: ['jpg','png']
})

import React from 'react'
import {renderToString} from 'react-dom/server'
import {createStore,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import { StaticRouter } from 'react-router'
import App from './src/App'
import reducers from "./src/reducer";
import staticPath from './build/asset-manifest'
// console.log(staticPath)


const app = express();

app.use(function (req,res,next) {
  if(req.url.startsWith('/user/')||req.url.startsWith('/static/')){
    return next()
  }

  const store = createStore(reducers,compose(
    applyMiddleware(thunk),
  ))

  let context = {}
  const markup = renderToString(
    <Provider store={store}>
      <StaticRouter
        location={req.url}
        context={context}
      >
        <App/>
      </StaticRouter>
    </Provider>
  )

  const pageHtml = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <meta name="theme-color" content="#000000">
      <title>React App</title>
      <link rel="stylesheet" href="${staticPath['main.css']}">
    </head>
    <body>
      <noscript>
        You need to enable JavaScript to run this app.
      </noscript>
      <div id="root">${markup}</div>
      <script src="${staticPath['main.js']}"></script>
    </body>
  </html>
  `

  res.send(pageHtml)
  console.log(path.resolve('build/index.html'))
  // return res.sendFile(path.resolve('build/index.html'))
})

app.use('/',express.static(path.resolve('build')))
// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });


app.listen(1981);



// const express = require('express');
// const path = require('path');
// const app = express();
//
// app.use(express.static(path.join(__dirname, 'build')));
//
//
// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });
//
//
// app.listen(9000);


