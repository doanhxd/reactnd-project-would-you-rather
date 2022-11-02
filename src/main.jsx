import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './Reducers'
import middleware from './Middleware'

const store = createStore(reducer, middleware)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
