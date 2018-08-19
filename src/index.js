import React from 'react'
import { render } from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import Raven from 'raven-js'

Raven.config(
  'https://b9c8a706e38e4afb9d192c150edc5464@sentry.io/1263996'
).install()

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)
