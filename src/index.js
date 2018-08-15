import React from 'react'
import { render } from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import Analytics from 'react-router-ga'
import registerServiceWorker from './registerServiceWorker'

render(
  <BrowserRouter>
    <Analytics id="UA-47315066-1">
      <App />
    </Analytics>
  </BrowserRouter>,
  document.getElementById('root')
)
registerServiceWorker()
